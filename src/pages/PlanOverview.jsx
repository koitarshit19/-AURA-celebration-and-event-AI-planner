import { useEffect } from 'react'

export default function PlanOverview() {
  // Original Stitch interactivity (runs once after the page is on screen)
  useEffect(() => {
    function toggleTimelineDetail(card) {
        const drawer = card.querySelector('.detail-drawer');
        if (drawer) {
          drawer.classList.toggle('hidden');
        }
      }

      function insertPrompt(text) {
        const input = document.getElementById('copilotInput');
        if (input) {
          input.value = text;
          input.focus();
        }
      }

      function submitCopilotQuery() {
        const input = document.getElementById('copilotInput');
        if (!input || !input.value.trim()) return;
    
        const originalPlaceholder = input.placeholder;
        const userQuery = input.value;
        input.value = '';
        input.placeholder = `Synthesizing: "${userQuery}"...`;
    
        setTimeout(() => {
          input.placeholder = "Analysis integrated into Napa Gala masterplan. Enter next query...";
        }, 1200);
      }

      function handleMasterSync() {
        const syncBtn = document.getElementById('syncBtn');
        const syncText = document.getElementById('syncText');
        const syncIcon = document.getElementById('syncIcon');

        if (!syncBtn) return;

        syncIcon.classList.add('animate-spin');
        syncText.textContent = 'Synchronizing 140 Calendars...';

        setTimeout(() => {
          syncIcon.classList.remove('animate-spin');
          syncIcon.textContent = 'done_all';
          syncText.textContent = 'All Vendors & Guests Synced';
          syncBtn.classList.remove('from-secondary-fixed', 'to-secondary');
          syncBtn.classList.add('bg-primary', 'text-on-primary');

          setTimeout(() => {
            syncIcon.textContent = 'sync_alt';
            syncText.textContent = 'Sync to Master Schedule';
            syncBtn.classList.remove('bg-primary', 'text-on-primary');
            syncBtn.classList.add('from-secondary-fixed', 'to-secondary');
          }, 3500);
        }, 1500);
      }
    window.toggleTimelineDetail = toggleTimelineDetail
    window.insertPrompt = insertPrompt
    window.submitCopilotQuery = submitCopilotQuery
    window.handleMasterSync = handleMasterSync
  }, [])

  return (
      <>
      <div className="flex flex-col w-full">
        <div className="relative w-full overflow-hidden pb-space-xl">
          <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-tertiary-container/10 blur-[120px] pointer-events-none -z-10"></div>
          <div className="absolute top-72 right-10 w-[480px] h-[480px] rounded-full bg-secondary-container/15 blur-[140px] pointer-events-none -z-10"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-primary/10 blur-[130px] pointer-events-none -z-10"></div>
          <div className="max-w-7xl mx-auto px-margin-sm lg:px-margin space-y-space-xl">
            <section className="pt-space-md">
              <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg">
                <div className="space-y-space-xs max-w-3xl">
                  <div className="flex flex-wrap items-center gap-space-sm">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-secondary-fixed font-label-caps text-label-caps uppercase tracking-widest shadow-[0_0_12px_rgba(211,197,168,0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed shadow-[0_0_6px_rgba(240,225,195,1)] animate-ping"></span>
                      {' '}
                      Autonomic Synthesis Phase IV
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[15px] text-secondary">
                        verified
                      </span>
                      {' '}
                      Verified by Aura Core
                    </span>
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight leading-tight">
                    AI Celebration Masterplan:
                    {' '}
                    <span className="bg-gradient-to-r from-on-surface via-secondary-fixed to-primary bg-clip-text text-transparent">
                      The Napa Valley Autumn Gala
                    </span>
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">
                    Curated for 140 bespoke guests at Meadowood Estate. Synchronizing culinary sensory design, biometric guest pacing, and cinematic golden hour orchestration.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-space-md shrink-0">
                  <div className="flex items-center gap-space-md px- space-md py-3 rounded-xl bg-surface-container/70 backdrop-blur-2xl shadow-[0_16px_32px_rgba(0,0,0,0.5)]">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                        <circle className="text-surface-container-highest" cx="24" cy="24" fill="none" r="20" stroke="currentColor" strokeWidth="3"></circle>
                        <circle className="text-secondary-fixed shadow-[0_0_10px_rgba(240,225,195,0.8)]" cx="24" cy="24" fill="none" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="2.5" strokeLinecap="round" strokeWidth="3.5"></circle>
                      </svg>
                      <span className="absolute font-headline-sm text-headline-sm text-on-surface">
                        98
                        <span className="font-label-caps text-[9px] text-secondary">
                          %
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-col pr-space-sm">
                      <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                        Plan Vitality
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                        Autonomous Lock
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="group flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface transition-all duration-300 shadow-md" type="button">
                      <span className="material-symbols-outlined text-[18px] text-secondary-fixed transition-transform group-hover:-translate-y-0.5">
                        ios_share
                      </span>
                      <span className="font-label-lg text-label-lg">
                        Executive Share
                      </span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-container via-primary-container to-tertiary-container text-on-primary font-label-lg text-label-lg shadow-[0_0_24px_rgba(128,131,255,0.4)] hover:brightness-110 active:scale-95 transition-all" type="button">
                      <span className="material-symbols-outlined text-[18px]">
                        download_for_offline
                      </span>
                      <span>
                        Export Dossier
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section className="relative rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
              <div className="relative h-64 md:h-80 w-full bg-cover bg-center" data-alt="A nocturnal luxury gala staged in an ethereal Napa Valley vineyard courtyard at dusk with warm glowing amber lanterns, sleek matte obsidian banquet tables, delicate minimalist violet floral installations, and dramatic ambient backlighting casting soft gold reflections on polished crystal stemware under a starry deep violet sky." style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzOLwNMf3H40bXwsDeg7oIT1zh2I12uMpawaQMDq2CAdcAQ_jPyJ37vgIQ6zJ_L9O1e7VaXPps_OcXW0MjOl76rh1hJ8PmqDrVUjBihLA0TUsUebE-k1slAP3SAbKdXIGb_MHlLagE01_Hx3GhbH8Z3FPGhKSUoJQoCw1_V9metBssBpUtxF0f_ZICyOqMkhEpfrud8xZznS06BdOCvQT2Ec-cJs4DaEi3HsBPQNibleWnGJjWhRKzcQ')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/80 via-transparent to-surface-container-lowest/40"></div>
                <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                  <div className="max-w-xl space-y-1">
                    <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[16px]">
                        location_on
                      </span>
                      {' '}
                      Meadowood Estate • St. Helena, California
                    </span>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      Spatial Atmosphere: The Twilight Vineyard Pavilion
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                      Geometric glass pavilions seamlessly integrated into centenary cabernet vines with continuous sub-surface heating and acoustic baffles for evening resonance.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-2 rounded-lg bg-surface-container-lowest/80 backdrop-blur-md flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-tertiary text-[18px]">
                        wb_twilight
                      </span>
                      <div className="flex flex-col text-left">
                        <span className="font-label-caps text-label-caps text-on-surface-variant">
                          Astrometric Sunset
                        </span>
                        <span className="font-label-md text-label-md text-secondary-fixed font-semibold">
                          6:18 PM ± 4m
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-2 rounded-lg bg-surface-container-lowest/80 backdrop-blur-md flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        thermostat
                      </span>
                      <div className="flex flex-col text-left">
                        <span className="font-label-caps text-label-caps text-on-surface-variant">
                          Forecast Microclimate
                        </span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          64°F • 0% Precipitation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-2.5 h-6 rounded-full bg-gradient-to-b from-primary to-secondary"></div>
                  <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                      Master Orchestration Timeline
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Autonomously synthesized critical path with real-time vendor dependency mapping
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-caps text-label-caps text-secondary-fixed tracking-wider uppercase px-2 py-1 rounded bg-secondary-container/20">
                    Phase Locked
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md" id="timelineGrid">
                <div className="group relative flex flex-col justify-between p-space-md rounded-2xl bg-surface-container/70 backdrop-blur-xl hover:bg-surface-container-high transition-all duration-300 shadow-[0_12px_28px_rgba(0,0,0,0.35)] cursor-pointer" onClick={(e) => { toggleTimelineDetail(e.currentTarget) }}>
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-secondary-fixed-dim uppercase tracking-widest px-2 py-0.5 rounded bg-secondary-container/30">
                        T-Minus 30 Days
                      </span>
                      <span className="inline-flex items-center text-primary text-[14px]">
                        <span className="material-symbols-outlined text-[18px]">
                          check_circle
                        </span>
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary-fixed transition-colors">
                      Final Menu Curation & Linen Selection
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      Seven-course biodynamic pairing sign-off with Chef Laurent. Italian raw ecru stone-washed table coverings verified.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-sm space-y-2">
                    <div className="flex items-center justify-between font-label-caps text-label-caps text-on-surface-variant">
                      <span>
                        Verification Status
                      </span>
                      <span className="text-secondary-fixed font-semibold">
                        100% Locked
                      </span>
                    </div>
                    <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-secondary-fixed w-full"></div>
                    </div>
                    <div className="hidden detail-drawer pt-space-xs text-on-surface space-y-1">
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        • 4 Sommelier Reserves secured
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        • 140 Organic hand-pressed menu cards
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group relative flex flex-col justify-between p-space-md rounded-2xl bg-surface-container/70 backdrop-blur-xl hover:bg-surface-container-high transition-all duration-300 shadow-[0_12px_28px_rgba(0,0,0,0.35)] cursor-pointer" onClick={(e) => { toggleTimelineDetail(e.currentTarget) }}>
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-primary-fixed uppercase tracking-widest px-2 py-0.5 rounded bg-primary/20">
                        T-Minus 14 Days
                      </span>
                      <span className="inline-flex items-center text-tertiary text-[14px]">
                        <span className="material-symbols-outlined text-[18px]">
                          sync
                        </span>
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      Stage & Lighting Rehearsal
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      Photometric simulation of 2,400K architectural wash and bespoke acoustic mapping of the lawn amphitheater.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-sm space-y-2">
                    <div className="flex items-center justify-between font-label-caps text-label-caps text-on-surface-variant">
                      <span>
                        Verification Status
                      </span>
                      <span className="text-primary font-semibold">
                        In Simulation
                      </span>
                    </div>
                    <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-4/5"></div>
                    </div>
                    <div className="hidden detail-drawer pt-space-xs text-on-surface space-y-1">
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        • DMX cue list at 18:18 golden sync
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        • Subwoofer dispersion limiters set
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group relative flex flex-col justify-between p-space-md rounded-2xl bg-surface-container/70 backdrop-blur-xl hover:bg-surface-container-high transition-all duration-300 shadow-[0_12px_28px_rgba(0,0,0,0.35)] cursor-pointer" onClick={(e) => { toggleTimelineDetail(e.currentTarget) }}>
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest px-2 py-0.5 rounded bg-secondary-container/30">
                        T-Minus 3 Days
                      </span>
                      <span className="inline-flex items-center text-secondary text-[14px]">
                        <span className="material-symbols-outlined text-[18px]">
                          schedule
                        </span>
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                      Rehearsal Dinner & Arrival Greet
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      Private cellar reception for 32 inner-circle guests. Valet luxury fleet routing and VIP welcome hampers delivery.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-sm space-y-2">
                    <div className="flex items-center justify-between font-label-caps text-label-caps text-on-surface-variant">
                      <span>
                        Verification Status
                      </span>
                      <span className="text-secondary font-semibold">
                        Ready for Execution
                      </span>
                    </div>
                    <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-secondary-fixed w-11/12"></div>
                    </div>
                    <div className="hidden detail-drawer pt-space-xs text-on-surface space-y-1">
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        • 12 Mercedes Sprinter escorts pre-briefed
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        • Historic barrel room decanting at 16:00
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group relative flex flex-col justify-between p-space-md rounded-2xl bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-low shadow-[0_12px_32px_rgba(192,193,255,0.15)] cursor-pointer" onClick={(e) => { toggleTimelineDetail(e.currentTarget) }}>
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-on-tertiary-container font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-tertiary-fixed">
                        Day Of • Oct 24
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-pulse shadow-[0_0_8px_rgba(240,225,195,1)]"></span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-tertiary transition-colors">
                      Execution & Live Run-of-Show
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      Autonomous real-time concierge, microclimate adjustment, live artist telemetry, and seamless tempo modulation.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-sm space-y-2">
                    <div className="flex items-center justify-between font-label-caps text-label-caps text-on-surface-variant">
                      <span>
                        Autonomous Telemetry
                      </span>
                      <span className="text-tertiary font-semibold">
                        Ready to Engage
                      </span>
                    </div>
                    <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary-fixed w-full"></div>
                    </div>
                    <div className="hidden detail-drawer pt-space-xs text-on-surface space-y-1">
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        • Master Director link: Channel 1 Alpha
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        • AI Emergency alternate rain scenario armed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="space-y-space-md">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-2.5 h-6 rounded-full bg-secondary"></div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                      Budget Allocation & Procurement
                    </h2>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Algorithmic spend distribution against target threshold with contract telemetry
                  </p>
                </div>
                <div className="flex items-center gap-space-md">
                  <div className="text-right">
                    <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase">
                      Total Disbursed & Locked
                    </span>
                    <span className="font-headline-md text-headline-md text-secondary-fixed">
                      $75,000
                      {' '}
                      <span className="font-body-sm text-body-sm text-outline-variant font-normal">
                        / $80,000 cap
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-space-md rounded-2xl bg-surface-container/70 backdrop-blur-xl shadow-[0_16px_36px_rgba(0,0,0,0.4)] space-y-space-md">
                <div className="space-y-space-xs">
                  <div className="flex items-center justify-between font-label-md text-label-md">
                    <span className="text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        pie_chart
                      </span>
                      {' '}
                      Aggregate Capital Flow Allocation
                    </span>
                    <span className="text-secondary-fixed font-semibold">
                      93.75% Capitalized
                    </span>
                  </div>
                  <div className="w-full h-4 rounded-full bg-surface-container-highest overflow-hidden flex p-0.5 gap-0.5">
                    <div className="h-full rounded-l-full bg-secondary shadow-[0_0_8px_rgba(211,197,168,0.5)] transition-all duration-500" style={{ "width": "37.33%" }} title="Venue & Architecture: $28,000"></div>
                    <div className="h-full bg-primary-container shadow-[0_0_8px_rgba(128,131,255,0.4)] transition-all duration-500" style={{ "width": "24.66%" }} title="Food & Culinary: $18,500"></div>
                    <div className="h-full bg-tertiary shadow-[0_0_8px_rgba(208,188,255,0.4)] transition-all duration-500" style={{ "width": "16.0%" }} title="Decor & Florals: $12,000"></div>
                    <div className="h-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.4)] transition-all duration-500" style={{ "width": "11.33%" }} title="Music & Audio-Visual: $8,500"></div>
                    <div className="h-full rounded-r-full bg-primary transition-all duration-500" style={{ "width": "10.68%" }} title="Photography & Cinema: $8,000"></div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-space-md gap-y-2 pt-2">
                    <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                      <span>
                        Venue (37%)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                      <span>
                        Culinary (25%)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                      <span>
                        Florals (16%)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed"></span>
                      <span>
                        Audio-Visual (11%)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                      <span>
                        Cinema (11%)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-space-sm pt-2">
                  <div className="p-space-sm rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high transition-all duration-200 flex flex-col justify-between space-y-space-sm">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="material-symbols-outlined text-secondary text-[20px]">
                          villa
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase bg-secondary-container/50 text-secondary-fixed">
                          Locked
                        </span>
                      </div>
                      <h4 className="font-headline-sm text-[15px] font-semibold text-on-surface pt-1">
                        Venue & Grounds
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Meadowood West Estate
                      </p>
                    </div>
                    <div className="pt-2">
                      <span className="font-label-caps text-label-caps text-on-surface-variant block">
                        Allocated
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        $28,000
                      </span>
                    </div>
                  </div>
                  <div className="p-space-sm rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high transition-all duration-200 flex flex-col justify-between space-y-space-sm">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          restaurant
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase bg-primary-container/20 text-primary">
                          In Review
                        </span>
                      </div>
                      <h4 className="font-headline-sm text-[15px] font-semibold text-on-surface pt-1">
                        Food & Culinary
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        7-Course Autumn Tasting
                      </p>
                    </div>
                    <div className="pt-2">
                      <span className="font-label-caps text-label-caps text-on-surface-variant block">
                        Allocated
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        $18,500
                      </span>
                    </div>
                  </div>
                  <div className="p-space-sm rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high transition-all duration-200 flex flex-col justify-between space-y-space-sm">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="material-symbols-outlined text-tertiary text-[20px]">
                          local_florist
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase bg-tertiary-container/30 text-tertiary">
                          Shortlist
                        </span>
                      </div>
                      <h4 className="font-headline-sm text-[15px] font-semibold text-on-surface pt-1">
                        Decor & Florals
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Atelier Noire Botanicals
                      </p>
                    </div>
                    <div className="pt-2">
                      <span className="font-label-caps text-label-caps text-on-surface-variant block">
                        Allocated
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        $12,000
                      </span>
                    </div>
                  </div>
                  <div className="p-space-sm rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high transition-all duration-200 flex flex-col justify-between space-y-space-sm">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
                          graphic_eq
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase bg-secondary-container/50 text-secondary-fixed">
                          Locked
                        </span>
                      </div>
                      <h4 className="font-headline-sm text-[15px] font-semibold text-on-surface pt-1">
                        Music & Acoustic
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        L-Acoustics & Strings
                      </p>
                    </div>
                    <div className="pt-2">
                      <span className="font-label-caps text-label-caps text-on-surface-variant block">
                        Allocated
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        $8,500
                      </span>
                    </div>
                  </div>
                  <div className="p-space-sm rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high transition-all duration-200 flex flex-col justify-between space-y-space-sm">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          videocam
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase bg-primary-container/20 text-primary">
                          Booked
                        </span>
                      </div>
                      <h4 className="font-headline-sm text-[15px] font-semibold text-on-surface pt-1">
                        Cinema & Stills
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Kravitz Analog Collective
                      </p>
                    </div>
                    <div className="pt-2">
                      <span className="font-label-caps text-label-caps text-on-surface-variant block">
                        Allocated
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        $8,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-2.5 h-6 rounded-full bg-tertiary"></div>
                  <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                      Personalized AI Creative Synthesis
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Bespoke sensory surprises orchestrated from host aesthetic telemetry
                    </p>
                  </div>
                </div>
                <span className="font-label-caps text-label-caps text-tertiary-fixed tracking-wider uppercase px-2 py-1 rounded bg-tertiary-container/30">
                  3 High-Impact Concepts
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
                <div className="relative group rounded-2xl bg-surface-container/70 backdrop-blur-xl overflow-hidden p-space-md flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.45)] hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-space-md">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary-fixed shadow-[0_0_16px_rgba(240,225,195,0.25)]">
                        <span className="material-symbols-outlined text-[24px]">
                          celebration
                        </span>
                      </div>
                      <span className="font-label-caps text-label-caps text-secondary-fixed bg-secondary-container/30 px-2.5 py-1 rounded-full uppercase">
                        Culinary Climax
                      </span>
                    </div>
                    <div className="relative h-40 rounded-xl overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A theatrical golden hour champagne sabering performance during an upscale vineyard gala. A tuxedo-clad sommelier smoothly strikes a vintage magnum bottle with an antique silver saber under dramatic warm sunset lighting, sparkling droplets suspended in air with ambient vineyard backdrop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCADvOhiVhDS1eufMxvV5VQyYr7iqM1zUcHo-1xow4AXBho-eyE7H4e8-TiEYO5Td_oRaysJr_kVAp059uo1Rsuq156MP26FCvKv4fy3MobU2TaB-dUsytD9QRx48bE-Uhhv7N7_pl0w-jX5QiVqijssSJCzXTJz72xM7Omg8FG4UwzkMRgPEg2r7qoZeCN3QShV2EYQd1EhVYcgrzGUZJbQgQ7MxobxoP7zee6-1t9LDNrR_6s87Xq5Q" />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
                      <span className="absolute bottom-2 left-2 px-2 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-sm text-[11px] font-label-md text-secondary-fixed font-semibold">
                        T-Slot: 18:18 PDT
                      </span>
                    </div>
                    <div className="space-y-space-xs">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary-fixed transition-colors">
                        Sunset Champagne Sabering Ceremony
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Timed precisely at 6:18 PM golden hour on the west lawn. Synchronized with a brass crescendo as three vintage 2012 Jeroboams are unsealed concurrently.
                      </p>
                    </div>
                  </div>
                  <div className="pt-space-md mt-space-sm flex items-center justify-between">
                    <span className="font-label-caps text-label-caps text-secondary-fixed-dim">
                      Status: Staged & Choreographed
                    </span>
                    <button className="flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-secondary-fixed transition-colors" type="button">
                      <span>
                        View Cue
                      </span>
                      <span className="material-symbols-outlined text-[16px]">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
                <div className="relative group rounded-2xl bg-surface-container/70 backdrop-blur-xl overflow-hidden p-space-md flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.45)] hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-space-md">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center text-tertiary shadow-[0_0_16px_rgba(208,188,255,0.25)]">
                        <span className="material-symbols-outlined text-[24px]">
                          music_note
                        </span>
                      </div>
                      <span className="font-label-caps text-label-caps text-tertiary bg-tertiary-container/20 px-2.5 py-1 rounded-full uppercase">
                        Sonic Morph
                      </span>
                    </div>
                    <div className="relative h-40 rounded-xl overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="An atmospheric dimly lit performance stage where an avant-garde acoustic cellist seamlessly merges into a modern modular synthesizer deep house DJ set, surrounded by gentle violet smoke, minimalist stage lights, and luxury party guests enjoying music." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnj7KROafwNp2qEYbtymvnxa2KyNmjv33bAsx5l07rigF6N5heUugISZ_drEWixZGfvr99khHONGy5THtxPpXv1Ykg7avBsBjoi9h-wWZkgcQDacEgUOQQX5hG1JB9LRCv7725viik8tmOsMFNv9Kc6bW0cjhrRaaD8aQ8xyHMMYrfs57bY1eo_HHzF_SDX_q5Tpsy2wbpVkp-klSRIY-GtUvfR8nzJ8AegYCjYrfVBwR34HgjvucGVQ" />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
                      <span className="absolute bottom-2 left-2 px-2 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-sm text-[11px] font-label-md text-tertiary font-semibold">
                        T-Slot: 21:30 PDT
                      </span>
                    </div>
                    <div className="space-y-space-xs">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-tertiary transition-colors">
                        Acoustic Cellist to Deep House Transition
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Seamless tempo shift at 9:30 PM post-dinner. Live electric cello weaves into 118 BPM warm melodic house to organically invite guests onto the illuminated stone court.
                      </p>
                    </div>
                  </div>
                  <div className="pt-space-md mt-space-sm flex items-center justify-between">
                    <span className="font-label-caps text-label-caps text-tertiary-fixed-dim">
                      Status: Sound-check Arranged
                    </span>
                    <button className="flex items-center gap-1 font-label-md text-label-md text-tertiary hover:text-tertiary-fixed transition-colors" type="button">
                      <span>
                        Audition Track
                      </span>
                      <span className="material-symbols-outlined text-[16px]">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
                <div className="relative group rounded-2xl bg-surface-container/70 backdrop-blur-xl overflow-hidden p-space-md flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.45)] hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-space-md">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shadow-[0_0_16px_rgba(192,193,255,0.25)]">
                        <span className="material-symbols-outlined text-[24px]">
                          air
                        </span>
                      </div>
                      <span className="font-label-caps text-label-caps text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase">
                        Olfactory Design
                      </span>
                    </div>
                    <div className="relative h-40 rounded-xl overflow-hidden">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Close-up macro shot of bespoke fragrance nebulizers misting fine artisanal perfume with dried fig, raw cedarwood slices, and glowing amber resin stones on a smoked glass tray beside crisp textured natural linen napkins." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdddrwbp3FtstAFuWov2-9NPrHMabjrLuinyrorARJ0MXc58UXC3zCmm7hiL0vRShATiVCp_MWaJUvHNpAEtfZ7Jq1XcAiZvtU2f8sZiNRuA8K-wiNL0QgNWsW03_7iZUIaFtXcHZbeUEjJSkMiPV8p5GBzGiq9JR-Hz4ZE2_NrpWwGV_F8cVxs9HC4azrPacP75dTMPoLKih2-eJ_ymwyCbROsgkQS93YexY9mm-6pMJ4nMpwkh9M0A" />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
                      <span className="absolute bottom-2 left-2 px-2 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-sm text-[11px] font-label-md text-primary font-semibold">
                        T-Slot: Continuous Ambient
                      </span>
                    </div>
                    <div className="space-y-space-xs">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        Custom Fragrance & Linen Scenting
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Notes of aged cedarwood, sweet fig, and dried amber formulated exclusively for the vineyard courtyard, atomized via silent micro-diffusers at atmospheric perimeter nodes.
                      </p>
                    </div>
                  </div>
                  <div className="pt-space-md mt-space-sm flex items-center justify-between">
                    <span className="font-label-caps text-label-caps text-primary-fixed-dim">
                      Status: Scent Formulas Compounded
                    </span>
                    <button className="flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors" type="button">
                      <span>
                        Formula Notes
                      </span>
                      <span className="material-symbols-outlined text-[16px]">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section className="sticky bottom-6 z-40">
              <div className="p-2 sm:p-3 rounded-2xl bg-surface-container-high/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                <div className="flex flex-col md:flex-row items-center gap-space-sm">
                  <div className="relative flex-1 w-full flex items-center">
                    <div className="absolute left-4 flex items-center gap-2 pointer-events-none text-secondary">
                      <span className="material-symbols-outlined text-[20px] animate-pulse">
                        auto_awesome
                      </span>
                    </div>
                    <input className="w-full h-12 pl-12 pr-12 rounded-xl bg-surface-container-lowest/90 text-on-surface placeholder:text-outline-variant font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-inner" id="copilotInput" placeholder="Ask Aura to re-pace schedule, negotiate vendor bids, or simulate weather contingencies..." type="text" />
                    <button className="absolute right-3 p-1.5 rounded-lg bg-surface-container-high text-on-surface hover:text-secondary-fixed transition-colors" onClick={(e) => { submitCopilotQuery() }} title="Send Prompt" type="button">
                      <span className="material-symbols-outlined text-[18px]">
                        north_east
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                    <button className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-secondary-fixed to-secondary text-on-secondary-fixed font-label-lg text-label-lg font-semibold shadow-[0_0_20px_rgba(240,225,195,0.3)] hover:brightness-105 active:scale-95 transition-all" id="syncBtn" onClick={(e) => { handleMasterSync() }} type="button">
                      <span className="material-symbols-outlined text-[18px]" id="syncIcon">
                        sync_alt
                      </span>
                      <span id="syncText">
                        Sync to Master Schedule
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-2.5 px-2">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                    Suggested Queries:
                  </span>
                  <button className="text-xs px-2.5 py-1 rounded-lg bg-surface-container-lowest/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors font-body-sm text-body-sm" onClick={(e) => { insertPrompt('Simulate rain contingency for west lawn cocktail') }} type="button">
                    “Simulate rain contingency for west lawn”
                  </button>
                  <button className="text-xs px-2.5 py-1 rounded-lg bg-surface-container-lowest/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors font-body-sm text-body-sm" onClick={(e) => { insertPrompt('Negotiate floral line item to save $1,200') }} type="button">
                    “Optimize floral package spend by 10%”
                  </button>
                  <button className="text-xs px-2.5 py-1 rounded-lg bg-surface-container-lowest/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors font-body-sm text-body-sm" onClick={(e) => { insertPrompt('Draft VIP invitation text for Julian & Maya') }} type="button">
                    “Draft VIP wine pairing notes”
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      </>
  )
}
