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

const BASE64_REGEX = /^[A-Za-z0-9+/]+={0,2}$/;

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

interface RateLimitRecord {
  timestamps: number[];
}
const rateLimitStore = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 35;

function sanitizeString(input: unknown, maxLen = 300): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .slice(0, maxLen);
}

function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'local';

  const now = Date.now();
  const record = rateLimitStore.get(ip) || { timestamps: [] };

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

  if (rateLimitStore.size > 2000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (
        value.timestamps.length === 0 ||
        now - value.timestamps[value.timestamps.length - 1] > RATE_LIMIT_WINDOW_MS
      ) {
        rateLimitStore.delete(key);
      }
    }
  }

  next();
}

let cachedGenAIClient: GoogleGenAI | null = null;

function getGenAIClient(): GoogleGenAI {
  if (cachedGenAIClient) return cachedGenAIClient;

  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }
  cachedGenAIClient = new GoogleGenAI({
    apiKey,
  });
  return cachedGenAIClient;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.disable('x-powered-by');

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), geolocation=(), microphone=(self)');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https:;"
    );
    next();
  });

  app.use(express.json({ limit: '6mb' }));
  app.use('/api/gemini', rateLimiter);

  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Aura Celebration Intelligence Engine',
      uptime: Math.floor(process.uptime()),
    });
  });

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
      const safeEventContext =
        sanitizeString(eventContext, 1500) ||
        'Julian & Maya Autumn Gala, Napa Valley, $75,000 budget, 120 guests';

      const pageGuidance = `
Current User Page: ${safeCurrentPage}
- If the user is on "/budget": prioritize financial questions, cost savings, category caps, escrow milestones, and pricing.
- If the user is on "/vendors": prioritize vendor checklist questions, contract SLAs, deliverables, and negotiation tactics.
- If the user is on "/schedule": prioritize timing, call sheets, run-of-show cues, and milestone dates.
- If the user is on "/ambience-studio" or "/plan-overview": prioritize music/DJ recommendations, acoustic decibels, lighting warmth/lux, and theme ideas.
- Provide concrete, friendly, executive assistance covering pricing, dates, timings, DJ/music, and lighting whenever asked.`;

      const systemInstruction = `${baseSystemInstruction}\n\n${pageGuidance}\n\nActive Celebration Context:\n${safeEventContext}`;

      const sanitizedContents = messages
        .filter((m: any) => m && typeof m.text === 'string' && m.text.trim().length > 0)
        .slice(-20)
        .map((m: any) => ({
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown';
      console.error('Error in /api/gemini/chat:', errorMessage);
      res.status(500).json({
        error: 'Aura AI engine is currently calibrating. Please verify connection and try again.',
      });
    }
  });

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
  "eventName": "A compelling, opulent title for this event",
  "eventType": "${safeEventType}",
  "city": "${safeCity}",
  "date": "${safeDate}",
  "guestCount": ${numGuests},
  "budget": ${numBudget},
  "vibe": "${safeVibe}",
  "summary": "2-3 sentences summarizing the vision, sensory pacing, and executive direction.",
  "vitalityScore": 98,
  "budgetBreakdown": [
    { "category": "Venue & Estate", "amount": 25000, "percentage": 33.3, "desc": "Venue fee" },
    { "category": "Catering & Cellar", "amount": 25000, "percentage": 33.3, "desc": "Catering" },
    { "category": "Floral & Scenic Decor", "amount": 10000, "percentage": 13.3, "desc": "Decor" },
    { "category": "Music & Entertainment", "amount": 5000, "percentage": 6.7, "desc": "DJ" },
    { "category": "Lighting & Ambience", "amount": 4000, "percentage": 5.3, "desc": "Lighting" },
    { "category": "Photography & Cinema", "amount": 3000, "percentage": 4.0, "desc": "Photo" },
    { "category": "Logistics & Staffing", "amount": 2000, "percentage": 2.7, "desc": "Valet" },
    { "category": "Smart Contingency Buffer", "amount": 1000, "percentage": 1.4, "desc": "Buffer" }
  ],
  "timeline": [],
  "vendorChecklist": [],
  "personalizedIdeas": [
    { "type": "Theme & Creative Concept", "title": "Concept", "description": "Desc" },
    { "type": "Music & DJ Curation", "title": "Music", "description": "Desc" },
    { "type": "Lighting & Sensory Ambience", "title": "Lighting", "description": "Desc" },
    { "type": "Culinary & Beverage Pacing", "title": "Culinary", "description": "Desc" },
    { "type": "Spatial Experience & Guest Journey", "title": "Spatial", "description": "Desc" }
  ]
}`;

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
      const errorMessage = error instanceof Error ? error.message : 'Unknown';
      console.error('Error in /api/gemini/generate-plan:', errorMessage);
      res.status(500).json({
        error: 'Unable to synthesize event plan at this moment. Please check parameters and retry.',
      });
    }
  });

  app.post('/api/gemini/transcribe', async (req: Request, res: Response): Promise<void> => {
    try {
      const { audioBase64, mimeType = 'audio/webm' } = req.body || {};

      if (!audioBase64 || typeof audioBase64 !== 'string') {
        res.status(400).json({ error: 'audioBase64 string payload is required.' });
        return;
      }

      const safeMime = ALLOWED_AUDIO_MIMES.has(mimeType) ? mimeType : 'audio/webm';
      const cleanBase64 = (
        audioBase64.includes(',') ? audioBase64.split(',')[1] : audioBase64
      ).replace(/\s/g, '');

      if (cleanBase64.length === 0 || cleanBase64.length > 8 * 1024 * 1024) {
        res.status(413).json({ error: 'Audio recording exceeds allowed 6MB size limit.' });
        return;
      }

      if (!BASE64_REGEX.test(cleanBase64)) {
        res.status(400).json({ error: 'Malformed base64 audio payload.' });
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown';
      console.error('Error in /api/gemini/transcribe:', errorMessage);
      res.status(500).json({
        error: 'Spoken directive transcription could not be completed. Please speak clearly or use text input.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath, { maxAge: '1d' }));
    app.use((_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
  });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aura Server running on http://localhost:${PORT}`);
  });

  const shutdown = () => {
    server.close(() => {
      process.exit(0);
    });
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

startServer();
