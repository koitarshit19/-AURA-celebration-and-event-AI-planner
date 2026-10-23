import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'

const labelCaps = 'font-label-caps text-label-caps'

function EventHeroComponent({
  eventName,
  city,
  date,
  guestCount,
  budget,
}) {
  const [auth, setAuth] = useState('idle') // idle | loading | done
  const [snoozed, setSnoozed] = useState(false)

  const authorize = () => {
    setAuth('loading')
    setTimeout(() => setAuth('done'), 650)
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full -mt-20 pt-24 pb-10 lg:pb-12 overflow-hidden px-margin-sm lg:px-margin">
        <div className="absolute top-0 right-1/4 w-[540px] h-[540px] bg-tertiary-container/15 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 -left-20 w-[440px] h-[440px] bg-secondary-container/20 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          {/* Status bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 animate-fade-up stagger-1">
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md border border-white/[0.07] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)] animate-ping" />
              <span className={`${labelCaps} text-secondary-fixed tracking-widest uppercase`}>
                Autonomous Event State: Real-Time Sync
              </span>
              <span className={`hidden sm:inline ${labelCaps} text-outline-variant`}>•</span>
              <span className={`hidden sm:inline ${labelCaps} text-on-surface-variant uppercase`}>
                {city}
              </span>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low/90 backdrop-blur-md border border-primary/15">
                <Icon name="verified_user" className="text-primary text-[16px]" />
                <span className={`${labelCaps} text-primary tracking-wide uppercase`}>Aura AI Guard: Active</span>
              </div>
              <span className={`hidden sm:inline-block ${labelCaps} text-secondary-fixed/90 px-2.5 py-1 rounded-full bg-surface-container-low/60 border border-secondary-fixed/20 tabular-nums`}>
                {guestCount} Guests • ${budget.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Headline + Countdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end animate-fade-up stagger-2">
            <div className="lg:col-span-8 flex flex-col gap-space-sm">
              <span className={`${labelCaps} tracking-[0.22em] text-secondary-fixed uppercase`}>
                Autonomous Luminary Suite
              </span>
              <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface tracking-tight max-w-3xl">
                Plan the party,{' '}
                <span className="bg-gradient-to-r from-secondary-fixed via-primary to-tertiary bg-clip-text text-transparent">
                  not the stress.
                </span>
              </h1>
              <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Autonomous AI orchestration for {eventName} ({date}). High-fidelity scheduling, vendor micro-negotiations, and curated sensory balance under zero human friction.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <Link
                  to="/plan-overview"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-container to-primary text-on-primary font-label-lg text-label-lg font-semibold shadow-[0_6px_24px_rgba(128,131,255,0.3)] hover:shadow-[0_10px_32px_rgba(128,131,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <Icon name="auto_awesome" fill className="text-[18px]" />
                  <span>Explore Masterplan</span>
                </Link>
                <Link
                  to="/new-event"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-secondary-fixed to-secondary text-on-secondary-fixed font-label-lg text-label-lg font-semibold shadow-[0_6px_24px_rgba(240,225,195,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <Icon name="add" className="text-[18px]" />
                  <span>New Celebration Wizard</span>
                </Link>
                <Link
                  to="/schedule"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg border border-white/[0.07] hover:border-secondary-fixed/30 transition-all"
                >
                  <Icon name="schedule" className="text-[18px] text-secondary-fixed" />
                  <span>Live Run-of-Show</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <div className="p-5 rounded-2xl aura-surface-card flex flex-col gap-3.5 relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-secondary-fixed/10 blur-2xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-60" />
                <div className="flex items-center justify-between">
                  <span className={`${labelCaps} text-secondary-fixed-dim uppercase tracking-wider`}>
                    Countdown to Reception
                  </span>
                  <Icon name="hourglass_top" className="text-secondary-fixed text-[18px]" />
                </div>
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  {[
                    { n: '42', l: 'Days', nCls: 'text-on-surface', lCls: 'text-secondary-fixed', line: 'bg-secondary-fixed/80' },
                    { n: '14', l: 'Hours', nCls: 'text-on-surface', lCls: 'text-primary', line: 'bg-primary/80' },
                    { n: '28', l: 'Mins', nCls: 'text-secondary-fixed animate-pulse', lCls: 'text-on-surface-variant', line: 'bg-tertiary/80' },
                  ].map((c) => (
                    <div
                      key={c.l}
                      className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-high/85 border border-white/[0.05] shadow-sm relative hover:bg-surface-bright hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <span className={`font-headline-lg text-headline-lg font-semibold tracking-tight tabular-nums ${c.nCls}`}>
                        {c.n}
                      </span>
                      <span className={`${labelCaps} uppercase tracking-widest mt-0.5 ${c.lCls}`}>{c.l}</span>
                      <div className={`absolute bottom-1 w-6 h-0.5 rounded-full ${c.line}`} />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant pt-1 border-t border-white/[0.05]">
                  <span className="flex items-center gap-1.5 truncate">
                    <Icon name="location_on" className="text-secondary-fixed text-[15px]" />
                    {city}
                  </span>
                  <span className="text-secondary-fixed font-medium tabular-nums shrink-0">17:30 PST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI NEXT BEST ACTION */}
      {!snoozed && (
        <section className="relative w-full rounded-2xl aura-surface-card p-5 sm:p-6 lg:p-8 overflow-hidden animate-fade-up stagger-3">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-tertiary-container/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest border border-primary/25 flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(192,193,255,0.2)]">
                <Icon name="neurology" fill className="text-primary text-[28px]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`px-2.5 py-0.5 rounded-full bg-secondary-container/60 border border-secondary-fixed/20 text-secondary-fixed ${labelCaps} tracking-wider uppercase`}>
                    AI Copilot Recommendation
                  </span>
                  <span className="font-label-md text-label-md text-primary font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    Urgency: High / Cost-Vector Sensitive
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  Finalize Floral Installation Contract with St. Helena Botanicals
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Off-peak setup SLA locked: shifting load-in from 11:00 to 08:30 saves{' '}
                  <strong className="text-secondary-fixed">$1,850 in transit surcharges</strong>. Escrow
                  milestone 1 ($4,750) ready for one-tap authorization under Protocol 0x89A.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                type="button"
                onClick={authorize}
                disabled={auth !== 'idle'}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-secondary-fixed to-secondary text-on-secondary-fixed font-label-lg text-label-lg font-semibold shadow-[0_4px_24px_rgba(240,225,195,0.3)] hover:shadow-[0_6px_32px_rgba(240,225,195,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer disabled:opacity-80"
              >
                {auth === 'idle' && (
                  <>
                    <Icon name="verified_user" className="text-[18px]" />
                    <span>Authorize Escrow & Sign</span>
                  </>
                )}
                {auth === 'loading' && (
                  <>
                    <Icon name="progress_activity" className="text-[18px] animate-spin" />
                    <span>Signing via Vault...</span>
                  </>
                )}
                {auth === 'done' && (
                  <>
                    <Icon name="check_circle" className="text-[18px]" />
                    <span>Authorized & Disbursed</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setSnoozed(true)}
                className="px-4 py-3 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg border border-white/[0.05] transition-colors text-center cursor-pointer"
              >
                Snooze 24h
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default memo(EventHeroComponent)
