import { memo } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { getCategoryIcon } from '../../utils/categories.js'

const categoryColors = [
  'from-secondary-fixed to-secondary',
  'from-primary to-primary-container',
  'from-tertiary to-tertiary-container',
  'from-secondary to-secondary-fixed-dim',
  'from-primary-container to-primary',
  'from-emerald-400 to-emerald-600',
  'from-amber-300 to-amber-500',
  'from-indigo-400 to-indigo-600',
]

function PlanBudgetAllocationBarComponent({ budget = 75000, budgetBreakdown = [] }) {
  return (
    <section className="space-y-space-md">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-space-sm">
            <div className="w-2.5 h-6 rounded-full bg-secondary" />
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Budget Allocation &amp; Capital Flow
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Algorithmic spend distribution reconciling 100% of the ${budget.toLocaleString()} target threshold
          </p>
        </div>
        <div className="flex items-center gap-space-md">
          <div className="text-right">
            <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase">
              Total Disbursed &amp; Locked
            </span>
            <span className="font-headline-md text-headline-md text-secondary-fixed">
              ${budget.toLocaleString()}{' '}
              <span className="font-body-sm text-body-sm text-outline-variant font-normal">
                / ${budget.toLocaleString()} cap
              </span>
            </span>
          </div>
          <Link
            to="/budget"
            className="px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-secondary-fixed font-label-md text-label-md flex items-center gap-1.5 transition-colors border border-white/[0.06]"
          >
            <span>Ledger</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </Link>
        </div>
      </div>

      <div className="p-space-md rounded-2xl bg-surface-container/70 backdrop-blur-xl shadow-[0_16px_36px_rgba(0,0,0,0.4)] space-y-space-md border border-white/[0.05]">
        {/* Allocation Multi-Bar */}
        <div className="space-y-space-xs">
          <div className="flex items-center justify-between font-label-md text-label-md">
            <span className="text-on-surface flex items-center gap-2">
              <Icon name="pie_chart" className="text-[16px] text-secondary" />
              Category Allocation Breakdown
            </span>
            <span className="text-secondary-fixed font-semibold">
              100% Capitalized (${budget.toLocaleString()})
            </span>
          </div>

          <div className="w-full h-4 rounded-full bg-surface-container-highest overflow-hidden flex p-0.5 gap-0.5">
            {budgetBreakdown.map((cat, idx) => {
              const widthPct = `${Math.max(4, cat.percentage || (cat.amount / budget) * 100)}%`
              return (
                <div
                  key={idx}
                  className={`h-full bg-gradient-to-r ${categoryColors[idx % categoryColors.length]} transition-all duration-500 rounded-sm`}
                  style={{ width: widthPct }}
                  title={`${cat.category}: $${cat.amount?.toLocaleString()} (${cat.percentage}%)`}
                />
              )
            })}
          </div>
        </div>

        {/* Category breakdown item tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm pt-2">
          {budgetBreakdown.map((cat, idx) => {
            const iconName = getCategoryIcon(cat.category)
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-surface-container-high/60 border border-white/[0.04] flex items-center justify-between gap-3 hover:bg-surface-container-highest transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary-fixed shrink-0">
                    <Icon name={iconName} className="text-[18px]" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-label-md text-label-md text-on-surface font-medium truncate block">
                      {cat.category}
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant truncate block">
                      {cat.desc || `${cat.percentage}% of total`}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-label-md text-label-md text-on-surface font-semibold">
                    ${cat.amount?.toLocaleString()}
                  </div>
                  <span className="font-label-caps text-label-caps text-secondary-fixed">
                    {cat.percentage}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default memo(PlanBudgetAllocationBarComponent)
