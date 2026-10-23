import { useEffect } from 'react'

export default function Ambience() {
  // Original Stitch interactivity (runs once after the page is on screen)
  useEffect(() => {
    function switchMood(mood) {
          const engine = document.getElementById('ambient-lighting-engine');
          const tag = document.getElementById('active-mood-tag');
      
          const btnGold = document.getElementById('mood-btn-gold');
          const btnNeon = document.getElementById('mood-btn-neon');
          const btnPastel = document.getElementById('mood-btn-pastel');

          // Reset card visual borders
          [btnGold, btnNeon, btnPastel].forEach(b => {
            b.classList.remove('ring-1', 'ring-secondary-fixed/50', 'ring-tertiary/60', 'ring-primary/60', 'shadow-[0_0_24px_rgba(240,225,195,0.22)]', 'shadow-[0_0_24px_rgba(160,120,255,0.3)]', 'shadow-[0_0_24px_rgba(192,193,255,0.25)]');
            const indicator = b.querySelector('.mood-radio-indicator');
            if (indicator) {
              indicator.classList.remove('bg-secondary-fixed', 'bg-tertiary', 'bg-primary');
              indicator.classList.add('bg-surface-bright');
              indicator.firstElementChild.className = 'w-1.5 h-1.5 rounded-full bg-transparent';
            }
          });

          if (mood === 'gold') {
            engine.style.background = 'radial-gradient(circle at 50% 12%, rgba(240, 225, 195, 0.22) 0%, rgba(211, 197, 168, 0.08) 35%, rgba(16, 19, 26, 0) 70%)';
            tag.textContent = 'CHAMPAGNE HEARTH • 2700K';
            tag.className = 'px-2.5 py-1 rounded-full bg-secondary-container/50 text-secondary-fixed font-label-caps text-label-caps font-semibold tracking-wider';
        
            btnGold.classList.add('ring-1', 'ring-secondary-fixed/50', 'shadow-[0_0_24px_rgba(240,225,195,0.22)]');
            const ind = btnGold.querySelector('.mood-radio-indicator');
            ind.classList.remove('bg-surface-bright');
            ind.classList.add('bg-secondary-fixed');
            ind.firstElementChild.className = 'w-1.5 h-1.5 rounded-full bg-on-secondary-fixed';

          } else if (mood === 'neon') {
            engine.style.background = 'radial-gradient(circle at 50% 12%, rgba(160, 120, 255, 0.25) 0%, rgba(73, 75, 214, 0.15) 40%, rgba(16, 19, 26, 0) 75%)';
            tag.textContent = 'MIDNIGHT CYBER • RGB PULSE';
            tag.className = 'px-2.5 py-1 rounded-full bg-tertiary-container/40 text-tertiary-fixed font-label-caps text-label-caps font-semibold tracking-wider';

            btnNeon.classList.add('ring-1', 'ring-tertiary/60', 'shadow-[0_0_24px_rgba(160,120,255,0.3)]');
            const ind = btnNeon.querySelector('.mood-radio-indicator');
            ind.classList.remove('bg-surface-bright');
            ind.classList.add('bg-tertiary');
            ind.firstElementChild.className = 'w-1.5 h-1.5 rounded-full bg-on-tertiary';

          } else if (mood === 'pastel') {
            engine.style.background = 'radial-gradient(circle at 50% 12%, rgba(192, 193, 255, 0.22) 0%, rgba(208, 188, 255, 0.12) 38%, rgba(16, 19, 26, 0) 70%)';
            tag.textContent = 'ETHEREAL TWILIGHT • 4000K ROSE';
            tag.className = 'px-2.5 py-1 rounded-full bg-primary-container/30 text-primary font-label-caps text-label-caps font-semibold tracking-wider';

            btnPastel.classList.add('ring-1', 'ring-primary/60', 'shadow-[0_0_24px_rgba(192,193,255,0.25)]');
            const ind = btnPastel.querySelector('.mood-radio-indicator');
            ind.classList.remove('bg-surface-bright');
            ind.classList.add('bg-primary');
            ind.firstElementChild.className = 'w-1.5 h-1.5 rounded-full bg-on-primary';
          }
        }
    window.switchMood = switchMood
  }, [])

  return (
      <>
      <div className="flex flex-col w-full relative">
        <div className="pointer-events-none fixed inset-0 -z-10 transition-all duration-1000 ease-out" id="ambient-lighting-engine" style={{ "background": "radial-gradient(circle at 50% 12%, rgba(240, 225, 195, 0.18) 0%, rgba(211, 197, 168, 0.08) 32%, rgba(16, 19, 26, 0) 70%)" }}></div>
        <section className="w-full max-w-7xl mx-auto px-margin-sm lg:px-margin pt-6 pb-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-secondary-fixed text-label-caps font-label-caps uppercase tracking-widest shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping"></span>
                  {' '}
                  Aura Sonic & Spatial Engine
                </span>
                <span className="text-outline text-label-caps font-label-caps">
                  // STUDIO DEPLOYMENT 05
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  Ambience & Acoustic Studio
                </h1>
                <span className="font-label-md text-label-md text-secondary-fixed-dim hidden sm:inline">
                  Meadowwood Glass Pavilion
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-container/70 backdrop-blur-xl shadow-lg border-0 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <div className="relative flex items-center justify-center w-3 h-3">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-pulse"></span>
                <span className="absolute inset-0 rounded-full bg-secondary-fixed/30 blur-sm"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">
                    DMX Fixtures Synced
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-bright text-secondary-fixed font-mono">
                    12/12 ONLINE
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-secondary">
                    wb_twilight
                  </span>
                  {' '}
                  Lux level calibrating to Golden Hour (2,100K • 48 Lux)
                </span>
              </div>
              <div className="h-8 w-px bg-surface-bright hidden sm:block"></div>
              <button className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright transition-colors text-primary font-label-md text-label-md" type="button">
                <span className="material-symbols-outlined text-[16px]">
                  tune
                </span>
                {' '}
                Overdrive
              </button>
            </div>
          </div>
        </section>
        <section className="w-full max-w-7xl mx-auto px-margin-sm lg:px-margin my-space-md">
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary-fixed">
                  Interactive Master Environment
                </span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                  Spatial Lighting Mood Selector
                  {' '}
                  <span className="material-symbols-outlined text-[18px] text-secondary" style={{ "fontVariationSettings": "'FILL' 1" }}>
                    light_mode
                  </span>
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Adaptive Photometrics
                </span>
                <span className="px-2.5 py-1 rounded-full bg-secondary-container/50 text-secondary-fixed font-label-caps text-label-caps font-semibold tracking-wider" id="active-mood-tag">
                  CHAMPAGNE HEARTH • 2700K
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button className="mood-selector-card group relative text-left p-4 rounded-xl transition-all duration-500 overflow-hidden bg-surface-container-high/90 shadow-[0_0_24px_rgba(240,225,195,0.22)] ring-1 ring-secondary-fixed/50" id="mood-btn-gold" onClick={(e) => { switchMood('gold') }} type="button">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-fixed/15 via-transparent to-transparent opacity-100 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary-container/80 flex items-center justify-center shadow-inner">
                      <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
                        local_fire_department
                      </span>
                    </div>
                    <div>
                      <span className="font-headline-sm text-headline-sm text-on-surface block leading-tight">
                        Warm Gold
                      </span>
                      <span className="font-label-caps text-label-caps text-secondary-fixed-dim">
                        Champagne Hearth • Intimate
                      </span>
                    </div>
                  </div>
                  <span className="mood-radio-indicator w-4 h-4 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-on-secondary-fixed"></span>
                  </span>
                </div>
                <p className="relative z-10 font-body-sm text-body-sm text-on-surface-variant mt-3 line-clamp-2">
                  Warm tungsten filament hues blended with 2400K candlelight wash. Accents gold leaf cutlery and ambient floral textures.
                </p>
                <div className="relative z-10 mt-3 pt-2 flex items-center justify-between text-secondary-fixed-dim font-label-caps text-label-caps">
                  <span>
                    LUX: 42 lx
                  </span>
                  <span>
                    CRI: 98.4 (CINEMA)
                  </span>
                </div>
              </button>
              <button className="mood-selector-card group relative text-left p-4 rounded-xl transition-all duration-500 overflow-hidden bg-surface-container/60 hover:bg-surface-container-high/70 shadow-none" id="mood-btn-neon" onClick={(e) => { switchMood('neon') }} type="button">
                <div className="absolute inset-0 bg-gradient-to-r from-tertiary-container/15 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center shadow-inner">
                      <span className="material-symbols-outlined text-tertiary text-[20px]">
                        electric_bolt
                      </span>
                    </div>
                    <div>
                      <span className="font-headline-sm text-headline-sm text-on-surface block leading-tight">
                        Neon Party
                      </span>
                      <span className="font-label-caps text-label-caps text-on-surface-variant">
                        Midnight Cyber • High Pulse
                      </span>
                    </div>
                  </div>
                  <span className="mood-radio-indicator w-4 h-4 rounded-full bg-surface-bright flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                  </span>
                </div>
                <p className="relative z-10 font-body-sm text-body-sm text-on-surface-variant mt-3 line-clamp-2">
                  Hyper-saturated ultraviolet washes, electric cyan laser scrims, and rhythmic stroboscopic pulses timed to 124 BPM.
                </p>
                <div className="relative z-10 mt-3 pt-2 flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps">
                  <span>
                    LUX: 18 lx
                  </span>
                  <span>
                    BEAT SYNC: DMX-CH 04
                  </span>
                </div>
              </button>
              <button className="mood-selector-card group relative text-left p-4 rounded-xl transition-all duration-500 overflow-hidden bg-surface-container/60 hover:bg-surface-container-high/70 shadow-none" id="mood-btn-pastel" onClick={(e) => { switchMood('pastel') }} type="button">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-tertiary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center shadow-inner">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        cloudy_snowing
                      </span>
                    </div>
                    <div>
                      <span className="font-headline-sm text-headline-sm text-on-surface block leading-tight">
                        Soft Pastel
                      </span>
                      <span className="font-label-caps text-label-caps text-on-surface-variant">
                        Ethereal Twilight • Dreamscape
                      </span>
                    </div>
                  </div>
                  <span className="mood-radio-indicator w-4 h-4 rounded-full bg-surface-bright flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                  </span>
                </div>
                <p className="relative z-10 font-body-sm text-body-sm text-on-surface-variant mt-3 line-clamp-2">
                  Diffused lilac cloudscapes and velvet rosewater rim lighting. Gentle cross-fades evoking late Provence twilight.
                </p>
                <div className="relative z-10 mt-3 pt-2 flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps">
                  <span>
                    LUX: 34 lx
                  </span>
                  <span>
                    FADE INTERVAL: 90s
                  </span>
                </div>
              </button>
            </div>
          </div>
        </section>
        <div className="w-full max-w-7xl mx-auto px-margin-sm lg:px-margin grid grid-cols-1 lg:grid-cols-12 gap-gutter my-space-sm pb-16">
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="p-6 rounded-2xl bg-surface-container-low/70 backdrop-blur-xl shadow-xl flex flex-col gap-space-md">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
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
                  <span>
                    18:00 • ARRIVAL
                  </span>
                  <span>
                    20:00 • TWILIGHT BANQUET
                  </span>
                  <span>
                    22:30 • GALA PEAK
                  </span>
                  <span>
                    01:30 • AFTER-HOURS
                  </span>
                </div>
                <svg className="w-full h-36" fill="none" preserveAspectRatio="none" viewBox="0 0 700 140">
                  <defs>
                    <linearGradient id="curveGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#d3c5a8" stopOpacity="0.3"></stop>
                      <stop offset="35%" stopColor="#c0c1ff" stopOpacity="0.5"></stop>
                      <stop offset="70%" stopColor="#a078ff" stopOpacity="0.9"></stop>
                      <stop offset="100%" stopColor="#8083ff" stopOpacity="0.4"></stop>
                    </linearGradient>
                    <linearGradient id="fillGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#c0c1ff" stopOpacity="0.25"></stop>
                      <stop offset="100%" stopColor="#10131a" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  <line className="text-outline-variant/30" stroke="currentColor" strokeDasharray="4 4" x1="0" x2="700" y1="35" y2="35"></line>
                  <line className="text-outline-variant/30" stroke="currentColor" strokeDasharray="4 4" x1="0" x2="700" y1="75" y2="75"></line>
                  <line className="text-outline-variant/30" stroke="currentColor" strokeDasharray="4 4" x1="0" x2="700" y1="115" y2="115"></line>
                  <path d="M0,110 C80,105 120,95 200,90 C280,85 330,75 420,40 C490,15 540,10 600,20 C650,28 680,65 700,85 L700,140 L0,140 Z" fill="url(#fillGradient)"></path>
                  <path d="M0,110 C80,105 120,95 200,90 C280,85 330,75 420,40 C490,15 540,10 600,20 C650,28 680,65 700,85" stroke="url(#curveGradient)" strokeLinecap="round" strokeWidth="3.5"></path>
                  <circle className="fill-secondary-fixed shadow-md" cx="90" cy="104" r="5"></circle>
                  <circle className="fill-primary-fixed" cx="270" cy="85" r="5"></circle>
                  <circle className="fill-tertiary animate-ping" cx="530" cy="12" r="6"></circle>
                  <circle className="fill-tertiary-fixed" cx="530" cy="12" r="6"></circle>
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
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span>
                      SYNCED: SPOTIFY • APPLE LOSSLESS
                    </span>
                  </div>
                </div>
                <div className="group flex items-center justify-between p-3 rounded-xl bg-surface-container/60 hover:bg-surface-container-high transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <button className="w-9 h-9 shrink-0 rounded-lg bg-surface-bright group-hover:bg-primary group-hover:text-on-primary text-primary transition-all flex items-center justify-center" type="button">
                      <span className="material-symbols-outlined text-[20px]">
                        play_arrow
                      </span>
                    </button>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                        Rosemary Sprig & Velvet Strings
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                        Sven Van Dijk • Autumn Salon Edit
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-surface-container-highest text-secondary-fixed text-label-caps font-label-caps">
                      98 BPM
                    </span>
                    <span className="hidden md:inline-block px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant text-label-caps font-label-caps">
                      NU JAZZ
                    </span>
                    <span className="text-on-surface-variant font-mono text-body-sm">
                      04:12
                    </span>
                    <button className="text-on-surface-variant hover:text-secondary-fixed transition-colors" type="button">
                      <span className="material-symbols-outlined text-[18px]">
                        favorite
                      </span>
                    </button>
                  </div>
                </div>
                <div className="group flex items-center justify-between p-3 rounded-xl bg-surface-container/60 hover:bg-surface-container-high transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <button className="w-9 h-9 shrink-0 rounded-lg bg-surface-bright group-hover:bg-primary group-hover:text-on-primary text-primary transition-all flex items-center justify-center" type="button">
                      <span className="material-symbols-outlined text-[20px]">
                        play_arrow
                      </span>
                    </button>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                        Midnight Horizon (Saxophone Dub)
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                        Kai Vance • Aura Exclusive Dubplate
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-surface-container-highest text-secondary-fixed text-label-caps font-label-caps">
                      124 BPM
                    </span>
                    <span className="hidden md:inline-block px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant text-label-caps font-label-caps">
                      DEEP MELODIC
                    </span>
                    <span className="text-on-surface-variant font-mono text-body-sm">
                      05:48
                    </span>
                    <button className="text-on-surface-variant hover:text-secondary-fixed transition-colors" type="button">
                      <span className="material-symbols-outlined text-[18px]">
                        favorite
                      </span>
                    </button>
                  </div>
                </div>
                <div className="group flex items-center justify-between p-3 rounded-xl bg-surface-container/60 hover:bg-surface-container-high transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <button className="w-9 h-9 shrink-0 rounded-lg bg-surface-bright group-hover:bg-primary group-hover:text-on-primary text-primary transition-all flex items-center justify-center" type="button">
                      <span className="material-symbols-outlined text-[20px]">
                        play_arrow
                      </span>
                    </button>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                        Provence Luminary (Ambient Reprise)
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                        Héloïse Moreau Quartet
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-surface-container-highest text-secondary-fixed text-label-caps font-label-caps">
                      102 BPM
                    </span>
                    <span className="hidden md:inline-block px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant text-label-caps font-label-caps">
                      ACOUSTIC DOWNTEMPO
                    </span>
                    <span className="text-on-surface-variant font-mono text-body-sm">
                      03:35
                    </span>
                    <button className="text-on-surface-variant hover:text-secondary-fixed transition-colors" type="button">
                      <span className="material-symbols-outlined text-[18px]">
                        favorite
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container-low/70 backdrop-blur-xl shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    stars
                  </span>
                  <span className="font-label-caps text-label-caps uppercase text-secondary-fixed tracking-wider">
                    Headline Performance Unit
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-secondary-container/40 text-secondary-fixed font-label-caps text-label-caps">
                  CONTRACT LOCKED & SECURED
                </span>
              </div>
              <div className="flex flex-col md:flex-row gap-5 items-start">
                <div className="relative w-full md:w-44 h-48 rounded-xl overflow-hidden shrink-0 shadow-lg">
                  <img className="w-full h-full object-cover" data-alt="Sophisticated male DJ Kai Vance wearing tailored minimalist evening attire beside a custom brushed gold acoustic saxophone player under moody nocturnal stage lighting with deep violet and warm amber backlight in a glass luxury venue." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOjIAWJhSU3P5UmptUpDojYFfpd3ewRoBmGDabJNl6sEehsFAwGae4PdmcprjjWCkL86wIIb4NS0LxvZ5OKCGVSs3B-N7fld-b27jGc4577XDuDXM_POmKgflb8t8QJobUAXcUwx38IKWw2XlWSvA5Cdalq9L_XgP9DeXCIEeBmVEcwbjVw8XV4zBZ60eBpTg7igz-4rEqVrZd4bdWqKmBpYRtKN5MHkYj3QVknsY62IZtxzPAmMXbiA" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-mono text-on-surface">
                    <span className="px-1.5 py-0.5 rounded bg-surface-dim/80">
                      4.98 ★
                    </span>
                    <span className="text-secondary-fixed font-semibold">
                      BERLIN / NYC
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">
                        Resident DJ Kai Vance & Live Saxophone
                      </h4>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Bespoke hybrid set synthesizing organic brass improvisations over live vinyl mixing. Curated specifically for Julian & Maya's celebration flow.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-3 p-3 rounded-xl bg-surface-container">
                    <div>
                      <span className="font-label-caps text-label-caps text-on-surface-variant block">
                        Acoustic Score
                      </span>
                      <span className="font-headline-sm text-headline-sm text-primary">
                        99.2%
                      </span>
                    </div>
                    <div>
                      <span className="font-label-caps text-label-caps text-on-surface-variant block">
                        Tech Rider
                      </span>
                      <span className="font-label-md text-label-md text-secondary-fixed flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[14px]">
                          check_circle
                        </span>
                        {' '}
                        Approved
                      </span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="font-label-caps text-label-caps text-on-surface-variant block">
                        Wireless DMX Mic
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-medium">
                        Sennheiser 6000
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg hover:shadow-lg transition-transform active:scale-[0.98] flex items-center gap-2" type="button">
                      <span className="material-symbols-outlined text-[18px]">
                        verified
                      </span>
                      {' '}
                      Approve Final Setlist
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors font-label-lg text-label-lg flex items-center gap-1.5" type="button">
                      <span className="material-symbols-outlined text-[18px]">
                        receipt_long
                      </span>
                      {' '}
                      View Rider Spec
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            <div className="p-6 rounded-2xl bg-surface-container-low/70 backdrop-blur-xl shadow-xl flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-label-caps text-label-caps uppercase text-secondary-fixed tracking-wider">
                    Spatial Simulation
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Meadowwood Pavilion Plan
                  </h3>
                </div>
                <div className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded-lg">
                  <button className="px-2 py-0.5 rounded text-label-caps font-label-caps bg-surface-bright text-on-surface font-semibold" id="view-mode-2d">
                    2D MAP
                  </button>
                  <button className="px-2 py-0.5 rounded text-label-caps font-label-caps text-on-surface-variant hover:text-on-surface" id="view-mode-3d">
                    ISO 3D
                  </button>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Interactive acoustic field simulation mapping speaker decay, dance floor SPL zones, and wireless DMX architectural plinths.
              </p>
              <div className="relative w-full aspect-[4/3] rounded-xl bg-surface-container-lowest p-3 overflow-hidden shadow-inner flex items-center justify-center">
                <svg className="w-full h-full max-h-[320px]" fill="none" viewBox="0 0 400 300">
                  <rect className="text-outline-variant/40" height="260" rx="16" stroke="currentColor" strokeDasharray="6 4" strokeWidth="1.5" width="360" x="20" y="20"></rect>
                  <circle className="fill-surface-bright stroke-secondary/50" cx="36" cy="36" r="6"></circle>
                  <circle className="fill-surface-bright stroke-secondary/50" cx="364" cy="36" r="6"></circle>
                  <circle className="fill-surface-bright stroke-secondary/50" cx="36" cy="264" r="6"></circle>
                  <circle className="fill-surface-bright stroke-secondary/50" cx="364" cy="264" r="6"></circle>
                  <ellipse className="fill-primary/10 stroke-primary/30" cx="200" cy="55" rx="80" ry="45" strokeDasharray="3 3"></ellipse>
                  <ellipse className="fill-primary/5 stroke-primary/15" cx="200" cy="55" rx="140" ry="85" strokeDasharray="4 4"></ellipse>
                  <ellipse className="fill-secondary/5 stroke-secondary/10" cx="200" cy="55" rx="190" ry="120"></ellipse>
                  <rect className="fill-surface-container-high stroke-secondary-fixed/70" height="42" rx="6" strokeWidth="1.5" width="100" x="150" y="32"></rect>
                  <text className="fill-secondary-fixed text-[9px] font-sans font-bold tracking-wider" textAnchor="middle" x="200" y="52">
                    STAGE • DJ KAI
                  </text>
                  <text className="fill-on-surface-variant text-[7px] font-mono" textAnchor="middle" x="200" y="65">
                    DMX HEAD 01-04
                  </text>
                  <rect className="fill-surface-container/70 stroke-primary-fixed/40" height="95" rx="12" strokeWidth="1.5" width="170" x="115" y="92"></rect>
                  <text className="fill-on-surface text-[10px] font-semibold tracking-wide" textAnchor="middle" x="200" y="142">
                    DANCE FLOOR (88 dB)
                  </text>
                  <text className="fill-secondary-fixed-dim text-[8px] font-mono" textAnchor="middle" x="200" y="156">
                    SUB HARMONIC ARRAY
                  </text>
                  <g className="cursor-pointer">
                    <circle className="fill-secondary-container stroke-secondary-fixed animate-pulse" cx="95" cy="110" r="8"></circle>
                    <circle className="fill-secondary-container stroke-secondary-fixed animate-pulse" cx="305" cy="110" r="8"></circle>
                    <circle className="fill-secondary-container stroke-secondary-fixed animate-pulse" cx="95" cy="170" r="8"></circle>
                    <circle className="fill-secondary-container stroke-secondary-fixed animate-pulse" cx="305" cy="170" r="8"></circle>
                  </g>
                  <circle className="fill-surface-container stroke-outline-variant/40" cx="70" cy="225" r="22"></circle>
                  <text className="fill-on-surface text-[8px] font-semibold" textAnchor="middle" x="70" y="228">
                    T-01
                  </text>
                  <circle className="fill-surface-container stroke-outline-variant/40" cx="155" cy="235" r="22"></circle>
                  <text className="fill-on-surface text-[8px] font-semibold" textAnchor="middle" x="155" y="238">
                    T-02
                  </text>
                  <circle className="fill-surface-container stroke-outline-variant/40" cx="245" cy="235" r="22"></circle>
                  <text className="fill-on-surface text-[8px] font-semibold" textAnchor="middle" x="245" y="238">
                    T-03
                  </text>
                  <circle className="fill-surface-container stroke-outline-variant/40" cx="330" cy="225" r="22"></circle>
                  <text className="fill-on-surface text-[8px] font-semibold" textAnchor="middle" x="330" y="228">
                    T-04
                  </text>
                  <text className="fill-on-surface-variant text-[8px] tracking-widest font-mono" textAnchor="middle" x="200" y="278">
                    NORTH TERRACE GLASS FACADE
                  </text>
                </svg>
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-surface-dim/90 backdrop-blur-md text-[10px] text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
                    {' '}
                    DMX Uplights
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    {' '}
                    Peak SPL Zone
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-surface-bright"></span>
                    {' '}
                    Acoustic Buffer
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-surface-container flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">
                    Ceiling Glass Reverb
                  </span>
                  <span className="font-headline-sm text-headline-sm text-secondary-fixed">
                    0.82s RT60
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Optimized via drapes
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">
                    Terrace Spill Shield
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary">
                    Active
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Neighborhood curfew safe
                  </span>
                </div>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-lg text-label-lg transition-all flex items-center justify-center gap-2" type="button">
                <span className="material-symbols-outlined text-[18px]">
                  view_in_ar
                </span>
                {' '}
                Calibrate Sound Decibel Ceiling
              </button>
            </div>
            <div className="p-5 rounded-2xl bg-surface-container-low/70 backdrop-blur-xl shadow-xl flex flex-col gap-3">
              <span className="font-label-caps text-label-caps uppercase text-secondary-fixed tracking-wider">
                Automated Scene Triggers
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">
                    cake
                  </span>
                  <div>
                    <span className="font-label-lg text-label-lg text-on-surface font-medium block">
                      Cake Cutting Spotlight Solo
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Dims outer perimeter 80% • Follow spot #2
                    </span>
                  </div>
                </div>
                <span className="font-label-caps text-label-caps px-2 py-1 rounded bg-surface-bright text-secondary-fixed">
                  TEST CUE
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    arrow_back_ios_new
                  </span>
                  <div>
                    <span className="font-label-lg text-label-lg text-on-surface font-medium block">
                      First Dance Cold Spark Flare
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      DMX Gerb launch sync • Soft violin crossfade
                    </span>
                  </div>
                </div>
                <span className="font-label-caps text-label-caps px-2 py-1 rounded bg-surface-bright text-primary">
                  TEST CUE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
  )
}
