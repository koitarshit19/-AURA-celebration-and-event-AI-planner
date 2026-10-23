import { memo } from 'react'

const PLAYLIST_ITEMS = [
  {
    title: 'Rosemary Sprig & Velvet Strings',
    artist: 'Sven Van Dijk • Autumn Salon Edit',
    bpm: '98 BPM',
    genre: 'NU JAZZ',
    duration: '04:12',
  },
  {
    title: 'Midnight Horizon (Saxophone Dub)',
    artist: 'Kai Vance • Aura Exclusive Dubplate',
    bpm: '124 BPM',
    genre: 'DEEP MELODIC',
    duration: '05:48',
  },
  {
    title: 'Provence Luminary (Ambient Reprise)',
    artist: 'Héloïse Moreau Quartet',
    bpm: '102 BPM',
    genre: 'ACOUSTIC DOWNTEMPO',
    duration: '03:35',
  },
]

function AcousticEnergyCurveComponent() {
  return (
    <div className="p-6 rounded-2xl bg-surface-container-low/70 backdrop-blur-xl shadow-xl flex flex-col gap-space-md">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-caps text-label-caps uppercase text-primary-fixed-dim">
              Acoustic Choreography
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            Evening Sonic Energy Curve
          </h3>
        </div>
        <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-xl">
          <span className="material-symbols-outlined text-secondary text-[16px]">
            graphic_eq
          </span>
          <span className="font-label-md text-label-md text-secondary-fixed">
            Target: Dynamic Arc
          </span>
        </div>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant">
        Predictive acoustic curve balancing guest conversational comfort during dining with euphoric floor energy for late-night transitions.
      </p>
      <div className="relative w-full rounded-xl p-4 bg-surface-container-lowest/80 overflow-hidden">
        <div className="flex items-center justify-between text-label-caps font-label-caps text-on-surface-variant mb-2 font-mono">
          <span>18:00 • ARRIVAL</span>
          <span>20:00 • TWILIGHT BANQUET</span>
          <span>22:30 • GALA PEAK</span>
          <span>01:30 • AFTER-HOURS</span>
        </div>
        <svg className="w-full h-36" fill="none" preserveAspectRatio="none" viewBox="0 0 700 140">
          <defs>
            <linearGradient id="curveGradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#d3c5a8" stopOpacity="0.3" />
              <stop offset="35%" stopColor="#c0c1ff" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#a078ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8083ff" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="fillGradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#c0c1ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10131a" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <line className="text-outline-variant/30" stroke="currentColor" strokeDasharray="4 4" x1="0" x2="700" y1="35" y2="35" />
          <line className="text-outline-variant/30" stroke="currentColor" strokeDasharray="4 4" x1="0" x2="700" y1="75" y2="75" />
          <line className="text-outline-variant/30" stroke="currentColor" strokeDasharray="4 4" x1="0" x2="700" y1="115" y2="115" />
          <path d="M0,110 C80,105 120,95 200,90 C280,85 330,75 420,40 C490,15 540,10 600,20 C650,28 680,65 700,85 L700,140 L0,140 Z" fill="url(#fillGradient)" />
          <path d="M0,110 C80,105 120,95 200,90 C280,85 330,75 420,40 C490,15 540,10 600,20 C650,28 680,65 700,85" stroke="url(#curveGradient)" strokeLinecap="round" strokeWidth="3.5" />
          <circle className="fill-secondary-fixed shadow-md" cx="90" cy="104" r="5" />
          <circle className="fill-primary-fixed" cx="270" cy="85" r="5" />
          <circle className="fill-tertiary animate-ping" cx="530" cy="12" r="6" />
          <circle className="fill-tertiary-fixed" cx="530" cy="12" r="6" />
        </svg>
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 bg-surface-container/30 px-3 py-2 rounded-lg">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-secondary-fixed">
              PHASE I • 95 BPM
            </span>
            <span className="font-label-md text-label-md text-on-surface font-medium truncate">
              Welcome Cocktails
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Lounge, Lo-Fi Vinyl, 55dB
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-primary-fixed">
              PHASE II • 108 BPM
            </span>
            <span className="font-label-md text-label-md text-on-surface font-medium truncate">
              Sunset Dinner
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Acoustic Soul, Warm Reverb
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-tertiary-fixed">
              PHASE III • 124 BPM
            </span>
            <span className="font-label-md text-label-md text-on-surface font-medium truncate">
              Late Night Gala
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Deep House, Live Sax Apex
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Curated Sonic Queue
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-bright text-on-surface-variant text-label-caps font-label-caps">
              184 TRACKS MASTERED
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-label-caps font-label-caps text-on-surface">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span>SYNCED: SPOTIFY • APPLE LOSSLESS</span>
          </div>
        </div>

        {PLAYLIST_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="group flex items-center justify-between p-3 rounded-xl bg-surface-container/60 hover:bg-surface-container-high transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                className="w-9 h-9 shrink-0 rounded-lg bg-surface-bright group-hover:bg-primary group-hover:text-on-primary text-primary transition-all flex items-center justify-center cursor-pointer"
                type="button"
                aria-label={`Play ${item.title}`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  play_arrow
                </span>
              </button>
              <div className="flex flex-col min-w-0">
                <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                  {item.title}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {item.artist}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-surface-container-highest text-secondary-fixed text-label-caps font-label-caps">
                {item.bpm}
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant text-label-caps font-label-caps">
                {item.genre}
              </span>
              <span className="text-on-surface-variant font-mono text-body-sm">
                {item.duration}
              </span>
              <button
                className="text-on-surface-variant hover:text-secondary-fixed transition-colors cursor-pointer"
                type="button"
                aria-label="Favorite track"
              >
                <span className="material-symbols-outlined text-[18px]">
                  favorite
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(AcousticEnergyCurveComponent)
