import { memo } from 'react'

function BudgetKPIsComponent({ totalBudget = 75000 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md animate-fade-up stagger-2">
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low/70 p-6 shadow-xl flex flex-col justify-between">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              Total Allocated Capital
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                ${totalBudget.toLocaleString()}
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                / ${totalBudget.toLocaleString()} Cap
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-[22px]">
              account_balance_wallet
            </span>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex justify-between items-center font-label-md text-label-md">
            <span className="text-secondary-fixed">
              100% Mathematical Precision
            </span>
            <span className="text-outline">
              Within Target Envelope
            </span>
          </div>
          <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
            <div className="h-full bg-gradient-to-r from-primary to-secondary-fixed rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-surface-container-low/70 p-6 shadow-xl flex flex-col justify-between">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
              Unallocated Reserve
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-xl text-headline-xl text-secondary-fixed tracking-tight">
                $26,750
              </span>
              <span className="font-label-caps text-label-caps text-secondary-fixed-dim uppercase bg-secondary-container/40 px-2 py-0.5 rounded">
                Liquid
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary-fixed shadow-sm">
            <span className="material-symbols-outlined text-[22px]">
              shield_with_heart
            </span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between font-label-md text-label-md text-on-surface-variant pt-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Contingency Buffer Safe
          </span>
          <span className="text-on-surface font-semibold">
            35.7% Discretionary
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-surface-container-low/70 p-6 shadow-xl flex flex-col justify-between">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-tertiary-container/15 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-tertiary uppercase tracking-wider">
              Aura Algorithmic Yield
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-xl text-headline-xl text-tertiary tracking-tight">
                $8,400
              </span>
              <span className="font-label-md text-label-md text-emerald-400 font-medium">
                (+11.2% Eff.)
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary shadow-sm">
            <span className="material-symbols-outlined text-[22px]">
              savings
            </span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between font-label-md text-label-md">
          <span className="text-on-surface-variant">
            3 Active Contract Reductions
          </span>
          <span className="text-secondary-fixed underline cursor-pointer hover:opacity-80">
            Audit Audit Log
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(BudgetKPIsComponent)
