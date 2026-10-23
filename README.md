# Aura — Autonomous Celebration Intelligence

> **Nocturne Luminary Theme**: Deep midnight navy, electric indigo, and burnished champagne gold. Autonomous AI orchestration, vendor negotiation, spatial ambience studio, and financial escrow ledger for luxury celebrations.

---

## ✦ Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Core Features](#core-features)
- [Security & Production Hardening](#security--production-hardening)
- [Directory Structure](#directory-structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)

---

## Overview

Aura is a full-stack celebration planning assistant built for high-stakes celebrations (weddings, milestone birthdays, galas, and community events). Users define their vision through an interactive New Event Wizard, and the server-side Gemini AI engine synthesizes a comprehensive event blueprint—including an exact category budget allocation, a milestone timeline, a vendor SLA checklist, and 5 personalized creative ideas (Theme, Music/DJ, Lighting, Culinary, Spatial).

The resulting plan propagates synchronously across the entire suite—Plan Overview, Budget Ledger, Vendor Directory, Schedule, and the Ambience Studio—with offline persistence in `localStorage` and real-time cloud synchronization via Firebase Firestore.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Client (SPA)                          │
│  React 19 + Vite + Tailwind CSS + React Router v7           │
│  - Lazy-loaded routes with React.lazy() & Suspense          │
│  - AuraContext state management & localStorage persistence  │
│  - Floating AI Copilot widget + Web Audio recording         │
└──────────────────────────────┬──────────────────────────────┘
                               │ JSON API (/api/*)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Server (Express)                        │
│  - Sliding-window in-memory IP Rate Limiter (35 req/min)    │
│  - Request payload size guard (6 MB limit)                  │
│  - Input sanitization & numerical bounds clamping           │
│  - Masked production error responses                        │
│  - Server-side Google GenAI SDK integration                 │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
    Google Gemini Models              Firebase Firestore & Auth
    - gemini-3.8-flash (Chat/Plan)     - User profiles
    - gemini-3.1-flash-lite (Dispatch) - Directive tasks
    - gemini-3.5-transcribe (Audio)    - Events & chat logs
```

---

## Core Features

1. **New Event Wizard (`/new-event`)**:
   - Collects event type, date, guest count, budget, destination city, and aesthetic vibe.
   - Dispatches a structured prompt to `POST /api/gemini/generate-plan`.
   - Returns strictly validated JSON guaranteeing that budget line items reconcile to 100% of the allocated cap.

2. **Master Plan Overview (`/plan-overview`)**:
   - High-level executive brief with Vitality Score calculation.
   - 5 bespoke creative directives covering Theme, DJ/Music sonic arc, 2400K candlelight illumination, culinary pairings, and spatial guest journey.
   - Interactive milestone timeline cards and multi-bar capital allocation breakdown.

3. **Financial Ledger & Escrow Procurement (`/budget`)**:
   - Real-time escrow tracking under protocol rules with FDIC-partnered vault status.
   - Category budget tracking with color-coded utilization envelopes.
   - Strategic Intelligence feed with 1-click discount acceptance.
   - Filterable ledger table (All, Escrow Protected, Released) and OCR invoice ingestion modal.

4. **Curated Vendor Directory (`/vendors`)**:
   - Filter by status (`Booked`, `In Negotiation`, `Shortlisted`) and live keyword search.
   - Individual vendor cards detailing target budget, contractual SLA standards, ratings, and AI negotiation recommendations.
   - 1-click transition to AI Copilot for contract terms negotiation.

5. **Ambience & Acoustic Studio (`/ambience-studio`)**:
   - Interactive Master Environment mood selector (Warm Gold / Champagne Hearth, Neon Party / Midnight Cyber, Twilight Rose / Ethereal Twilight).
   - Real-time reactive background lighting shader reacting to mood switches.
   - Evening Sonic Energy Curve with BPM phases (Phase I: 95 BPM, Phase II: 108 BPM, Phase III: 124 BPM).
   - Interactive 2D/3D Meadowwood glass pavilion acoustic simulation with automated cue test triggers.

6. **Day-of Run of Show Schedule (`/schedule`)**:
   - Toggle between Day-of Run-of-Show cues and Pre-Event Countdown milestones.
   - Micro-Radar weather card displaying ambient temperature, humidity, wind, and astronomical sunset timing.

7. **Aura AI Copilot Floating Widget (`AuraCopilotWidget`)**:
   - Available across all application routes (suppressed on `/concierge-support`).
   - Page-aware context injection (prioritizes budget rules on `/budget`, SLAs on `/vendors`, cue times on `/schedule`).
   - Built-in microphone audio recording with speech-to-text powered by `gemini-3.5-transcribe`.

8. **VIP Concierge Desk (`/concierge-support`)**:
   - Multi-turn conversational interface with selectable personas (Arthur Vance, Aura Architect L4, Escrow Strategist).
   - Live simulated audio call modal and transcript export tools.

---

## Security & Production Hardening

- **Zero Client Secrets**: The Google Gemini API key lives exclusively in `process.env.GEMINI_API_KEY` on the Node.js Express server. No keys or tokens are ever exposed to the client bundle.
- **API Rate Limiting**: All `/api/gemini/*` endpoints are protected by an in-memory sliding-window rate limiter (35 requests/minute per client IP), returning HTTP 429 and `Retry-After` headers if exceeded.
- **Request Body Limits**: Express JSON parser enforces a strict 6 MB payload ceiling, allowing base64 audio clips while mitigating denial-of-service memory exhaustion.
- **Input Validation & Sanitization**:
  - HTML tag brackets (`<`, `>`) are stripped from incoming prompts and user messages.
  - Text lengths are capped (max 2,000 characters per message, max 20 messages per conversation window).
  - Numeric values (budget, guest count) are validated and clamped to realistic boundaries.
  - Allowed audio MIME types are strictly verified against an approved whitelist.
- **Safe Rendering**: All user and AI text is rendered via React text nodes; raw HTML injection (`dangerouslySetInnerHTML`) is strictly prohibited.
- **Security Headers**: Standard defense-in-depth headers applied: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`.
- **Masked Error Responses**: Server error handlers log full diagnostic information internally while returning sanitized, user-friendly messages to the client.

---

## Directory Structure

```
├── .env.example                     # Environment template
├── eslint.config.js                 # ESLint flat configuration (zero warnings)
├── package.json                     # Dependencies & scripts
├── server.ts                        # Hardened Express API & Vite dev server
├── src/
│   ├── App.jsx                      # App root with React.lazy() & Suspense routes
│   ├── firebase.js                  # Firebase Auth & Firestore client
│   ├── index.css                    # Tailwind CSS v4 Nocturne Luminary theme
│   ├── components/
│   │   ├── AuraCopilotWidget.jsx    # Floating Gemini chat & audio transcriber
│   │   ├── Icon.jsx                 # Material Symbols icon wrapper
│   │   ├── Layout.jsx               # Modular shell wrapper
│   │   ├── PageLoadingFallback.jsx  # Route transition spinner
│   │   ├── ambience/                # MoodSelector, AcousticEnergyCurve, etc.
│   │   ├── budget/                  # BudgetKPIs, DisbursalLedgerTable, etc.
│   │   ├── dashboard/               # EventHero, MetricsRow, DonutChart, etc.
│   │   ├── layout/                  # Header, Footer
│   │   ├── plan/                    # PlanHeroBanner, PlanIdeasGrid, etc.
│   │   ├── schedule/                # TimelineNode, WeatherRadarCard
│   │   └── vendors/                 # VendorFilterBar, VendorCard, SecurityBanner
│   ├── context/
│   │   └── AuraContext.jsx          # Central reactive event state & auth provider
│   ├── data/                        # Static datasets & configuration constants
│   │   ├── ambienceData.js          # Mood gradients & photometrics
│   │   ├── budgetData.js            # Ledger transactions & strategic tips
│   │   ├── conciergeData.js         # Quick directives & producer specs
│   │   ├── dashboardData.js         # Dashboard KPI metrics & donut segments
│   │   ├── defaultPlan.js           # Baseline celebration plan, events, tasks
│   │   ├── navigation.js            # Nav routes & initial notifications
│   │   ├── personas.js              # Chat personas & model configurations
│   │   └── wizardData.js            # Event typology & vibe options
│   ├── pages/                       # Application route views
│   └── utils/
│       └── categories.js            # Category icons, images, currency formatters
```

---

## Environment Variables

Copy `.env.example` to `.env`:

```bash
# Server-side Gemini API key (automatically injected in AI Studio runtime)
GEMINI_API_KEY=your_gemini_api_key_here

# Optional server port (defaults to 3000)
PORT=3000

# Node runtime environment
NODE_ENV=development
```

---

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run in Development Mode**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Verify Linting**:
   ```bash
   npm run lint
   ```

---

## Testing & Quality Assurance

Aura includes a comprehensive automated test suite powered by **Vitest** and **React Testing Library** with jsdom:

```bash
npm test
```

### Test Coverage Highlights:
- **Plan Generator (`src/test/planGenerator.test.jsx`)**:
  - Verifies generated budget breakdown sums to 100% of the allocated budget cap.
  - Verifies exact reconciliation across boundary values.
  - Enforces input validation (clamped guest bounds `2–25,000`, budget ranges `$1,000–$50,000,000`, and required destination/typology fields).
- **Chat Widget (`src/test/chatWidget.test.jsx`)**:
  - Simulates interactive drawer launching and context question dispatching.
  - Tests multi-turn message handling and automatic input resetting.
  - Verifies friendly masked error card display with 1-click retry on API failures.
  - Asserts suppression on `/concierge-support` desk page.
- **Routing & Landmarks (`src/test/routing.test.jsx`)**:
  - Validates seamless route transitions across all 8 views (`/`, `/new-event`, `/plan-overview`, `/budget`, `/vendors`, `/schedule`, `/ambience-studio`, `/concierge-support`).
  - Asserts skip to main content link and `<main id="main-content">` landmark present on every page.
- **Wizard Form (`src/test/wizardForm.test.jsx`)**:
  - Validates interactive typology cards, vibe mood selectors, range sliders, and text fields.
  - Tests keyboard navigation activation (`Enter` / `Space`) with `aria-pressed` states.
  - Validates submission flow and navigation to `/plan-overview`.

---

## Accessibility (WCAG AA Compliance)

Aura strictly adheres to WCAG 2.1 AA accessibility standards:
- **Keyboard Navigation**: Universal skip-to-content anchor (`#main-content`), focusable interactive cards with `role="button"`, `tabIndex={0}`, and Enter/Space handlers.
- **Form Controls & Labels**: Every input, select, and slider is paired with a real `<label>` element containing matching `htmlFor`/`id` bindings.
- **Icon-Only Buttons**: Informative, descriptive `aria-label` tags for all close, mic, export, menu, and dispatch buttons.
- **Visible Focus Indicators**: Global high-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-secondary-fixed focus-visible:outline-none`).
- **Heading Hierarchy**: Semantic heading structure starting with page `<h1>` followed strictly by `<h2>` and `<h3>` across all routes.
- **Live Regions**: Dynamic chat threads and AI synthesis statuses utilize `aria-live="polite"` and `aria-atomic="false"` for screen reader announcements.
- **Reduced Motion Support**: Full `@media (prefers-reduced-motion: reduce)` support that disables kinetic transitions, transforms, and animations for users sensitive to motion.
- **Color Contrast**: Complies with AA contrast ratios against Nocturne Luminary dark surfaces.

---

## Available Scripts

- `npm run dev`: Boots Express with integrated Vite middleware on port 3000.
- `npm run build`: Compiles production frontend bundle into `dist/`.
- `npm run start`: Starts production Node.js Express server serving `dist/`.
- `npm test`: Runs Vitest test suite covering plan generation, copilot widget, routing, and wizard form.
- `npm run lint`: Runs ESLint over all files with 0 warnings.
