import { useEffect } from 'react'

export default function NewEvent() {
  // Original Stitch interactivity (runs once after the page is on screen)
  useEffect(() => {
    // Micro-interactions for live calibration feedback
        const guestSlider = document.getElementById('guest-slider');
        const guestCountVal = document.getElementById('guest-count-val');
        if (guestSlider && guestCountVal) {
          guestSlider.addEventListener('input', (e) => {
            guestCountVal.innerHTML = `${e.target.value} <span class="text-sm font-normal text-on-surface-variant">Attendees</span>`;
          });
        }

        // Dynamic selection highlighting for Typology cards
        const typologyCards = document.querySelectorAll('#typology-grid > div');
        typologyCards.forEach(card => {
          card.addEventListener('click', () => {
            typologyCards.forEach(c => {
              c.classList.remove('bg-surface-container/70', 'shadow-[0_12px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(192,193,255,0.35)]');
              c.classList.add('bg-surface-container-low/60');
            });
            card.classList.remove('bg-surface-container-low/60');
            card.classList.add('bg-surface-container/70', 'shadow-[0_12px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(192,193,255,0.35)]');
          });
        });

        // Dynamic selection for Aesthetic Mood cards
        const vibeCards = document.querySelectorAll('#vibe-grid > div');
        vibeCards.forEach(card => {
          card.addEventListener('click', () => {
            vibeCards.forEach(c => {
              c.classList.remove('shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_0_2px_rgba(240,225,195,0.7)]');
              c.classList.add('shadow-md');
              const badge = c.querySelector('.bg-secondary-fixed.text-on-secondary-fixed');
              if (badge) badge.remove();
            });
            card.classList.add('shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_0_2px_rgba(240,225,195,0.7)]');
          });
        });
  }, [])

  return (
      <>
      <div className="flex flex-col w-full">
        <div className="relative w-full overflow-hidden pb-16">
          <div className="max-w-7xl mx-auto px-margin-sm lg:px-margin pt-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-8">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)] animate-ping"></span>
                    {' '}
                    Autonomous Blueprint Generator
                  </span>
                  <span className="text-outline-variant font-body-sm text-body-sm">
                    /
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    Session #AL-8849
                  </span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  Create a New Celebration Blueprint
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                  Aura orchestrates spatial acoustics, culinary pacing, floral provenance, and vendor contracts into a singular executable continuum.
                </p>
              </div>
              <div className="flex flex-col md:items-end gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                    Calibration Matrix
                  </span>
                  <span className="font-label-md text-label-md font-semibold text-primary">
                    Step 3 of 4
                  </span>
                </div>
                <div className="flex items-center gap-1.5 w-60 h-2 bg-surface-container-high rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div className="h-full bg-primary-container/80 rounded-full w-full max-w-[75%] transition-all duration-700 shadow-[0_0_12px_rgba(192,193,255,0.6)]"></div>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Next: Vendor Reserve & VIP Run of Show
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              <div className="lg:col-span-8 flex flex-col gap-space-xl">
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-surface-container-high flex items-center justify-center font-label-caps text-label-caps text-secondary">
                        01
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Typology & Event Canvas
                      </h2>
                    </div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase">
                      Single Archetype Focus
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md" id="typology-grid">
                    <div className="group relative rounded-xl p-5 bg-surface-container/70 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(192,193,255,0.35)] transition-all cursor-pointer hover:bg-surface-container-high">
                      <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center shadow-[0_0_12px_rgba(240,225,195,0.8)]">
                        <span className="material-symbols-outlined text-on-secondary-fixed text-[15px]" style={{ "fontVariationSettings": "'FILL' 1" }}>
                          check
                        </span>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary shrink-0 shadow-[0_0_16px_rgba(192,193,255,0.15)]">
                          <span className="material-symbols-outlined text-[26px]">
                            celebration
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-headline-sm text-[16px] text-on-surface">
                              Weddings & Galas
                            </h3>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-secondary-container text-secondary-fixed tracking-wide">
                              Featured
                            </span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                            Multi-tier ceremonial dining, architectural illumination, and black-tie protocol.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="group relative rounded-xl p-5 bg-surface-container-low/60 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all cursor-pointer hover:bg-surface-container">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:text-primary shrink-0 transition-colors">
                          <span className="material-symbols-outlined text-[26px]">
                            cake
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-headline-sm text-[16px] text-on-surface">
                            Milestone Birthdays
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                            Curated generational gatherings, surprise visual choreography, and bespoke mixology.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="group relative rounded-xl p-5 bg-surface-container-low/60 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all cursor-pointer hover:bg-surface-container">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:text-primary shrink-0 transition-colors">
                          <span className="material-symbols-outlined text-[26px]">
                            festival
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-headline-sm text-[16px] text-on-surface">
                            Community Festivals
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                            High-throughput culinary pavilions, acoustic stage distribution, and public flow.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="group relative rounded-xl p-5 bg-surface-container-low/60 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all cursor-pointer hover:bg-surface-container">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:text-primary shrink-0 transition-colors">
                          <span className="material-symbols-outlined text-[26px]">
                            nightlife
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-headline-sm text-[16px] text-on-surface">
                            Private Soirées
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                            Ultra-exclusive estate access, ambient live quartets, and private sommelier flights.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-surface-container-high flex items-center justify-center font-label-caps text-label-caps text-secondary">
                      02
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Logistics & Target Envelope
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="rounded-xl p-5 bg-surface-container/60 backdrop-blur-md shadow-md flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-secondary text-[16px]">
                            calendar_month
                          </span>
                          {' '}
                          Target Event Date
                        </label>
                        <span className="font-label-caps text-label-caps text-secondary-fixed uppercase">
                          Autumn Microclimate
                        </span>
                      </div>
                      <div className="relative flex items-center rounded-lg bg-surface-container-lowest px-4 py-3 shadow-inner group cursor-pointer hover:bg-surface-container-low transition-colors">
                        <span className="material-symbols-outlined text-secondary-fixed text-[20px] mr-3">
                          event_available
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                            October 24, 2025
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                            Optimal vineyard foliage · Golden hour 17:42 PST
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant ml-auto text-[18px]">
                          expand_more
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl p-5 bg-surface-container/60 backdrop-blur-md shadow-md flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-primary text-[16px]">
                            location_on
                          </span>
                          {' '}
                          Destination / Geographic Pin
                        </label>
                        <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase">
                          Jurisdiction Verified
                        </span>
                      </div>
                      <div className="relative flex items-center rounded-lg bg-surface-container-lowest px-4 py-3 shadow-inner group cursor-pointer hover:bg-surface-container-low transition-colors">
                        <span className="material-symbols-outlined text-primary text-[20px] mr-3">
                          pin_drop
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                            St. Helena & Napa Valley, CA
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                            Estate radius 14.8 miles · Meadowood Corridor
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant ml-auto text-[18px]">
                          verified
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl p-5 bg-surface-container/60 backdrop-blur-md shadow-md flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-secondary text-[16px]">
                            group
                          </span>
                          {' '}
                          Curated Guest Attendance
                        </label>
                        <span className="font-label-caps text-label-caps text-secondary-fixed bg-secondary-container/50 px-2 py-0.5 rounded uppercase">
                          Intimate Luxury
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-headline-md text-headline-md font-bold text-on-surface" id="guest-count-val">
                          135
                          {' '}
                          <span className="text-sm font-normal text-on-surface-variant">
                            Attendees
                          </span>
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Range envelope: 120 – 150
                        </span>
                      </div>
                      <div className="relative w-full py-1">
                        <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full w-[45%]"></div>
                        </div>
                        <input className="absolute inset-0 w-full opacity-0 cursor-pointer" id="guest-slider" max="400" min="30" type="range" defaultValue={"135"} />
                      </div>
                      <div className="flex items-center justify-between text-outline-variant font-body-sm text-[11px]">
                        <span>
                          Salon (30)
                        </span>
                        <span>
                          Intimate (120-150)
                        </span>
                        <span>
                          Bespoke Pavilion (250+)
                        </span>
                        <span>
                          Grand Arena (400)
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl p-5 bg-surface-container/60 backdrop-blur-md shadow-md flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-secondary text-[16px]">
                            account_balance_wallet
                          </span>
                          {' '}
                          Allocated Budget Envelope
                        </label>
                        <span className="font-label-caps text-label-caps text-primary bg-primary-container/20 px-2 py-0.5 rounded uppercase">
                          Tier 1 High-Fidelity
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-headline-md text-headline-md font-bold text-on-surface">
                          $72,500
                          {' '}
                          <span className="text-sm font-normal text-on-surface-variant">
                            USD
                          </span>
                        </span>
                        <span className="font-body-sm text-body-sm text-secondary-fixed font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            trending_up
                          </span>
                          {' '}
                          94% Napa Benchmark
                        </span>
                      </div>
                      <div className="relative w-full py-1">
                        <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-secondary-fixed to-primary rounded-full w-[65%]"></div>
                        </div>
                        <input className="absolute inset-0 w-full opacity-0 cursor-pointer" id="budget-slider" max="250000" min="20000" step="2500" type="range" defaultValue={"72500"} />
                      </div>
                      <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-[11px]">
                        <span>
                          $20k Base
                        </span>
                        <span className="text-secondary-fixed">
                          $65,000 - $80,000 Sweet Spot
                        </span>
                        <span>
                          $250k+ Haute
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-surface-container-high flex items-center justify-center font-label-caps text-label-caps text-secondary">
                        03
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Vibe & Aesthetic Mood Synthesis
                      </h2>
                    </div>
                    <span className="font-label-caps text-label-caps text-secondary-fixed flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">
                        palette
                      </span>
                      {' '}
                      Atmospheric Palette Core
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md" id="vibe-grid">
                    <div className="relative group rounded-xl overflow-hidden bg-surface-container-low shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_0_2px_rgba(240,225,195,0.7)] cursor-pointer flex flex-col transition-all transform hover:-translate-y-1">
                      <div className="relative h-44 w-full overflow-hidden">
                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="High-end candlelit twilight outdoor vineyard gala celebration table setting with soft glowing micro-lights, cascading blush garden roses, muted gold cutlery, and subtle ethereal violet haze in the evening air of Napa Valley." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG3t9H06Etl_6yWGOkVx-m3gUzbP1IoNkk9IWaIr370TyMaSgu40H2FioKPAY8LX5nYO_FFlb3YbNAL7M9C_gKvV70Z2D_wutwtsowGgx3LTmvs18M71v2bLr1UDm-dhyGo-szLU8pZ7SDcSTvl-wIGCPrYf5BD0xPoibns09lBgjXqIdPa63rzyK_HFBAn8-bFqJiOjoForinIktCzhrNOEWRaxCM_k_olkEE29jiE2IDiW4ScayQ1Q" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/30 to-transparent"></div>
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-caps text-[9px] uppercase tracking-wider font-bold shadow-md">
                          Selected
                        </div>
                        <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed shadow-[0_0_6px_rgba(240,225,195,0.9)]"></span>
                          <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                            Amber Glow 2400K
                          </span>
                        </div>
                      </div>
                      <div className="p-3.5 flex flex-col gap-1">
                        <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold">
                          Romantic & Ethereal
                        </h4>
                        <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                          Warm candlelight cascades, heirloom botanical arches, soft muslin drape installations.
                        </p>
                      </div>
                    </div>
                    <div className="relative group rounded-xl overflow-hidden bg-surface-container-low shadow-md cursor-pointer flex flex-col transition-all hover:bg-surface-container hover:-translate-y-1">
                      <div className="relative h-44 w-full overflow-hidden">
                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Ultra-chic high-fashion nocturne afterparty with sleek geometric indigo neon lighting arrays, mirrored surfaces, champagne flutes reflecting dynamic light streaks, and stylish guests enjoying an exclusive sound salon." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyBzNtVEuP28TrwBVtVJvO3twaj4Pf4eO_HYnz4xtLOG8vmas0RXxauBh_6zg9a6LtkX9T3A6hHHm9zHXS3xv6jxErmpTiezH6_yrvmk1gXUk7iLQSWcqHFBtNcUhgNGY_265cvyLGppvqMXrQPYIMyECiR4exrvb45PrdV_6oLoFL0j6bJFK18h3YB2e1iyo5EJy6kx6JtXDRkEDFKW10_WSoHoCEx5Tym9-ah3zdKgRLudFVSd9UXA" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                        <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary-container shadow-[0_0_6px_rgba(128,131,255,0.9)]"></span>
                          <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
                            Dynamic Cobalt
                          </span>
                        </div>
                      </div>
                      <div className="p-3.5 flex flex-col gap-1">
                        <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold">
                          High-Energy & Chic
                        </h4>
                        <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                          Nocturne electro-lounge beats, kinetic lighting ribs, avant-garde glassware and late bass.
                        </p>
                      </div>
                    </div>
                    <div className="relative group rounded-xl overflow-hidden bg-surface-container-low shadow-md cursor-pointer flex flex-col transition-all hover:bg-surface-container hover:-translate-y-1">
                      <div className="relative h-44 w-full overflow-hidden">
                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Classic European historic stone estate ballroom dinner with towering crystal chandeliers, crisp linen tableware, silver candelabras, antique porcelain, and understated white floral arrangements." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTQIx_3_UQNYA9TnLhlj1ZbzgaSXIANdXlkG_1zgLeM1MmP1SLIzUiaExwD2x9j2q8n8HDt05tazB8aUSkGCNA71OgwTVcFR0O34dxg0YFa0m_IQPUFy_fIJZDRxywb1Mp_kk3K4GzxkWayKgiDMT6c2PD4pVNGqbz72IIPlK4XZLS60_0OhfidDySOKM2_G-o2OinhGzp-7Mw9l_LVl31VzS-xy5zARgu6SOjIgm4P1en3VHvA9yfyw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                        <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_6px_rgba(211,197,168,0.9)]"></span>
                          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider">
                            Champagne Ivory
                          </span>
                        </div>
                      </div>
                      <div className="p-3.5 flex flex-col gap-1">
                        <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold">
                          Timeless Traditional
                        </h4>
                        <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                          Symmetrical banquet symmetry, silver service cutlery, hand-calligraphed menu suites.
                        </p>
                      </div>
                    </div>
                    <div className="relative group rounded-xl overflow-hidden bg-surface-container-low shadow-md cursor-pointer flex flex-col transition-all hover:bg-surface-container hover:-translate-y-1">
                      <div className="relative h-44 w-full overflow-hidden">
                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Minimalist modern glass villa courtyard event setup with sharp cast-concrete plinths, sculptural monochromatic greenery branches, raw slate textures, and stark cinematic shadow play." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOLgsmPuzhzZO9mA4tpdL3z8z9RZMEAXsJGJy9bDOZlWrY7hQE9bH1S6EEbeckxUpJTsmMtiHjH44t38kg8QvuqUdCpyfOv7XxzRW090GF2xAJbEv7ABqX8eDnraIFW-RbgbIN5lUyv3TnyKCtxpEds2FEu51xzCxGlUDSNQ0DUzvB6YoaXn5GRgAGQ4vqutlNe_uhSsjtxzFI-NIwBO7Vk5tKFQ4scmpPpwTpDv-7pgP974df4kZR2g" />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                        <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-outline-variant shadow-[0_0_6px_rgba(144,143,160,0.9)]"></span>
                          <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                            Obsidian & Slate
                          </span>
                        </div>
                      </div>
                      <div className="p-3.5 flex flex-col gap-1">
                        <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold">
                          Architectural Minimalist
                        </h4>
                        <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                          Negative spatial flow, brutalist raw flora plinths, monochromatic textural restraint.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-space-lg">
                <div className="sticky top-24 rounded-2xl bg-surface-container/80 backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col gap-space-md">
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container-high text-primary">
                        <span className="material-symbols-outlined text-[18px]">
                          neurology
                        </span>
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,1)]"></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          Aura Engine L4
                        </span>
                        <span className="font-label-caps text-label-caps text-secondary-fixed uppercase">
                          Real-Time Calibration
                        </span>
                      </div>
                    </div>
                    <span className="font-label-caps text-label-caps px-2 py-1 rounded bg-surface-container-highest text-primary font-semibold">
                      99.4% Confidence
                    </span>
                  </div>
                  <div className="w-full h-36 rounded-xl bg-cover bg-center relative overflow-hidden shadow-inner group" data-location="Meadowood Napa Valley, St. Helena, CA" style={{  }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/40 to-transparent"></div>
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-surface-container-low/80 backdrop-blur-md flex items-center gap-1.5 text-on-surface font-label-caps text-[10px]">
                      <span className="material-symbols-outlined text-secondary text-[12px]">
                        location_on
                      </span>
                      {' '}
                      St. Helena Micro-Enclave
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="font-body-sm text-[11px] text-on-surface font-medium truncate">
                        Oakville Crossroad · 48-Hour Reservation Lock
                      </span>
                      <span className="material-symbols-outlined text-secondary-fixed text-[16px]">
                        verified_user
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 py-1">
                    <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
                      Core Automated Outputs
                    </span>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low/60 shadow-sm">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                        contract_edit
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-medium text-on-surface">
                          14 Vendor Master Contracts
                        </span>
                        <span className="font-body-sm text-[11px] text-on-surface-variant">
                          Pre-negotiated culinary, floral, vintage wine & acoustic engineers.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low/60 shadow-sm">
                      <span className="material-symbols-outlined text-secondary-fixed text-[18px] shrink-0 mt-0.5">
                        schedule
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-medium text-on-surface">
                          48-Hr Day-Of Run of Show
                        </span>
                        <span className="font-body-sm text-[11px] text-on-surface-variant">
                          Synchronized micro-cues down to sunset light azimuth angle (17:42).
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low/60 shadow-sm">
                      <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">
                        pie_chart
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-medium text-on-surface">
                          Categorized Contingency Buffer
                        </span>
                        <span className="font-body-sm text-[11px] text-on-surface-variant">
                          12.5% ($9,060) auto-allocated for microclimate shifts & tent extensions.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-surface-container-lowest/80 shadow-inner">
                    <div className="flex items-center justify-between text-body-sm text-[12px]">
                      <span className="text-on-surface-variant">
                        Budget Efficiency Score
                      </span>
                      <span className="text-secondary-fixed font-bold font-headline-sm text-headline-sm">
                        96.8 / 100
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-primary to-secondary-fixed h-full rounded-full w-[96.8%]"></div>
                    </div>
                    <span className="font-body-sm text-[10px] text-on-surface-variant">
                      Optimized for luxury culinary pacing with zero redundant service surcharges.
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <button className="group relative w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary-container via-primary-fixed-dim to-secondary-fixed text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(128,131,255,0.4),0_0_20px_rgba(240,225,195,0.3)] hover:shadow-[0_12px_40px_rgba(128,131,255,0.6),0_0_30px_rgba(240,225,195,0.5)] transition-all transform active:scale-[0.985] cursor-pointer overflow-hidden" type="button">
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <span className="material-symbols-outlined text-[20px] transition-transform duration-500 group-hover:rotate-180" style={{ "fontVariationSettings": "'FILL' 1" }}>
                        auto_awesome
                      </span>
                      <span className="tracking-wide">
                        Generate My Plan
                      </span>
                      <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </button>
                    <div className="flex items-center justify-center gap-2 text-on-surface-variant font-body-sm text-[11px] text-center pt-1">
                      <span className="material-symbols-outlined text-secondary-fixed text-[14px]">
                        lock
                      </span>
                      <span>
                        Protected by Aura Autonomous Escrow & VIP NDA Protocol
                      </span>
                    </div>
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
