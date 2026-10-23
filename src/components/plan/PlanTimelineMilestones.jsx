import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'

function PlanTimelineMilestonesComponent({ timeline = [], eventName }) {
  const [expandedMilestone, setExpandedMilestone] = useState(null)

  return (
    <section className="space-y-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <div className="w-2.5 h-6 rounded-full bg-gradient-to-b from-primary to-secondary" />
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Master Orchestration Timeline &amp; Milestones
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Synthesized critical path with dated milestones and real-time vendor dependency mapping
            </p>
          </div>
        </div>
        <Link
          to="/schedule"
          className="flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-secondary-fixed transition-colors"
        >
          <span>Full Schedule</span>
          <Icon name="chevron_right" className="text-[18px]" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md" id="timelineGrid">
        {timeline.slice(0, 4).map((m, idx) => {
          const isExpanded = expandedMilestone === idx
          return (
            <div
              key={idx}
              className="group relative flex flex-col justify-between p-space-md rounded-2xl bg-surface-container/70 backdrop-blur-xl hover:bg-surface-container-high transition-all duration-300 shadow-[0_12px_28px_rgba(0,0,0,0.35)] cursor-pointer border border-white/[0.05]"
              onClick={() => setExpandedMilestone(isExpanded ? null : idx)}
            >
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest px-2 py-0.5 rounded bg-secondary-container/30 border border-secondary-fixed/20">
                    {m.timing || m.phase || `Milestone ${idx + 1}`}
                  </span>
                  <span className="inline-flex items-center text-primary text-[14px]">
                    <Icon name="check_circle" className="text-[18px]" />
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary-fixed transition-colors">
                  {m.title || m.milestone}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  {m.desc || m.description}
                </p>
              </div>

              <div className="mt-space-md pt-space-sm space-y-2 border-t border-white/[0.04]">
                <div className="flex items-center justify-between font-label-caps text-label-caps text-on-surface-variant">
                  <span>Phase State</span>
                  <span className="text-secondary-fixed font-semibold">
                    {m.status || 'Verified & Locked'}
                  </span>
                </div>
                <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary-fixed"
                    style={{ width: `${85 + idx * 5}%` }}
                  />
                </div>
                {isExpanded && (
                  <div className="pt-space-xs text-on-surface space-y-1 text-xs text-on-surface-variant">
                    <p>• Calibrated for {eventName}</p>
                    <p>• Automated milestone checklist active</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default memo(PlanTimelineMilestonesComponent)
