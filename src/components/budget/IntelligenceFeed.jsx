import { useState } from 'react'
import { STRATEGIC_OPTIMIZATION_TIPS } from '../../data/budgetData.js'

export default function IntelligenceFeed() {
  const [flowerApplied, setFlowerApplied] = useState(false)

  return (
    <div className="lg:col-span-5 flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
            psychology
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Strategic Intelligence
          </h2>
        </div>
        <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
          Aura Optimization
        </span>
      </div>

      <div className="flex flex-col gap-space-sm">
        {STRATEGIC_OPTIMIZATION_TIPS.map((tip) => {
          if (tip.isActionable) {
            return (
              <div
                key={tip.id}
                className={`p-5 rounded-xl bg-surface-container-high/60 shadow-xl relative overflow-hidden flex flex-col gap-3 transition-all ${
                  flowerApplied ? 'opacity-80' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary-fixed shrink-0">
                      <span className="material-symbols-outlined text-[16px]">
                        {tip.icon}
                      </span>
                    </div>
                    <span className="font-headline-sm text-headline-sm text-on-surface">
                      {tip.title}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-secondary-container/50 text-secondary-fixed font-label-caps text-label-caps font-bold tracking-wider uppercase shrink-0">
                    {tip.badge}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Scheduling{' '}
                  <strong className="text-on-surface">
                    St. Helena Botanicals
                  </strong>{' '}
                  delivery at 08:30 AM rather than 11:00 AM avoids regional transit congestion surcharges and dock holding fees.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-body-sm text-body-sm text-outline">
                    {flowerApplied ? 'Applied to ledger' : tip.footerText}
                  </span>
                  <button
                    type="button"
                    disabled={flowerApplied}
                    onClick={() => setFlowerApplied(true)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-label-md text-label-md transition-all shadow-md cursor-pointer ${
                      flowerApplied
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim active:scale-95'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {flowerApplied ? 'check' : 'done'}
                    </span>
                    <span>{flowerApplied ? 'Applied' : '1-Click Accept'}</span>
                  </button>
                </div>
              </div>
            )
          }

          return (
            <div
              key={tip.id}
              className="p-5 rounded-xl bg-surface-container-low/70 shadow-lg relative overflow-hidden flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${tip.iconBg} flex items-center justify-center shrink-0`}>
                    <span className="material-symbols-outlined text-[16px]">
                      {tip.icon}
                    </span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    {tip.title}
                  </span>
                </div>
                <span className={`px-2.5 py-1 rounded ${tip.badgeCls} font-label-caps text-label-caps font-bold tracking-wider uppercase shrink-0`}>
                  {tip.badge}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {tip.desc}
              </p>
              <div className="flex items-center justify-between text-body-sm text-outline pt-1">
                <span className="flex items-center gap-1 font-label-caps uppercase">
                  <span className="material-symbols-outlined text-[14px] text-emerald-400">
                    verified
                  </span>{' '}
                  {tip.footerText}
                </span>
                {tip.footerStatus ? (
                  <span className="text-secondary-fixed-dim">
                    {tip.footerStatus}
                  </span>
                ) : (
                  <button type="button" className="text-primary hover:underline font-label-md text-label-md cursor-pointer">
                    {tip.linkText}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
