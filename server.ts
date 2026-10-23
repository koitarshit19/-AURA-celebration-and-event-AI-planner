import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_CHAT_MODELS = new Set([
  'gemini-3.8-flash',
  'gemini-3.1-flash-lite',
]);

const ALLOWED_AUDIO_MIMES = new Set([
  'audio/webm',
  'audio/mp4',
  'audio/ogg',
  'audio/wav',
  'audio/mpeg',
  'audio/aac',
  'audio/x-m4a',
]);

const PERSONA_PROMPTS: Record<string, string> = {
  arthur_vance: `You are Arthur Vance, Senior Executive Producer & Certified Master Sommelier at Aura (Nocturne Luminary Private Client Concierge).
You oversee high-stakes Napa Valley estate galas, private soirées, and milestone celebrations (currently focused on Julian & Maya's Autumn Gala at Meadowood Estate, Napa Valley, $75,000 cap, 120 guests, October 24, 2025).
Speak with poised, warm, executive authority, precision, and discretion. Provide concrete operational numbers, timelines, wine pairing recommendations, vendor contract strategies, and spatial logistics. Keep responses concise, structured, and actionable.`,

  aura_architect: `You are Aura Engine L4, the Autonomous Celebration Architect behind Nocturne Luminary.
You specialize in algorithmic run-of-show synthesis, DMX lighting & spatial audio choreography (2200K–2700K amber warmth, 58–76 dB acoustic envelopes), weather contingencies, and seating harmony.
Respond with analytical elegance, concrete cue timings, and actionable recommendations tailored to the user's celebration blueprint.`,

  escrow_strategist: `You are the Aura Financial Escrow & Vendor SLA Strategist.
You specialize in luxury celebration budget optimization, off-peak delivery incentives, force-majeure riders, escrow tranche releases, and vendor contract negotiations.
Provide sharp financial breakdowns, concrete dollar savings, and risk-mitigated contract clauses.`,
};

// In-memory sliding window rate limiter for GenAI endpoints
interface RateLimitRecord {
  timestamps: number[];
}
const rateLimitStore = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 35; // 35 requests per minute per IP

function sanitizeString(input: unknown, maxLen = 300): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // strip HTML tag brackets
    .slice(0, maxLen);
}

function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'local';

  const now = Date.now();
  const record = rateLimitStore.get(ip) || { timestamps: [] };

  // Filter out timestamps older than sliding window
  record.timestamps = record.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (record.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    res.setHeader('Retry-After', '30');
    res.status(429).json({
      error: 'Too many requests. Please wait a moment before sending another AI directive.',
    });
    return;
  }

  record.timestamps.push(now);
  rateLimitStore.set(ip, record);

  // Periodic cleanup if store grows large
  if (rateLimitStore.size > 2000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.timestamps.length === 0 || now - value.timestamps[value.timestamps.length - 1] > RATE_LIMIT_WINDOW_MS) {
        rateLimitStore.delete(key);
      }
    }
  }

  next();
}

