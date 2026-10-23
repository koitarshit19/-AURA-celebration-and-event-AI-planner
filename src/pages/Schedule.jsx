import { useEffect } from 'react'

export default function Schedule() {
  // Original Stitch interactivity (runs once after the page is on screen)
  useEffect(() => {
    // Simple interactive tab toggle feedback
      const tabDayOf = document.getElementById('tab-dayof');
      const tabMonth = document.getElementById('tab-month');

      if (tabDayOf && tabMonth) {
        tabMonth.addEventListener('click', () => {
          tabMonth.className = 'flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-highest text-primary font-label-md text-label-md shadow-md transition-all';
          tabDayOf.className = 'flex items-center gap-2 px-4 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all font-label-md text-label-md';
        });

        tabDayOf.addEventListener('click', () => {
          tabDayOf.className = 'flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-highest text-primary font-label-md text-label-md shadow-md transition-all';
          tabMonth.className = 'flex items-center gap-2 px-4 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all font-label-md text-label-md';
        });
      }
  }, [])

  return (
      <>
      <div className="flex flex-col w-full">
        <div className="relative w-full overflow-hidden pb-space-xl">
          <div className="absolute -top-32 right-1/4 w-[500px] h-[350px] bg-tertiary-container/15 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute top-1/2 -left-20 w-[420px] h-[420px] bg-secondary-container/20 blur-[140px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-margin-sm lg:px-margin space-y-space-lg">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pt-space-md">
              <div className="space-y-space-xs max-w-2xl">
                <div className="flex items-center gap-space-sm">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/40 text-secondary-fixed font-label-caps text-label-caps uppercase tracking-widest shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping"></span>
                    {' '}
                    Live Sync Matrix
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-primary">
                      verified
                    </span>
                    {' '}
                    Algorithmic Time Buffer: +25m Nominal
                  </span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  Event Master Schedule:
                  {' '}
                  <span className="text-secondary-fixed">
                    Napa Valley Autumn Gala
                  </span>
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Meadowood Estate, St. Helena • Friday, October 24, 2025 • High-fidelity run-of-show automated pacing.
                </p>
              </div>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container-low shadow-inner shrink-0 self-start lg:self-auto">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-highest text-primary font-label-md text-label-md shadow-md transition-all" id="tab-dayof">
                  <span className="material-symbols-outlined text-[18px]">
                    view_timeline
                  </span>
                  {' '}
                  Day-of Run of Show (Oct 24)
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all font-label-md text-label-md" id="tab-month">
                  <span className="material-symbols-outlined text-[18px]">
                    calendar_month
                  </span>
                  {' '}
                  Month-by-Month Countdown
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              <div className="lg:col-span-8 space-y-space-md">
                <div className="p-space-md rounded-2xl bg-surface-container-low/70 backdrop-blur-xl shadow-xl flex flex-wrap items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-md">
                    <div className="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary-fixed shadow-sm">
                      <span className="material-symbols-outlined text-[24px]">
                        timelapse
                      </span>
                    </div>
                    <div>
                      <p className="font-label-caps text-label-caps uppercase text-secondary-fixed-dim">
                        Current Phase Indicator
                      </p>
                      <p className="font-headline-sm text-headline-sm text-on-surface">
                        T-Minus Run Initialization (08:30 First Load-in)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm text-right">
                    <div>
                      <div className="font-headline-sm text-headline-sm text-tertiary">
                        15h 30m
                      </div>
                      <div className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                        Scheduled Duration
                      </div>
                    </div>
                    <div className="h-8 w-px bg-surface-bright hidden sm:block"></div>
                    <div className="hidden sm:block">
                      <div className="font-headline-sm text-headline-sm text-secondary-fixed">
                        8 Nodes
                      </div>
                      <div className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                        Critical Cues
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative pl-6 sm:pl-10 space-y-space-md py-space-xs">
                  <div className="absolute left-[15px] sm:left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-secondary-fixed via-tertiary-container/60 to-primary-container/40"></div>
                  <div className="relative group">
                    <div className="absolute -left-[27px] sm:-left-[35px] top-4 w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-lg ring-2 ring-secondary-fixed">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,1)]"></span>
                    </div>
                    <div className="p-space-lg rounded-2xl bg-surface-container-low/90 backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-surface-container">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-xs mb-space-xs">
                        <div className="flex items-center gap-space-sm flex-wrap">
                          <span className="px-2.5 py-1 rounded-md bg-surface-container-highest text-secondary-fixed font-headline-sm text-headline-sm tracking-tight shadow-inner">
                            08:30 AM
                          </span>
                          <span className="font-label-caps text-label-caps uppercase px-2.5 py-1 rounded bg-tertiary-container/30 text-tertiary">
                            Logistics & Load-In
                          </span>
                          <span className="font-label-caps text-label-caps uppercase px-2.5 py-1 rounded bg-secondary-container/40 text-secondary-fixed flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
                            {' '}
                            Confirmed & QR Sent
                          </span>
                        </div>
                        <span className="font-label-md text-label-md text-outline">
                          Gate 2 Service Portal
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                        Vendor Ingress & Staging
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                        St. Helena Botanicals 18-wheeler docking alongside Lumina AV audio-visual staging rig. Power distro tie-in checked by Meadowood electrical engineer.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-sm">
                        <div className="p-space-sm rounded-xl bg-surface-container-high/60 flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-[20px] text-secondary">
                            local_shipping
                          </span>
                          <div className="min-w-0">
                            <p className="font-label-caps text-label-caps text-on-surface-variant truncate uppercase">
                              Transport Status
                            </p>
                            <p className="font-label-md text-label-md text-on-surface truncate">
                              3 Trucks Cleared
                            </p>
                          </div>
                        </div>
                        <div className="p-space-sm rounded-xl bg-surface-container-high/60 flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-[20px] text-tertiary">
                            qr_code_2
                          </span>
                          <div className="min-w-0">
                            <p className="font-label-caps text-label-caps text-on-surface-variant truncate uppercase">
                              Credential Token
                            </p>
                            <p className="font-label-md text-label-md text-on-surface truncate">
                              #STAGE-9844-PASS
                            </p>
                          </div>
                        </div>
                        <div className="p-space-sm rounded-xl bg-surface-container-high/60 flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-[20px] text-primary">
                            timer
                          </span>
                          <div className="min-w-0">
                            <p className="font-label-caps text-label-caps text-on-surface-variant truncate uppercase">
                              Staging Window
                            </p>
                            <p className="font-label-md text-label-md text-on-surface truncate">
                              120 Minutes Max
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -left-[27px] sm:-left-[35px] top-4 w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-lg ring-2 ring-tertiary">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(208,188,255,1)]"></span>
                    </div>
                    <div className="p-space-lg rounded-2xl bg-surface-container-low/90 backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-surface-container">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-xs mb-space-xs">
                        <div className="flex items-center gap-space-sm flex-wrap">
                          <span className="px-2.5 py-1 rounded-md bg-surface-container-highest text-secondary-fixed font-headline-sm text-headline-sm tracking-tight shadow-inner">
                            01:00 PM
                          </span>
                          <span className="font-label-caps text-label-caps uppercase px-2.5 py-1 rounded bg-tertiary-container/30 text-tertiary">
                            VIP Hospitality
                          </span>
                          <span className="font-label-caps text-label-caps uppercase px-2.5 py-1 rounded bg-primary-container/20 text-primary">
                            In Preparation
                          </span>
                        </div>
                        <span className="font-label-md text-label-md text-outline">
                          Estate Suite 104 & North Lounge
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                        Bridal Suite & VIP Grooming Lounge
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                        Hair, bespoke makeup artistry, and artisanal champagne flight luncheon service. Soundscape preset:
                        {' '}
                        <em className="text-secondary-fixed">
                          Chilled Acoustic Luminary
                        </em>
                        {' '}
                        initialized at 42dB.
                      </p>
                      <div className="relative rounded-xl overflow-hidden h-36 w-full shadow-lg">
                        <div className="bg-cover bg-center w-full h-full transform group-hover:scale-105 transition-transform duration-700" data-alt="Luxurious sun-drenched bridal dressing suite in Napa Valley estate with minimalist velvet armchairs, fresh white floral displays, warm golden afternoon light and champagne glasses on a dark granite table." style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSEZYj4SAcNmtLCNbR0Z3qXPYRrQxAz30zB62RHV1gmLEaaSKJxkwwupX8-R5S6nXf5nk8f7CFrPr2dnpDshoKGVuuLeDT2AQYrHpjeL5eM0HuEENPrmuf-2KiCTycdK1vOXxkHGp85V4SkX1D1tExtS-zGCqmXad0wGYlPtLDyeJiJs6sT1Mcd-S31pIU4FbWApcWO1GvcLRPaTF9j9YpNqaBcIunjzQWZbUhyYaIoaj_gzDecB4sqQ')" }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent flex items-end p-space-md">
                          <div className="flex items-center justify-between w-full">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">
                              Catering Delivery: Dom Pérignon 2013 & Chilled Canape Trio
                            </span>
                            <span className="font-label-caps text-label-caps text-secondary-fixed bg-surface-container-lowest/80 px-2 py-0.5 rounded">
                              Prompt 13:10
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -left-[27px] sm:-left-[35px] top-4 w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-lg ring-2 ring-secondary-fixed">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,1)]"></span>
                    </div>
                    <div className="p-space-lg rounded-2xl bg-surface-container-low/90 backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-surface-container">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-xs mb-space-xs">
                        <div className="flex items-center gap-space-sm flex-wrap">
                          <span className="px-2.5 py-1 rounded-md bg-surface-container-highest text-secondary-fixed font-headline-sm text-headline-sm tracking-tight shadow-inner">
                            04:30 PM
                          </span>
                          <span className="font-label-caps text-label-caps uppercase px-2.5 py-1 rounded bg-secondary-container/40 text-secondary-fixed">
                            Guest Influx
                          </span>
                          <span className="font-label-caps text-label-caps uppercase px-2.5 py-1 rounded bg-tertiary-container/30 text-tertiary">
                            120 Confirmed
                          </span>
                        </div>
                        <span className="font-label-md text-label-md text-outline">
                          West Stone Terrace
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                        Guest Arrival & Welcome Cocktails
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                        Artisan spritz bar featuring Napa botanical cordials; live acoustic quartet on the terrace overlooking the vineyard valley. Valet valet queue orchestration active.
                      </p>
                      <div className="p-space-md rounded-xl bg-surface-container-high/40 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                        <div className="flex items-center gap-space-sm">
                          <span className="material-symbols-outlined text-secondary-fixed text-[24px]">
                            local_bar
                          </span>
                          <div>
                            <p className="font-label-md text-label-md text-on-surface font-semibold">
                              Signature Cocktail: Golden Hour Bergamot Fizz
                            </p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              2 Mixology Stations • Speed of Service: ~35 sec/guest
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-surface-container-highest rounded-full h-2">
                            <div className="bg-secondary-fixed h-2 rounded-full w-full"></div>
                          </div>
                          <span className="font-label-caps text-label-caps text-secondary-fixed">
                            100% Stocked
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -left-[27px] sm:-left-[35px] top-4 w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center shadow-[0_0_16px_rgba(240,225,195,0.7)] ring-2 ring-secondary-fixed">
                      <span className="material-symbols-outlined text-secondary-fixed text-[16px] animate-spin">
                        wb_sunny
                      </span>
                    </div>
                    <div className="p-space-lg rounded-2xl bg-gradient-to-br from-surface-container via-surface-container-low to-surface-container shadow-2xl relative overflow-hidden">
                      <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-secondary-container/25 rounded-full blur-3xl pointer-events-none"></div>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-xs mb-space-xs relative z-10">
                        <div className="flex items-center gap-space-sm flex-wrap">
                          <span className="px-2.5 py-1 rounded-md bg-secondary text-on-secondary font-headline-sm text-headline-sm tracking-tight shadow-lg">
                            05:45 PM
                          </span>
                          <span className="font-label-caps text-label-caps uppercase px-2.5 py-1 rounded bg-secondary-container/60 text-secondary-fixed font-bold tracking-wider">
                            Aura Zenith Cue
                          </span>
                          <span className="font-label-caps text-label-caps uppercase px-2.5 py-1 rounded bg-tertiary-container/40 text-tertiary">
                            0% Cloud Cover
                          </span>
                        </div>
                        <span className="font-label-md text-label-md text-secondary-fixed font-semibold">
                          Olive Grove Sanctuary
                        </span>
                      </div>
                      <h3 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs relative z-10">
                        Sunset Ceremony & Vows
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface relative z-10 mb-space-md">
                        Calculated precisely against astronomical solar declination.
                        {' '}
                        <strong className="text-secondary-fixed">
                          Golden Hour Backlight Cue strikes at 06:12 PM sharp
                        </strong>
                        . Lumina automated warm fill luminaires engage at 12% ramp.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md relative z-10">
                        <div className="relative rounded-xl overflow-hidden h-40 shadow-inner">
                          <div className="bg-cover bg-center w-full h-full" data-alt="Serene outdoor wedding ceremony at sunset in a Napa Valley olive grove with rustic wooden chairs, low modern amber ground lights, soft mountain silhouettes and glowing dusk sky." style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuABtbYxkrkbA87N9LjGmxjyJ27_ks7GssgE7JX0ahzpiS_SoIUYmtgZIuW5y6WsOgwMEocZN6_WLJMSdJVdQYk_BxirhtdLZl-4C8g-Y_xlI3PbwfTtBHDY1uoRnsHJ6LV6rQ51PWCI84h7qzZfHrNkxAZ4kCxInY2EbFrVFnMutGDf55pA_1UwMnEcyJC1meQYo2WBnpUlNvN24u_biWrYhTZf-kQIOCSgW5CJcT6tEfIA1warDj3uYA')" }}></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                          <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-center text-on-surface">
                            <span className="font-label-caps text-label-caps uppercase text-secondary-fixed">
                              Aura Lighting Preset #04
                            </span>
                            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                              2700K Warm Tungsten
                            </span>
                          </div>
                        </div>
                        <div className="p-space-md rounded-xl bg-surface-container-lowest/80 backdrop-blur-md flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-on-surface-variant mb-2">
                              <span className="font-label-caps text-label-caps uppercase text-secondary-fixed">
                                Solar Trajectory
                              </span>
                              <span className="font-label-caps text-label-caps">
                                Sunset: 06:18 PM
                              </span>
                            </div>
                            <svg className="w-full h-12 text-secondary-fixed" fill="none" viewBox="0 0 200 40">
                              <path d="M 0 35 Q 80 5 130 18 T 200 38" stroke="currentColor" strokeDasharray="3 3" strokeWidth="2"></path>
                              <circle className="animate-pulse shadow-md" cx="130" cy="18" fill="#f0e1c3" r="5"></circle>
                              <path d="M 130 18 L 130 38" opacity="0.6" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1"></path>
                            </svg>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              Photographer Cue Point
                            </span>
                            <span className="font-label-caps text-label-caps text-secondary-fixed font-bold">
                              06:12:30 PM (6m Window)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -left-[27px] sm:-left-[35px] top-4 w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-lg ring-2 ring-tertiary">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(208,188,255,1)]"></span>
                    </div>
                    <div className="p-space-lg rounded-2xl bg-surface-container-low/90 backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-surface-container">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-xs mb-space-xs">
                        <div className="flex items-center gap-space-sm flex-wrap">
                          <span className="px-2.5 py-1 rounded-md bg-surface-container-highest text-secondary-fixed font-headline-sm text-headline-sm tracking-tight shadow-inner">
                            06:30 PM
                          </span>
                          <span className="font-label-caps text-label-caps uppercase px-2.5 py-1 rounded bg-tertiary-container/30 text-tertiary">
                            Celebration
                          </span>
                        </div>
                        <span className="font-label-md text-label-md text-outline">
                          Estate Vineyard Lawn
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                        Twilight Cocktail Hour & Champagne Sabering
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Ceremonial Jeroboam sabering under string canopy lights. Ambient DJ micro-set initializes at 58dB. Passed hors d’oeuvres round 2 deployed by catering staff.
                      </p>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -left-[27px] sm:-left-[35px] top-4 w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-lg ring-2 ring-secondary-fixed">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,1)]"></span>
                    </div>
                    <div className="p-space-lg rounded-2xl bg-surface-container-low/90 backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-surface-container">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-xs mb-space-xs">
                        <div className="flex items-center gap-space-sm flex-wrap">
                          <span className="px-2.5 py-1 rounded-md bg-surface-container-highest text-secondary-fixed font-headline-sm text-headline-sm tracking-tight shadow-inner">
                            07:45 PM
                          </span>
                          <span className="font-label-caps text-label-caps uppercase px-2.5 py-1 rounded bg-secondary-container/40 text-secondary-fixed">
                            Gastronomy Pacing
                          </span>
                        </div>
                        <span className="font-label-md text-label-md text-outline">
                          The Glass Pavilion Conservatory
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                        Grand Dinner Service & Curated Toasts
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                        4-course tasting menu curated with estate reserve Cabernet Sauvignon pairings. Toasts strictly time-boxed via subtle podium teleprompter cues (3 mins per speaker).
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-space-xs">
                        <div className="p-2.5 rounded-lg bg-surface-container-high/60">
                          <p className="font-label-caps text-label-caps text-secondary-fixed">
                            Course 1 (08:00)
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface truncate">
                            Heirloom Burrata
                          </p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-surface-container-high/60">
                          <p className="font-label-caps text-label-caps text-secondary-fixed">
                            Course 2 (08:25)
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface truncate">
                            Wild King Salmon
                          </p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-surface-container-high/60">
                          <p className="font-label-caps text-label-caps text-secondary-fixed">
                            Course 3 (08:50)
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface truncate">
                            Wagyu Tenderloin
                          </p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-surface-container-high/60">
                          <p className="font-label-caps text-label-caps text-secondary-fixed">
                            Toasts (09:15)
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface truncate">
                            Father & Maid of Honor
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -left-[27px] sm:-left-[35px] top-4 w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-lg ring-2 ring-tertiary">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(208,188,255,1)]"></span>
                    </div>
                    <div className="p-space-lg rounded-2xl bg-surface-container-low/90 backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-surface-container">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-xs mb-space-xs">
                        <div className="flex items-center gap-space-sm flex-wrap">
                          <span className="px-2.5 py-1 rounded-md bg-surface-container-highest text-secondary-fixed font-headline-sm text-headline-sm tracking-tight shadow-inner">
                            09:30 PM
                          </span>
                          <span className="font-label-caps text-label-caps uppercase px-2.5 py-1 rounded bg-tertiary-container/30 text-tertiary">
                            Nightlife Shift
                          </span>
                          <span className="font-label-caps text-label-caps uppercase px-2.5 py-1 rounded bg-primary-container/30 text-primary">
                            DMX Lighting Cue
                          </span>
                        </div>
                        <span className="font-label-md text-label-md text-outline">
                          Main Ballroom & Terrace
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                        First Dance & DJ Deep House Kickoff
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Ambience Studio shifts room lighting to high-energy violet & champagne gold wash. Haze machine active at 15%. DJ takes over from acoustic ensemble.
                      </p>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -left-[27px] sm:-left-[35px] top-4 w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-lg ring-2 ring-primary">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(192,193,255,1)]"></span>
                    </div>
                    <div className="p-space-lg rounded-2xl bg-surface-container-low/90 backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-surface-container">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-xs mb-space-xs">
                        <div className="flex items-center gap-space-sm flex-wrap">
                          <span className="px-2.5 py-1 rounded-md bg-surface-container-highest text-secondary-fixed font-headline-sm text-headline-sm tracking-tight shadow-inner">
                            12:00 AM
                          </span>
                          <span className="font-label-caps text-label-caps uppercase px-2.5 py-1 rounded bg-surface-variant text-on-surface-variant">
                            Egress Protocol
                          </span>
                        </div>
                        <span className="font-label-md text-label-md text-outline">
                          Front Gate Drive Circle
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                        Chauffeur Fleet & Late Night Afterglow
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Autonomous call dispatch for 14 VIP Mercedes Sprinter shuttles to Napa & Yountville hotels. Wood-fired midnight truffle pizza station activated on patio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 space-y-space-md">
                <div className="p-space-lg rounded-2xl bg-surface-container-low/80 backdrop-blur-xl shadow-xl space-y-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary-fixed text-[22px]">
                        radar
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Micro-Radar Weather
                      </h2>
                    </div>
                    <span className="font-label-caps text-label-caps uppercase text-secondary-fixed px-2 py-0.5 rounded bg-secondary-container/40">
                      Real-time St. Helena
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-surface-container-high/40 p-space-md rounded-xl">
                    <div>
                      <div className="font-headline-xl text-headline-xl text-on-surface font-bold">
                        71°
                        <span className="text-secondary-fixed text-headline-md">
                          F
                        </span>
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">
                        Ideal Ambient Profile
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-tertiary font-label-md text-label-md">
                        <span className="material-symbols-outlined text-[16px]">
                          water_drop
                        </span>
                        {' '}
                        0% Rain Risk
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Sunset 6:18 PM
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-lg bg-surface-container-high/30">
                      <span className="font-label-caps text-label-caps uppercase text-outline-variant block">
                        Wind
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        4 mph NW
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-high/30">
                      <span className="font-label-caps text-label-caps uppercase text-outline-variant block">
                        Humidity
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        38% Crisp
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-high/30">
                      <span className="font-label-caps text-label-caps uppercase text-outline-variant block">
                        Dew Pt
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        44°F
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center gap-2 text-body-sm font-body-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      verified_user
                    </span>
                    <span>
                      No indoor contingency transfer required. Outdoor lawn clearance verified.
                    </span>
                  </div>
                </div>
                <div className="p-space-lg rounded-2xl bg-gradient-to-br from-surface-container via-surface-container-low to-surface-container shadow-xl space-y-space-md relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[22px]">
                        tune
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Dynamic Buffer
                      </h2>
                    </div>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      25 Mins
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Aura engine identified 25 flexible minutes distributed across post-ceremony photo capture and toast intervals without risking dinner plating temperature.
                  </p>
                  <div className="space-y-space-xs">
                    <div className="flex justify-between text-body-sm font-body-sm text-on-surface">
                      <span>
                        Buffer Distribution Absorption
                      </span>
                      <span className="text-secondary-fixed">
                        84% Optimal
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-primary to-secondary-fixed h-2 rounded-full w-[84%]"></div>
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-2 shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[18px]">
                      autorenew
                    </span>
                    {' '}
                    Re-optimize Timeline Buffer
                  </button>
                </div>
                <div className="p-space-lg rounded-2xl bg-surface-container-low/80 backdrop-blur-xl shadow-xl space-y-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary-fixed text-[22px]">
                        contact_phone
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Vendor Quick-Ping
                      </h2>
                    </div>
                    <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                      4 Leads Active
                    </span>
                  </div>
                  <div className="space-y-space-xs">
                    <div className="p-space-sm rounded-xl bg-surface-container-high/40 flex items-center justify-between hover:bg-surface-container-high transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary-fixed shrink-0">
                          <span className="material-symbols-outlined text-[18px]">
                            restaurant
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
                            Thomas Keller Pacing
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                            Caterer • Chef Marc
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors" title="Push Alert" type="button">
                          <span className="material-symbols-outlined text-[18px]">
                            send
                          </span>
                        </button>
                        <button className="p-2 rounded-lg text-on-surface-variant hover:text-secondary-fixed hover:bg-surface-container-highest transition-colors" title="Call Lead" type="button">
                          <span className="material-symbols-outlined text-[18px]">
                            call
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="p-space-sm rounded-xl bg-surface-container-high/40 flex items-center justify-between hover:bg-surface-container-high transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-tertiary shrink-0">
                          <span className="material-symbols-outlined text-[18px]">
                            local_florist
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
                            St. Helena Botanicals
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                            Florist • Elena Rostova
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors" title="Push Alert" type="button">
                          <span className="material-symbols-outlined text-[18px]">
                            send
                          </span>
                        </button>
                        <button className="p-2 rounded-lg text-on-surface-variant hover:text-secondary-fixed hover:bg-surface-container-highest transition-colors" title="Call Lead" type="button">
                          <span className="material-symbols-outlined text-[18px]">
                            call
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="p-space-sm rounded-xl bg-surface-container-high/40 flex items-center justify-between hover:bg-surface-container-high transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                          <span className="material-symbols-outlined text-[18px]">
                            album
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
                            Lumina AV & DJ Deep
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                            Sound & Wash • Sean D.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors" title="Push Alert" type="button">
                          <span className="material-symbols-outlined text-[18px]">
                            send
                          </span>
                        </button>
                        <button className="p-2 rounded-lg text-on-surface-variant hover:text-secondary-fixed hover:bg-surface-container-highest transition-colors" title="Call Lead" type="button">
                          <span className="material-symbols-outlined text-[18px]">
                            call
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="p-space-sm rounded-xl bg-surface-container-high/40 flex items-center justify-between hover:bg-surface-container-high transition-colors">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary-fixed shrink-0">
                          <span className="material-symbols-outlined text-[18px]">
                            stars
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
                            Lead Event Director
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                            Meadowood • Camille P.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors" title="Push Alert" type="button">
                          <span className="material-symbols-outlined text-[18px]">
                            send
                          </span>
                        </button>
                        <button className="p-2 rounded-lg text-on-surface-variant hover:text-secondary-fixed hover:bg-surface-container-highest transition-colors" title="Call Lead" type="button">
                          <span className="material-symbols-outlined text-[18px]">
                            call
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-secondary-container/40 hover:bg-secondary-container/70 text-secondary-fixed font-label-md text-label-md transition-all flex items-center justify-center gap-2" type="button">
                    <span className="material-symbols-outlined text-[18px]">
                      campaign
                    </span>
                    {' '}
                    Broadcast Milestone Push (All Leads)
                  </button>
                </div>
                <div className="p-space-lg rounded-2xl bg-surface-container-low/90 backdrop-blur-xl shadow-xl space-y-space-md">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Day-of Pocket Guide
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Auto-compile verified PDF run sheet, staff contact directory, and Apple/Google Wallet timeline passes.
                    </p>
                  </div>
                  <div className="space-y-space-xs">
                    <button className="w-full py-3 px-space-md rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]" type="button">
                      <span className="material-symbols-outlined text-[20px]">
                        file_download
                      </span>
                      {' '}
                      Export Verified PDF Sheet (v4.2)
                    </button>
                    <button className="w-full py-2.5 px-space-md rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 transition-colors" type="button">
                      <span className="material-symbols-outlined text-[18px]">
                        wallet
                      </span>
                      {' '}
                      Deploy Digital VIP Wallet Pass
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
  )
}
