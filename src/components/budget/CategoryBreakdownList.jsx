import { memo } from 'react'
import { getCategoryIcon } from '../../utils/categories.js'

function CategoryBreakdownListComponent({ budgetBreakdown = [], totalBudget = 75000 }) {
  return (
    <div className="lg:col-span-7 flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">
            donut_large
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Category Allocations
          </h2>
        </div>
        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
          Updated 4m ago
        </span>
      </div>
      <div className="flex flex-col gap-space-sm bg-surface-container-low/50 p-6 rounded-xl shadow-lg">
        {budgetBreakdown.map((cat, idx) => {
          const iconName = getCategoryIcon(cat.category)
          const pct = cat.percentage || Math.round((cat.amount / totalBudget) * 100)
          return (
            <div
              key={idx}
              className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    {iconName}
                  </span>
                  <span className="font-label-lg text-label-lg text-on-surface">
                    {cat.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-label-caps uppercase bg-primary-container/20 text-primary">
                    {pct}% Cap
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                    ${cat.amount?.toLocaleString()}
                  </span>
                  <span className="font-body-sm text-body-sm text-outline-variant">
                    / ${cat.amount?.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-primary to-secondary-fixed h-full rounded-full"
                  style={{ width: `${Math.min(100, Math.max(10, pct))}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-body-sm text-[11px] text-on-surface-variant mt-0.5">
                <span className="truncate pr-2">
                  {cat.desc || `${cat.category} verified & committed`}
                </span>
                <span className="text-secondary-fixed font-medium shrink-0">
                  Locked & Synced
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(CategoryBreakdownListComponent)
