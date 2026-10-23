import { memo } from 'react'
import Icon from '../Icon.jsx'

function PlanHeroBannerComponent({
  eventName,
  eventType,
  city,
  date,
  guestCount,
  budget,
  vibe,
  summary,
  vitalityScore,
  onCopyLink,
  copied,
  onExportPdf,
  exported,
  onSyncCloud,
  synced,
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-surface-container/80 backdrop-blur-2xl p-space-lg lg:p-space-xl shadow-[0_24px_64px_rgba(0,0,0,0.55)] border border-white/[0.06] animate-fade-up stagger-1">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
        <div className="space-y-space-md max-w-3xl">
          <div className="flex flex-wrap items-center gap-space-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-secondary-fixed font-label-caps text-label-caps uppercase tracking-widest shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping" />
              Autonomous Masterplan
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Typology: <strong className="text-on-surface">{eventType}</strong>
            </span>
            <span className="font-body-sm text-body-sm text-outline">•</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Vibe: <strong className="text-secondary-fixed">{vibe}</strong>
            </span>
          </div>

          <div>
            <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface tracking-tight">
              {eventName}
            </h1>
            <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant mt-2 leading-relaxed">
              {summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-on-surface-variant font-label-md text-label-md">
            <div className="flex items-center gap-1.5">
              <Icon name="location_on" className="text-secondary-fixed text-[18px]" />
              <span>{city}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="calendar_today" className="text-primary text-[18px]" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="groups" className="text-secondary-fixed text-[18px]" />
              <span>{guestCount} Guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="payments" className="text-primary text-[18px]" />
              <span>${budget.toLocaleString()} Cap</span>
            </div>
          </div>
        </div>

        {/* Vitality score + Action buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-stretch lg:items-end justify-between gap-space-md shrink-0">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface-container-high/80 border border-white/[0.08] shadow-lg">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-tr from-secondary-container to-surface-bright shadow-[0_0_20px_rgba(240,225,195,0.3)]">
              <span className="font-headline-lg text-headline-lg font-bold text-secondary-fixed tabular-nums">
                {vitalityScore}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps uppercase text-secondary-fixed tracking-wider">
                Aura Vitality
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Peak Alignment
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">
                100% Budget &amp; SLA Reconciled
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onCopyLink}
              className="px-3.5 py-2 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-all border border-white/[0.05] cursor-pointer"
              type="button"
            >
              <Icon name={copied ? 'check' : 'share'} className="text-[16px] text-secondary-fixed" />
              <span>{copied ? 'Copied' : 'Share Plan'}</span>
            </button>

            <button
              onClick={onExportPdf}
              className="px-3.5 py-2 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-all border border-white/[0.05] cursor-pointer"
              type="button"
            >
              <Icon name={exported ? 'check_circle' : 'picture_as_pdf'} className="text-[16px] text-primary" />
              <span>{exported ? 'Exported' : 'Export Brief'}</span>
            </button>

            <button
              onClick={onSyncCloud}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-primary-container to-primary text-on-primary font-label-md text-label-md flex items-center gap-1.5 shadow-[0_0_16px_rgba(192,193,255,0.25)] hover:brightness-110 active:scale-95 transition-all font-semibold cursor-pointer"
              type="button"
            >
              <Icon name={synced ? 'cloud_done' : 'cloud_sync'} className="text-[16px]" />
              <span>{synced ? 'Cloud Synced' : 'Sync to Cloud'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(PlanHeroBannerComponent)
