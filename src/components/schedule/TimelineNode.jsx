import { memo } from 'react'
import Icon from '../Icon.jsx'

function TimelineNodeComponent({ item, idx, isLast }) {
  const isDayOf = (item.phase || '').toLowerCase().includes('day-of')

  return (
    <div className="relative flex gap-space-md group">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 to-surface-container-highest" />
      )}

      {/* Node Dot */}
      <div className="relative shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container-high border border-white/[0.08] group-hover:border-primary/50 transition-colors shadow-md z-10">
        <Icon
          name={isDayOf ? 'schedule' : 'flag'}
          className="text-secondary-fixed text-[20px]"
        />
        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary" />
      </div>

      {/* Content Card */}
      <div className="flex-1 p-space-md rounded-2xl bg-surface-container-low/80 backdrop-blur-xl shadow-lg border border-white/[0.04] group-hover:bg-surface-container/90 transition-all duration-300">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-space-xs">
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-label-caps uppercase text-secondary-fixed font-semibold px-2 py-0.5 rounded bg-secondary-container/40">
              {item.timing || 'Phase Time'}
            </span>
            <span className="font-body-sm text-[12px] text-on-surface-variant font-medium">
              {item.phase || 'Milestone Track'}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 font-label-caps text-label-caps text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            <Icon name="check_circle" className="text-[13px]" />
            Algorithmic Lock
          </span>
        </div>

        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
          {item.title}
        </h3>

        <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
          {item.desc}
        </p>

        {/* Operational Cues Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-space-sm pt-space-xs border-t border-white/[0.04] text-xs">
          <div className="p-space-sm rounded-xl bg-surface-container-high/60 flex items-center gap-2.5">
            <Icon name="verified_user" className="text-[20px] text-secondary" />
            <div className="min-w-0">
              <p className="font-label-caps text-label-caps text-on-surface-variant truncate uppercase">
                Vendor SLA
              </p>
              <p className="font-label-md text-label-md text-on-surface truncate">
                Lock State Active
              </p>
            </div>
          </div>

          <div className="p-space-sm rounded-xl bg-surface-container-high/60 flex items-center gap-2.5">
            <Icon name="qr_code_2" className="text-[20px] text-tertiary" />
            <div className="min-w-0">
              <p className="font-label-caps text-label-caps text-on-surface-variant truncate uppercase">
                Event Key
              </p>
              <p className="font-label-md text-label-md text-on-surface truncate">
                #AURA-{1000 + idx}
              </p>
            </div>
          </div>

          <div className="p-space-sm rounded-xl bg-surface-container-high/60 flex items-center gap-2.5">
            <Icon name="timer" className="text-[20px] text-primary" />
            <div className="min-w-0">
              <p className="font-label-caps text-label-caps text-on-surface-variant truncate uppercase">
                Protocol Buffer
              </p>
              <p className="font-label-md text-label-md text-on-surface truncate">
                +15m Tolerance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(TimelineNodeComponent)