function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Limit request body to 6MB (sufficient for audio base64 without enabling memory exhaustion)
  app.use(express.json({ limit: '6mb' }));

  // Apply rate limiter on all /api/gemini routes
  app.use('/api/gemini', rateLimiter);

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'Aura Celebration Intelligence Engine' });
  });

  // Multi-turn Gemini Chat Endpoint
  app.post('/api/gemini/chat', async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        messages = [],
        persona = 'arthur_vance',
        model = 'gemini-3.8-flash',
        eventContext = '',
        currentPage = '/',
      } = req.body || {};

      if (!Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ error: 'At least one valid message is required.' });
        return;
      }

      const selectedModel = ALLOWED_CHAT_MODELS.has(model) ? model : 'gemini-3.8-flash';
      const safePersonaKey = PERSONA_PROMPTS[persona] ? persona : 'arthur_vance';
      const baseSystemInstruction = PERSONA_PROMPTS[safePersonaKey];

      const safeCurrentPage = sanitizeString(currentPage, 60) || '/';
      const safeEventContext = sanitizeString(eventContext, 1500) || 'Julian & Maya Autumn Gala, Napa Valley, $75,000 budget, 120 guests';

      const pageGuidance = `
Current User Page: ${safeCurrentPage}
- If the user is on "/budget": prioritize financial questions, cost savings, category caps, escrow milestones, and pricing.
- If the user is on "/vendors": prioritize vendor checklist questions, contract SLAs, deliverables, and negotiation tactics.
- If the user is on "/schedule": prioritize timing, call sheets, run-of-show cues, and milestone dates.
- If the user is on "/ambience-studio" or "/plan-overview": prioritize music/DJ recommendations, acoustic decibels, lighting warmth/lux, and theme ideas.
- Provide concrete, friendly, executive assistance covering pricing, dates, timings, DJ/music, and lighting whenever asked.`;

      const systemInstruction = `${baseSystemInstruction}\n\n${pageGuidance}\n\nActive Celebration Context:\n${safeEventContext}`;

      const sanitizedContents = messages
        .filter((m) => m && typeof m.text === 'string' && m.text.trim().length > 0)
        .slice(-20) // enforce window of last 20 messages max
        .map((m) => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [{ text: sanitizeString(m.text, 2000) }],
        }));

      if (sanitizedContents.length === 0) {
        res.status(400).json({ error: 'Messages payload contains no valid text content.' });
        return;
      }

      const ai = getGenAIClient();
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: sanitizedContents,
        config: {
          systemInstruction,
        },
      });

      const replyText =
        response?.text?.trim() ||
        'Directive logged and synchronized with the Aura Run-of-Show matrix.';

      res.json({
        text: replyText,
        model: selectedModel,
        persona: safePersonaKey,
      });
    } catch (error: unknown) {
      console.error('Error in /api/gemini/chat:', error instanceof Error ? error.message : 'Unknown');
      // Do not leak stack traces or internal secrets to user
      res.status(500).json({
        error: 'Aura AI engine is currently calibrating. Please verify connection and try again.',
      });
    }
  });

  // Dedicated Structured Plan Generation Endpoint
  app.post('/api/gemini/generate-plan', async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        eventType = 'Weddings & Galas',
        date = 'October 24, 2025',
        guestCount = 135,
        budget = 75000,
        city = 'St. Helena & Napa Valley, CA',
        vibe = 'Romantic & Ethereal',
      } = req.body || {};

      // Sanitize inputs and clamp numeric bounds
      const safeEventType = sanitizeString(eventType, 80) || 'Weddings & Galas';
      const safeDate = sanitizeString(date, 60) || 'October 24, 2025';
      const safeCity = sanitizeString(city, 120) || 'St. Helena & Napa Valley, CA';
      const safeVibe = sanitizeString(vibe, 100) || 'Romantic & Ethereal';

      const rawBudget = Number(budget);
      const numBudget = Math.min(Math.max(isNaN(rawBudget) ? 75000 : Math.round(rawBudget), 1000), 50000000);

      const rawGuests = Number(guestCount);
      const numGuests = Math.min(Math.max(isNaN(rawGuests) ? 135 : Math.round(rawGuests), 2), 25000);

      const prompt = `You are the lead AI Celebration Architect for Aura (Nocturne Luminary luxury event intelligence).
Generate an ultra-curated, highly realistic, professional event blueprint for the following parameters:
- Event Typology: ${safeEventType}
- Target Date: ${safeDate}
- Guest Attendance: ${numGuests} guests
- Total Allocated Budget: $${numBudget.toLocaleString()} USD
- Destination / City: ${safeCity}
- Aesthetic Vibe: ${safeVibe}

Respond ONLY with valid, raw JSON (no markdown formatting, no code blocks, no backticks, no comments).
The JSON object MUST strictly adhere to this exact structure:
{
  "eventName": "A compelling, opulent title for this event (e.g., 'The St. Helena Autumn Gala' or 'Monte Carlo Midnight Soirée')",
  "eventType": "${safeEventType}",
  "city": "${safeCity}",
  "date": "${safeDate}",
  "guestCount": ${numGuests},
  "budget": ${numBudget},
  "vibe": "${safeVibe}",
  "summary": "2-3 sentences summarizing the vision, sensory pacing, and executive direction.",
  "vitalityScore": 98,
  "budgetBreakdown": [
    {
      "category": "Venue & Estate",
      "amount": <number>,
      "percentage": <number>,
      "desc": "Short description of venue fee or site lease"
    },
    {
      "category": "Catering & Cellar",
      "amount": <number>,
      "percentage": <number>,
      "desc": "Chef, multi-course dining, premium wine/cocktails"
    },
    {
      "category": "Floral & Scenic Decor",
      "amount": <number>,
      "percentage": <number>,
      "desc": "Tablescapes, botanical installations, entry arch"
    },
    {
      "category": "Music & Entertainment",
      "amount": <number>,
      "percentage": <number>,
      "desc": "Headline DJ, sound engineering, live acoustic musicians"
    },
    {
      "category": "Lighting & Ambience",
      "amount": <number>,
      "percentage": <number>,
      "desc": "DMX ambient lighting, warm amber washes, candle arrays"
    },
    {
      "category": "Photography & Cinema",
      "amount": <number>,
      "percentage": <number>,
      "desc": "Editorial photography, drone capture, color-graded highlight film"
    },
    {
      "category": "Logistics & Staffing",
      "amount": <number>,
      "percentage": <number>,
      "desc": "VIP valet, event security, guest shuttle transport"
    },
    {
      "category": "Smart Contingency Buffer",
      "amount": <number>,
      "percentage": <number>,
      "desc": "Microclimate buffer, radiant heaters, last-minute overtime reserve"
    }
  ],
  "timeline": [
    {
      "phase": "Strategic Foundation",
      "timing": "12–8 Weeks Out",
      "title": "Venue Lock & Spatial CAD Design",
      "desc": "Contract execution, venue deposit escrow, acoustic zoning permit filed."
    },
    {
      "phase": "Vendor Synthesis",
      "timing": "6–4 Weeks Out",
      "title": "Culinary Tastings & Soundcheck Protocol",
      "desc": "Menu pairing finalized with sommelier; DJ playlist and decibel curve mapped."
    },
    {
      "phase": "Guest Experience",
      "timing": "2 Weeks Out",
      "title": "RSVP Lock & Seating Harmony Matrix",
      "desc": "Dietary requirements reconciled; bespoke name calligraphy and table layout locked."
    },
    {
      "phase": "Day-of Run of Show",
      "timing": "10:00 - 15:30",
      "title": "Vendor Load-in & Lighting DMX Calibration",
      "desc": "Scenic rigging, lighting Kelvin temperature verified, floral delivery accepted."
    },
    {
      "phase": "Day-of Run of Show",
      "timing": "17:30 - 19:00",
      "title": "Guest Arrival, Golden Hour Welcome & Music",
      "desc": "Valet receiving, champagne flutes poured, live acoustic opening set."
    },
    {
      "phase": "Day-of Run of Show",
      "timing": "19:00 - 21:30",
      "title": "Seated Culinary Journey & Curated Speeches",
      "desc": "Synchronized dinner courses, micro-speeches, dimmed candlelight transition."
    },
    {
      "phase": "Day-of Run of Show",
      "timing": "21:30 - 00:30",
      "title": "High-Energy DJ Set & Midnight Toast",
      "desc": "Dynamic lighting shifts, curated dance tracks, espresso martini lounge open."
    }
  ],
  "vendorChecklist": [
    {
      "id": "v1",
      "category": "Venue",
      "title": "Premier Estate / Pavilion Venue",
      "status": "Booked",
      "allocated": <number matching Venue category>,
      "sla": "12-hour exclusive load-in & decibel compliance",
      "recommended": "Verify power backup and sound curfew before contract signing."
    },
    {
      "id": "v2",
      "category": "Catering",
      "title": "Executive Catering & Private Sommelier",
      "status": "In Negotiation",
      "allocated": <number matching Catering category>,
      "sla": "1:8 server ratio and 100% dietary precision",
      "recommended": "Secure local seasonal pairings and sommelier decanting window."
    },
    {
      "id": "v3",
      "category": "Floral & Decor",
      "title": "Bespoke Botanical Studio",
      "status": "Shortlisted",
      "allocated": <number matching Floral category>,
      "sla": "Day-of morning delivery with on-site designer refresh",
      "recommended": "Request sample tablescape trial 3 weeks prior."
    },
    {
      "id": "v4",
      "category": "Music & DJ",
      "title": "Headline Event DJ & Sound Engineer",
      "status": "Booked",
      "allocated": <number matching Music category>,
      "sla": "Pre-screened Do-Not-Play list, redundant wireless mics",
      "recommended": "Conduct acoustic soundcheck at 14:00 to eliminate pavilion echo."
    },
    {
      "id": "v5",
      "category": "Lighting & Ambience",
      "title": "Architectural Lighting Specialist",
      "status": "In Negotiation",
      "allocated": <number matching Lighting category>,
      "sla": "Color-temperature matching 2200K to 2700K",
      "recommended": "Use wireless pin spots for floral centerpieces."
    },
    {
      "id": "v6",
      "category": "Photography & Cinema",
      "title": "Editorial Photography & Motion Studio",
      "status": "Shortlisted",
      "allocated": <number matching Photography category>,
      "sla": "8-hour continuous coverage, drone authorization",
      "recommended": "Provide shot list focusing on candid emotion and evening lighting."
    }
  ],
  "personalizedIdeas": [
    {
      "type": "Theme & Creative Concept",
      "title": "Specific creative title reflecting ${safeVibe}",
      "description": "Compelling narrative detailing the aesthetic theme, signature colors, guest dress code, and atmospheric touches."
    },
    {
      "type": "Music & DJ Curation",
      "title": "Curated Sonic Progression & DJ Style",
      "description": "Specific genres, transition from cocktail hour jazz/downtempo to peak-hour deep house or retro-funk, key tracks, and sound design."
    },
    {
      "type": "Lighting & Sensory Ambience",
      "title": "Cinematic Illumination & Temperature Palette",
      "description": "Exact Kelvin color temperatures (e.g. 2400K candlelight wash), kinetic moving fixtures, uplighting accents, and scent/sound integration."
    },
    {
      "type": "Culinary & Beverage Pacing",
      "title": "Signature Tasting & Liquid Chemistry",
      "description": "Unique welcome cocktail, seasonal pairing highlights, late-night surprise bite, and presentation theatricality."
    },
    {
      "type": "Spatial Experience & Guest Journey",
      "title": "Choreographed Arrival & Intimate Discovery",
      "description": "Guest ingress sequence, secret lounge reveal, photo-worthy interactive moment, and graceful midnight send-off."
    }
  ]
}

CRITICAL RULES:
1. The sum of all 'amount' values in 'budgetBreakdown' MUST equal exactly ${numBudget}.
2. Ensure all numbers are integers (no strings for amounts).
3. Ensure 'personalizedIdeas' has exactly 5 rich, tailored items covering Theme, Music/DJ, Lighting, Culinary, and Spatial.`;

      const ai = getGenAIClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: 'application/json',
        },
      });

      let rawText = response?.text?.trim() || '{}';
      if (rawText.startsWith('```json')) {
        rawText = rawText.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (rawText.startsWith('```')) {
        rawText = rawText.replace(/^```/, '').replace(/```$/, '').trim();
      }

      let parsed;
      try {
        parsed = JSON.parse(rawText);
      } catch (jsonErr) {
        console.error('Failed to parse Gemini JSON output:', jsonErr);
        throw new Error('Invalid plan blueprint generated.');
      }

      // Reconcile budget math so it equals exactly numBudget
      if (Array.isArray(parsed.budgetBreakdown) && parsed.budgetBreakdown.length > 0) {
        let currentSum = 0;
        parsed.budgetBreakdown.forEach((item: { amount: number }) => {
          item.amount = Math.round(Number(item.amount) || 0);
          currentSum += item.amount;
        });
        const diff = numBudget - currentSum;
        if (diff !== 0) {
          const lastIndex = parsed.budgetBreakdown.length - 1;
          parsed.budgetBreakdown[lastIndex].amount += diff;
        }
        parsed.budgetBreakdown.forEach((item: { amount: number; percentage: number }) => {
          item.percentage = Number(((item.amount / numBudget) * 100).toFixed(1));
        });
      }

      res.json(parsed);
    } catch (error: unknown) {
      console.error('Error in /api/gemini/generate-plan:', error instanceof Error ? error.message : 'Unknown');
      res.status(500).json({
        error: 'Unable to synthesize event plan at this moment. Please check parameters and retry.',
      });
    }
  });

  // Audio Transcription Endpoint using gemini-3.5-transcribe
  app.post('/api/gemini/transcribe', async (req: Request, res: Response): Promise<void> => {
    try {
      const { audioBase64, mimeType = 'audio/webm' } = req.body || {};

      if (!audioBase64 || typeof audioBase64 !== 'string') {
        res.status(400).json({ error: 'audioBase64 string payload is required.' });
        return;
      }

      // Validate mime type
      const safeMime = ALLOWED_AUDIO_MIMES.has(mimeType) ? mimeType : 'audio/webm';

      const cleanBase64 = audioBase64.includes(',')
        ? audioBase64.split(',')[1]
        : audioBase64;

      // Limit audio payload length (max ~8MB base64 which corresponds to ~6MB raw)
      if (cleanBase64.length > 8 * 1024 * 1024) {
        res.status(413).json({ error: 'Audio recording exceeds allowed 6MB size limit.' });
        return;
      }

      const ai = getGenAIClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-transcribe',
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: safeMime,
                  data: cleanBase64,
                },
              },
              {
                text: 'Transcribe the spoken audio accurately into clean text. Return only the transcribed text with proper punctuation and capitalization, without any introductory or concluding commentary.',
              },
            ],
          },
        ],
      });

      const transcript = response?.text?.trim() || '';
      res.json({
        text: transcript,
        model: 'gemini-3.5-transcribe',
      });
    } catch (error: unknown) {
      console.error('Error in /api/gemini/transcribe:', error instanceof Error ? error.message : 'Unknown');
      res.status(500).json({
        error: 'Spoken directive transcription could not be completed. Please speak clearly or use text input.',
      });
    }
  });

  // Serve static assets or mount Vite dev middleware
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aura Server running on http://localhost:${PORT}`);
  });
}

startServer();
