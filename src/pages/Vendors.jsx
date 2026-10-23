import { useEffect } from 'react'

export default function Vendors() {
  // Original Stitch interactivity (runs once after the page is on screen)
  useEffect(() => {
    // Filter tabs client micro-interaction
      document.querySelectorAll('.vendor-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          // Toggle Tab Styles
          document.querySelectorAll('.vendor-tab').forEach(t => {
            t.className = 'vendor-tab px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all';
          });
          tab.className = 'vendor-tab px-4 py-2 rounded-lg font-label-md text-label-md text-on-primary bg-primary-container shadow-[0_0_16px_rgba(192,193,255,0.25)] transition-all';

          const filter = tab.getAttribute('data-filter');
          const cards = document.querySelectorAll('.vendor-card');

          cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
              card.style.display = 'block';
              card.style.opacity = '1';
            } else {
              card.style.display = 'none';
              card.style.opacity = '0';
            }
          });
        });
      });
  }, [])

  return (
      <>
      <div className="flex flex-col w-full">
        <div className="max-w-7xl mx-auto px-margin-sm lg:px-margin py-space-lg w-full flex flex-col gap-space-xl">
          <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)]"></span>
                <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest">
                  Autonomous Procurement Engine
                </span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Curated Vendor Directory & Negotiation Hub
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Real-time contractual risk intelligence, rate benchmarks, and automated milestone governance calibrated for Julian & Maya's Autumn Gala.
              </p>
            </div>
            <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
              <div className="px-space-md py-space-sm rounded-xl bg-surface-container-low shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]" style={{ "fontVariationSettings": "'FILL' 1" }}>
                    verified
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    SLA Audits
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    100% Compliant
                  </span>
                </div>
              </div>
              <div className="px-space-md py-space-sm rounded-xl bg-surface-container-low shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">
                    psychology
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    AI Optimization
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary">
                    +$8,400 Saved
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md bg-surface-container-low/70 backdrop-blur-2xl p-2 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface-container-lowest" id="vendor-filter-tabs">
              <button className="vendor-tab px-4 py-2 rounded-lg font-label-md text-label-md text-on-primary bg-primary-container shadow-[0_0_16px_rgba(192,193,255,0.25)] transition-all" data-filter="all" type="button">
                All Vendors
                {' '}
                <span className="ml-1 opacity-80">
                  (8)
                </span>
              </button>
              <button className="vendor-tab px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all" data-filter="booked" type="button">
                Booked
                {' '}
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-surface-container text-[11px] text-secondary-fixed">
                  3
                </span>
              </button>
              <button className="vendor-tab px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all" data-filter="shortlisted" type="button">
                Shortlisted
                {' '}
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-surface-container text-[11px] text-secondary">
                  3
                </span>
              </button>
              <button className="vendor-tab px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all" data-filter="ai-inquiring" type="button">
                AI Inquiring
                {' '}
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-surface-container text-[11px] text-primary">
                  2
                </span>
              </button>
            </div>
            <div className="flex items-center gap-space-sm px-2">
              <div className="relative flex-1 sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                  search
                </span>
                <input className="w-full h-10 pl-9 pr-4 rounded-xl bg-surface-container text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-high shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] transition-all" placeholder="Search discipline, clause, name..." type="text" />
              </div>
              <button className="h-10 px-3.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high flex items-center gap-2 font-label-md text-label-md transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" type="button">
                <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
                  tune
                </span>
                <span className="hidden sm:inline">
                  Sort: Priority
                </span>
              </button>
            </div>
          </section>
          <div className="flex flex-col gap-space-lg" id="vendor-grid">
            <article className="vendor-card group relative bg-surface-container/70 backdrop-blur-2xl rounded-2xl p-space-lg shadow-[0_20px_40px_rgba(0,0,0,0.45)] hover:shadow-[0_28px_60px_rgba(0,0,0,0.6)] transition-all duration-300" data-category="booked">
              <div className="flex flex-col lg:flex-row gap-space-lg items-start">
                <div className="w-full lg:w-72 shrink-0 flex flex-col gap-space-sm">
                  <div className="relative w-full h-48 rounded-xl overflow-hidden bg-surface-container-high">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="High-end culinary fine dining plating with edible flowers, microgreens, smoked cloche presentation at an opulent nocturnal wedding reception with warm gold candle reflections on dark basalt table." src="https://lh3.googleusercontent.com/aida-public/AB6AXuABKou_odwYH62s0vLxS-tzzRkB4Jg3_YJldhmSB3dJe7FBo_TRIXCZzWV7YEGwDFQNV3SxyjfioxrW-51xZmh7Y2KJciv5IBdWGCAbByfpy9ayha5JD4CJZid2BK98GiwYxch1oUqIh5xfEnI32tCyA48eqBJutdKbLt50RQw8QjLbKAmzA_4WqNr3KL-Ys-9vyTLhUw5R_mwCSBdp5tvrkn8DiI0ISx6z0fompH2F46r0z4NTysOMTA" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                      <span className="material-symbols-outlined text-secondary-fixed text-[14px]">
                        restaurant_menu
                      </span>
                      <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                        Catering & Mixology
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-on-surface/90 bg-surface-container-high/80 backdrop-blur-md px-2 py-0.5 rounded">
                        Tasting Approved
                      </span>
                      <span className="font-label-caps text-label-caps text-secondary-fixed bg-surface-container-high/80 backdrop-blur-md px-2 py-0.5 rounded">
                        Chef Julian V.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant px-1">
                    <span>
                      Coverage: 180 Guests
                    </span>
                    <span>
                      4-Course Plated
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between self-stretch gap-space-md">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-space-xs">
                      <div className="flex items-center gap-space-sm flex-wrap">
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                          Heirloom & Vine Culinary Co.
                        </h3>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high/90 shadow-[0_0_16px_rgba(34,197,94,0.18)]">
                          <span className="w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)]"></span>
                          <span className="font-label-caps text-label-caps text-secondary-fixed font-semibold tracking-wider uppercase">
                            Booked & Confirmed
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-headline-sm text-headline-sm text-on-surface">
                          $$$$
                          {' '}
                          <span className="font-body-md text-body-md text-on-surface-variant font-normal">
                            ($120 – $165 / plate)
                          </span>
                        </div>
                        <span className="font-label-caps text-label-caps text-secondary-fixed">
                          Target: $26,100 Committed
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-space-md mt-1">
                      <div className="flex items-center gap-1 text-secondary-fixed">
                        <span className="material-symbols-outlined text-[18px]" style={{ "fontVariationSettings": "'FILL' 1" }}>
                          star
                        </span>
                        <span className="font-headline-sm text-[15px] font-bold text-on-surface">
                          4.98
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          (84 Luminary reviews)
                        </span>
                      </div>
                      <div className="h-3 w-px bg-surface-variant"></div>
                      <div className="flex items-center gap-1.5 text-secondary-fixed-dim">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          verified_user
                        </span>
                        <span className="font-label-md text-label-md text-secondary-fixed-dim">
                          $5M Umbrella Liability Verified
                        </span>
                      </div>
                      <div className="h-3 w-px bg-surface-variant"></div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Primary: Chef Julian Mercier
                      </span>
                    </div>
                    <p className="mt-space-sm font-body-md text-body-md text-on-surface-variant line-clamp-2">
                      Hyper-seasonal biodynamic tasting menus crafted for high-aesthetic gatherings. Full pairing integration alongside vintage cellar allocation and autonomous staff scheduling.
                    </p>
                  </div>
                  <div className="p-space-sm rounded-xl bg-surface-container-lowest/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-[0_0_12px_rgba(192,193,255,0.2)]">
                        <span className="material-symbols-outlined text-[20px]">
                          smart_toy
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            AI Contract Score: 98% Terms Favorability
                          </span>
                          <span className="font-label-caps text-label-caps text-secondary-fixed bg-secondary-container/40 px-1.5 py-0.5 rounded">
                            Risk: Ultra-Low
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Force majeure includes zero-penalty smoke/curfew re-allocations.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                      <button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-all flex items-center gap-1.5" type="button">
                        <span className="material-symbols-outlined text-[16px]">
                          description
                        </span>
                        <span>
                          View Agreement & Menu
                        </span>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all" type="button">
                        <span className="material-symbols-outlined text-[18px]">
                          chat_bubble
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article className="vendor-card group relative bg-surface-container/70 backdrop-blur-2xl rounded-2xl p-space-lg shadow-[0_20px_40px_rgba(0,0,0,0.45)] hover:shadow-[0_28px_60px_rgba(0,0,0,0.6)] transition-all duration-300" data-category="shortlisted">
              <div className="flex flex-col lg:flex-row gap-space-lg items-start">
                <div className="w-full lg:w-72 shrink-0 flex flex-col gap-space-sm">
                  <div className="relative w-full h-48 rounded-xl overflow-hidden bg-surface-container-high">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Dramatic ceiling installation of suspended cascading dark burgundy dahlias, dried black amaranth, and ethereal golden branches illuminated by atmospheric indigo architectural downlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNGiqydKDyYd19Hy9s5FAtf4ZE7D4x8JHSFODymvu-BqygcIL_cz8q7891jTBeGHqzMSo5-gG7VHnQHlfPoHNCH9ico1h0Oiczn-2zGWn443GN23quuvU_5FtNtBm62pZo_BOlKQCoSDEOnPhmS5LxaqBcdl61GHN1-EY_vZSd_C8rBASMqXLQCbO_9A3WT66CuapNCVC0qAU2YMkW9u7Djv30sh90HEXNTg34qQPSq5QLUulDfBXmww" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                      <span className="material-symbols-outlined text-secondary-fixed text-[14px]">
                        local_florist
                      </span>
                      <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                        Spatial & Floral
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-on-surface/90 bg-surface-container-high/80 backdrop-blur-md px-2 py-0.5 rounded">
                        3 Moodboards Ready
                      </span>
                      <span className="font-label-caps text-label-caps text-secondary-fixed bg-surface-container-high/80 backdrop-blur-md px-2 py-0.5 rounded">
                        Lead Designer: Soraya
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant px-1">
                    <span>
                      Tables: 16 Sculptural Sets
                    </span>
                    <span>
                      Installation: 6h window
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between self-stretch gap-space-md">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-space-xs">
                      <div className="flex items-center gap-space-sm flex-wrap">
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                          Botanical Luxe Atelier
                        </h3>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/50 shadow-[0_0_16px_rgba(240,225,195,0.18)]">
                          <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse shadow-[0_0_8px_rgba(240,225,195,0.9)]"></span>
                          <span className="font-label-caps text-label-caps text-secondary-fixed font-semibold tracking-wider uppercase">
                            Shortlisted • Priority Choice
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-headline-sm text-headline-sm text-on-surface">
                          $$$
                          {' '}
                          <span className="font-body-md text-body-md text-on-surface-variant font-normal">
                            ($10,000 – $14,000)
                          </span>
                        </div>
                        <span className="font-label-caps text-label-caps text-primary">
                          Aura Estimate: $11,850 Total
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-space-md mt-1">
                      <div className="flex items-center gap-1 text-secondary-fixed">
                        <span className="material-symbols-outlined text-[18px]" style={{ "fontVariationSettings": "'FILL' 1" }}>
                          star
                        </span>
                        <span className="font-headline-sm text-[15px] font-bold text-on-surface">
                          4.95
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          (62 reviews)
                        </span>
                      </div>
                      <div className="h-3 w-px bg-surface-variant"></div>
                      <div className="flex items-center gap-1.5 text-secondary-fixed-dim">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          verified_user
                        </span>
                        <span className="font-label-md text-label-md text-secondary-fixed-dim">
                          Certificate of Insurance on File
                        </span>
                      </div>
                      <div className="h-3 w-px bg-surface-variant"></div>
                      <span className="font-body-sm text-body-sm text-secondary-fixed">
                        Holding slot until Nov 12
                      </span>
                    </div>
                    <p className="mt-space-sm font-body-md text-body-md text-on-surface-variant line-clamp-2">
                      Architectural floral scapes, zero-foam sustainably engineered suspension rigs, and custom heirloom brass table urns tailored to midnight color palettes.
                    </p>
                  </div>
                  <div className="p-space-sm rounded-xl bg-surface-container-lowest/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shrink-0 shadow-[0_0_12px_rgba(211,197,168,0.2)]">
                        <span className="material-symbols-outlined text-[20px]">
                          balance
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            AI Contract Score: 94% Favorability
                          </span>
                          <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">
                            Strike Clause Included
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Awaiting final sign-off on midnight dismantle curfew rider.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button className="px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]" type="button">
                        Compare Quotes (3)
                      </button>
                      <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-lg text-label-lg shadow-[0_0_24px_rgba(192,193,255,0.4)] hover:shadow-[0_0_32px_rgba(192,193,255,0.6)] hover:brightness-110 active:scale-[0.985] transition-all flex items-center gap-2 font-semibold" type="button">
                        <span className="material-symbols-outlined text-[18px]">
                          verified
                        </span>
                        <span>
                          Book Vendor
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article className="vendor-card group relative bg-surface-container/70 backdrop-blur-2xl rounded-2xl p-space-lg shadow-[0_20px_40px_rgba(0,0,0,0.45)] hover:shadow-[0_28px_60px_rgba(0,0,0,0.6)] transition-all duration-300" data-category="booked">
              <div className="flex flex-col lg:flex-row gap-space-lg items-start">
                <div className="w-full lg:w-72 shrink-0 flex flex-col gap-space-sm">
                  <div className="relative w-full h-48 rounded-xl overflow-hidden bg-surface-container-high">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Chiaroscuro cinematic 35mm film portrait of an elegant evening reception with guests dressed in haute couture black tie, warm candle glows, and atmospheric ambient purple back-lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE54ABVG8iRgmCjguc0DBPwqT7tPSPVM1HseXiazMW1Y2f8XdSpD5rnPhetpvOdNzvl2iUHDc38ghwAvWeu0wlE-UPdF7ZGO4hcWB1z0gO1cHOe4N-8x2Cjppdp9vNKhBrf4nw7j62kEEdsd8IAYWt49fe8o_X7tyFBsbJWKmUTSY66rC66HpVrPuwwJfuBgls3MWHAxeFX3rmegNqauZvrB4-gQdSvjs7or0NqYw1jHpaj3FcvTP-5w" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                      <span className="material-symbols-outlined text-secondary-fixed text-[14px]">
                        videocam
                      </span>
                      <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                        Cinematography & Film
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-on-surface/90 bg-surface-container-high/80 backdrop-blur-md px-2 py-0.5 rounded">
                        35mm & RED 8K Digital
                      </span>
                      <span className="font-label-caps text-label-caps text-secondary-fixed bg-surface-container-high/80 backdrop-blur-md px-2 py-0.5 rounded">
                        Director: H. Vance
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant px-1">
                    <span>
                      Crew: 3 Operators
                    </span>
                    <span>
                      10-Hour On-Site
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between self-stretch gap-space-md">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-space-xs">
                      <div className="flex items-center gap-space-sm flex-wrap">
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                          Lumière Cinematics
                        </h3>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high/90 shadow-[0_0_16px_rgba(34,197,94,0.18)]">
                          <span className="w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)]"></span>
                          <span className="font-label-caps text-label-caps text-secondary-fixed font-semibold tracking-wider uppercase">
                            Booked • Deposit Cleared
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-headline-sm text-headline-sm text-on-surface">
                          $$$$
                          {' '}
                          <span className="font-body-md text-body-md text-on-surface-variant font-normal">
                            ($7,500 – $9,000)
                          </span>
                        </div>
                        <span className="font-label-caps text-label-caps text-secondary-fixed">
                          Agreed: $8,200 Locked
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-space-md mt-1">
                      <div className="flex items-center gap-1 text-secondary-fixed">
                        <span className="material-symbols-outlined text-[18px]" style={{ "fontVariationSettings": "'FILL' 1" }}>
                          star
                        </span>
                        <span className="font-headline-sm text-[15px] font-bold text-on-surface">
                          5.0
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          (110 Luminary reviews)
                        </span>
                      </div>
                      <div className="h-3 w-px bg-surface-variant"></div>
                      <div className="flex items-center gap-1.5 text-secondary-fixed-dim">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          verified_user
                        </span>
                        <span className="font-label-md text-label-md text-secondary-fixed-dim">
                          Commercial Drone FAA Registered
                        </span>
                      </div>
                      <div className="h-3 w-px bg-surface-variant"></div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Full Archival Rights Granted
                      </span>
                    </div>
                    <p className="mt-space-sm font-body-md text-body-md text-on-surface-variant line-clamp-2">
                      Editorial documentary cinema team using analogue 35mm motion stock and anamorphic optics. Delivery incorporates a 60-second premiere reel within 48 hours.
                    </p>
                  </div>
                  <div className="p-space-sm rounded-xl bg-surface-container-lowest/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-[0_0_12px_rgba(192,193,255,0.2)]">
                        <span className="material-symbols-outlined text-[20px]">
                          timer
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            AI Milestone Tracking: Active
                          </span>
                          <span className="font-label-caps text-label-caps text-secondary-fixed bg-secondary-container/40 px-1.5 py-0.5 rounded">
                            Milestone 2/4 Done
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Next: Pre-Event Shot List Synchronization scheduled for Day T-14.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                      <button className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-all flex items-center gap-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]" type="button">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          view_timeline
                        </span>
                        <span>
                          Manage Deliverables
                        </span>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all" type="button">
                        <span className="material-symbols-outlined text-[18px]">
                          chat_bubble
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article className="vendor-card group relative bg-surface-container/70 backdrop-blur-2xl rounded-2xl p-space-lg shadow-[0_20px_40px_rgba(0,0,0,0.45)] hover:shadow-[0_28px_60px_rgba(0,0,0,0.6)] transition-all duration-300" data-category="shortlisted">
              <div className="flex flex-col lg:flex-row gap-space-lg items-start">
                <div className="w-full lg:w-72 shrink-0 flex flex-col gap-space-sm">
                  <div className="relative w-full h-48 rounded-xl overflow-hidden bg-surface-container-high">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Minimalist architectural DJ booth made of smoked dark glass and polished champagne brass, with warm glowing vacuum tube amplifiers and vinyl record players in an upscale club lounge." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH50oxLlp7EiRmjtI4TVKumc8-g40o3BehpxmDrjF2RFU_ZM7xjU_sgkxyGCCo6hsMKuCi7PrvTFun-Ql_wet5AQB0BA8hVDiPpPh6bw2oUlAg4MWs_svZVJHR5PwZZ21nOukBt4kZG6_RWjw3ax77gv_velEzho0kFmlWLsCYoQ0NPh5hG9BkLxANMxX_Jsob9SNnUSeZFjGD7OcwumAMLAbTmuCxuXVliWMPL8HJucj_9KcfnQ2TKQ" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                      <span className="material-symbols-outlined text-secondary-fixed text-[14px]">
                        headphones
                      </span>
                      <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                        Sound & Acoustics
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-on-surface/90 bg-surface-container-high/80 backdrop-blur-md px-2 py-0.5 rounded">
                        Custom Soundscape
                      </span>
                      <span className="font-label-caps text-label-caps text-secondary-fixed bg-surface-container-high/80 backdrop-blur-md px-2 py-0.5 rounded">
                        Resident: Kai Vance
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant px-1">
                    <span>
                      Setup: L-Acoustics Rig
                    </span>
                    <span>
                      Afterhours License: Valid
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between self-stretch gap-space-md">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-space-xs">
                      <div className="flex items-center gap-space-sm flex-wrap">
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                          Sonder Sounds & Lighting
                        </h3>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/50 shadow-[0_0_16px_rgba(240,225,195,0.18)]">
                          <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse shadow-[0_0_8px_rgba(240,225,195,0.9)]"></span>
                          <span className="font-label-caps text-label-caps text-secondary-fixed font-semibold tracking-wider uppercase">
                            Shortlisted • High Affinity
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-headline-sm text-headline-sm text-on-surface">
                          $$$
                          {' '}
                          <span className="font-body-md text-body-md text-on-surface-variant font-normal">
                            ($6,000 – $8,500)
                          </span>
                        </div>
                        <span className="font-label-caps text-label-caps text-primary">
                          Negotiated: $7,200 Bundle
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-space-md mt-1">
                      <div className="flex items-center gap-1 text-secondary-fixed">
                        <span className="material-symbols-outlined text-[18px]" style={{ "fontVariationSettings": "'FILL' 1" }}>
                          star
                        </span>
                        <span className="font-headline-sm text-[15px] font-bold text-on-surface">
                          4.92
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          (54 reviews)
                        </span>
                      </div>
                      <div className="h-3 w-px bg-surface-variant"></div>
                      <div className="flex items-center gap-1.5 text-secondary-fixed-dim">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          verified_user
                        </span>
                        <span className="font-label-md text-label-md text-secondary-fixed-dim">
                          Acoustic dB Ordinance Certified
                        </span>
                      </div>
                      <div className="h-3 w-px bg-surface-variant"></div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Includes Live Saxophone Accompaniment
                      </span>
                    </div>
                    <p className="mt-space-sm font-body-md text-body-md text-on-surface-variant line-clamp-2">
                      Bespoke sonic direction moving from organic ambient jazz cocktail sets to deep melodic house. Complete discrete point-source acoustic engineering ensuring zero audio bleed.
                    </p>
                  </div>
                  <div className="p-space-sm rounded-xl bg-surface-container-lowest/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-[0_0_12px_rgba(192,193,255,0.2)]">
                        <span className="material-symbols-outlined text-[20px]">
                          graphic_eq
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            AI Contract Score: 96% Favorability
                          </span>
                          <span className="font-label-caps text-label-caps text-secondary-fixed bg-secondary-container/40 px-1.5 py-0.5 rounded">
                            Rider Checked
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Equipment rider matched 1:1 against venue 3-phase power specification.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button className="px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]" type="button">
                        Review Setlist
                      </button>
                      <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-lg text-label-lg shadow-[0_0_24px_rgba(192,193,255,0.4)] hover:shadow-[0_0_32px_rgba(192,193,255,0.6)] hover:brightness-110 active:scale-[0.985] transition-all flex items-center gap-2 font-semibold" type="button">
                        <span className="material-symbols-outlined text-[18px]">
                          verified
                        </span>
                        <span>
                          Book Vendor
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article className="vendor-card group relative bg-surface-container/70 backdrop-blur-2xl rounded-2xl p-space-lg shadow-[0_20px_40px_rgba(0,0,0,0.45)] hover:shadow-[0_28px_60px_rgba(0,0,0,0.6)] transition-all duration-300" data-category="ai-inquiring">
              <div className="flex flex-col lg:flex-row gap-space-lg items-start">
                <div className="w-full lg:w-72 shrink-0 flex flex-col gap-space-sm">
                  <div className="relative w-full h-48 rounded-xl overflow-hidden bg-surface-container-high">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Geometric optical laser beams and smoked beam architectural illumination inside a dark gothic stone hall, reflecting soft amber hues and electric indigo ambient uplights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP6v5iWDWGVjgVuE6au-hGx8ibJ_HsEkHAiwrIDbTgjniI4TZwIPz3MG2FO17B1x25G8Smo5CzlIYkersWwhbBiXO8p_z_f1RAICbp0EhuUbiREX-fe0SIEOF2fBXh-YV69U2uzGw4Q6Tj7sn-naiZqS8ERCtdi-Ass1j4mFP0wKRr5RIEF3qh4h3t4bwXLa_ASP8l3xtMmX0TA6nE7bxF_F2rF7d-eJzdoyiuZH6T1Mh38Rdpogx51A" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                      <span className="material-symbols-outlined text-secondary-fixed text-[14px]">
                        wb_twilight
                      </span>
                      <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                        Spatial Illuminations
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-primary bg-surface-container-high/90 backdrop-blur-md px-2 py-0.5 rounded animate-pulse">
                        Autonomous Bot Active
                      </span>
                      <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high/80 backdrop-blur-md px-2 py-0.5 rounded">
                        Quote Pending
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant px-1">
                    <span>
                      Truss System: Rigged
                    </span>
                    <span>
                      DMX Controlled
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between self-stretch gap-space-md">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-space-xs">
                      <div className="flex items-center gap-space-sm flex-wrap">
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                          Prism & Beam Spatial
                        </h3>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/20 shadow-[0_0_16px_rgba(192,193,255,0.25)]">
                          <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                          <span className="font-label-caps text-label-caps text-primary font-semibold tracking-wider uppercase">
                            AI Inquiring • Dispatching RFP
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-headline-sm text-headline-sm text-on-surface">
                          $$
                          {' '}
                          <span className="font-body-md text-body-md text-on-surface-variant font-normal">
                            ($3,500 Base)
                          </span>
                        </div>
                        <span className="font-label-caps text-label-caps text-on-surface-variant">
                          RFP Target: $3,200
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-space-md mt-1">
                      <div className="flex items-center gap-1 text-secondary-fixed">
                        <span className="material-symbols-outlined text-[18px]" style={{ "fontVariationSettings": "'FILL' 1" }}>
                          star
                        </span>
                        <span className="font-headline-sm text-[15px] font-bold text-on-surface">
                          4.88
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          (39 reviews)
                        </span>
                      </div>
                      <div className="h-3 w-px bg-surface-variant"></div>
                      <div className="flex items-center gap-1.5 text-secondary-fixed-dim">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          verified_user
                        </span>
                        <span className="font-label-md text-label-md text-secondary-fixed-dim">
                          Structural Rigging Master Certified
                        </span>
                      </div>
                      <div className="h-3 w-px bg-surface-variant"></div>
                      <span className="font-body-sm text-body-sm text-primary">
                        Inquiry Turnaround: ~2 hours
                      </span>
                    </div>
                    <p className="mt-space-sm font-body-md text-body-md text-on-surface-variant line-clamp-2">
                      Kinetic lighting arrays, custom gobo projections, and wireless battery-powered ambient uplighting synchronized directly with event timeline transitions.
                    </p>
                  </div>
                  <div className="p-space-sm rounded-xl bg-surface-container-lowest/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-[0_0_12px_rgba(192,193,255,0.2)]">
                        <span className="material-symbols-outlined text-[20px] animate-spin">
                          sync
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            Autonomous Concierge Bot active
                          </span>
                          <span className="font-label-caps text-label-caps text-primary bg-primary-container/20 px-1.5 py-0.5 rounded">
                            Round 1 Negotiation
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Clarifying setup window requirements with Stonehaven Manor operations team.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                      <button className="px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-all flex items-center gap-1.5" type="button">
                        <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                          rate_review
                        </span>
                        <span>
                          View Auto-Prompt Log
                        </span>
                      </button>
                      <button className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-primary font-label-md text-label-md transition-all flex items-center gap-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]" type="button">
                        <span>
                          Take Over Manually
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-space-md bg-surface-container-low/80 backdrop-blur-2xl rounded-2xl p-space-lg shadow-[0_20px_48px_rgba(0,0,0,0.4)]">
            <div className="lg:col-span-2 flex flex-col justify-between gap-space-md">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
                    policy
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Contract Clause Integrity & Dispute Protection
                  </h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Cross-vendor indemnity mapping. Aura cross-checks force majeure terms, overtime surge rates, and deposit recovery guarantees against municipal jurisdiction standard protocols.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-2">
                <div className="p-space-sm rounded-xl bg-surface-container-high/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Cancellation Protection
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-headline-sm text-headline-sm text-secondary-fixed">
                      99.4%
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary">
                      +2.1% benchmark
                    </span>
                  </div>
                  <svg className="w-full h-8 mt-2 text-secondary" fill="none" viewBox="0 0 100 24">
                    <path d="M0 18 Q 20 22, 40 12 T 80 8 L 100 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
                  </svg>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-high/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Overtime Rate Caps
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-headline-sm text-headline-sm text-primary">
                      Fixed 1.25x
                    </span>
                    <span className="font-body-sm text-body-sm text-primary">
                      Optimized
                    </span>
                  </div>
                  <svg className="w-full h-8 mt-2 text-primary" fill="none" viewBox="0 0 100 24">
                    <path d="M0 20 L 25 15 L 50 16 L 75 10 L 100 7" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
                  </svg>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-high/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Insurance Validation
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-headline-sm text-headline-sm text-on-surface">
                      5 of 5
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary-fixed">
                      100% Bound
                    </span>
                  </div>
                  <svg className="w-full h-8 mt-2 text-secondary-fixed" fill="none" viewBox="0 0 100 24">
                    <path d="M0 12 H 100" stroke="currentColor" strokeDasharray="4 2" strokeWidth="2"></path>
                    <circle cx="85" cy="12" fill="currentColor" r="3"></circle>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-space-md rounded-xl bg-surface-container-lowest/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" fill="transparent" r="48" stroke="#272a32" strokeWidth="10"></circle>
                  <circle cx="60" cy="60" fill="transparent" r="48" stroke="#c0c1ff" strokeDasharray="301.59" strokeDashoffset="165.8" strokeLinecap="round" strokeWidth="10"></circle>
                  <circle className="rotate-45 origin-center" cx="60" cy="60" fill="transparent" r="48" stroke="#d3c5a8" strokeDasharray="301.59" strokeDashoffset="226.19" strokeLinecap="round" strokeWidth="10"></circle>
                  <circle className="rotate-[160deg] origin-center" cx="60" cy="60" fill="transparent" r="48" stroke="#8083ff" strokeDasharray="301.59" strokeDashoffset="271.4" strokeLinecap="round" strokeWidth="10"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">
                    $49.5k
                  </span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Committed
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-sm mt-3 text-body-sm font-body-sm text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  {' '}
                  F&B
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  {' '}
                  Decor
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  {' '}
                  Media
                </span>
              </div>
            </div>
          </section>
          <aside className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container-low p-space-md sm:p-space-lg shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-10 left-1/3 w-72 h-32 bg-secondary/15 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md w-full lg:w-auto">
                <div className="relative shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-surface-container-highest shadow-[0_0_24px_rgba(192,193,255,0.3)]">
                  <span className="material-symbols-outlined text-primary text-[26px]">
                    psychology
                  </span>
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-secondary-fixed shadow-[0_0_10px_rgba(240,225,195,1)]"></span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest font-semibold">
                      Live Enclave Guard
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Auto-Escrow sync enabled
                    </span>
                  </div>
                  <p className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                    Autonomous AI Agent is monitoring cancellation policies and payment milestones for 4 vendors.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm w-full lg:w-auto justify-end shrink-0">
                <button className="px-4 py-2.5 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex items-center gap-2" type="button">
                  <span className="material-symbols-outlined text-[18px]">
                    history
                  </span>
                  <span>
                    Audit Trail
                  </span>
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary-fixed to-secondary text-on-secondary-fixed font-label-lg text-label-lg shadow-[0_0_24px_rgba(211,197,168,0.3)] hover:brightness-105 active:scale-[0.985] transition-all flex items-center gap-2 font-semibold" type="button">
                  <span className="material-symbols-outlined text-[18px]">
                    lock_reset
                  </span>
                  <span>
                    Configure AI Thresholds
                  </span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
      </>
  )
}
