import { useState } from 'react'
import { useAura } from '../context/AuraContext.jsx'
import BudgetKPIs from '../components/budget/BudgetKPIs.jsx'
import CategoryBreakdownList from '../components/budget/CategoryBreakdownList.jsx'
import IntelligenceFeed from '../components/budget/IntelligenceFeed.jsx'
import DisbursalLedgerTable from '../components/budget/DisbursalLedgerTable.jsx'
import ExpenseModal from '../components/budget/ExpenseModal.jsx'

export default function Budget() {
  const { activePlan } = useAura()
  const [modalOpen, setModalOpen] = useState(false)
  const [exported, setExported] = useState(false)

  const plan = activePlan || {}
  const eventName = plan.eventName || "Julian & Maya's Autumn Gala"
  const totalBudget = plan.budget || 75000
  const budgetBreakdown = plan.budgetBreakdown || []

  const handleExportStatement = () => {
    setExported(true)
    setTimeout(() => setExported(false), 2500)
  }

  return (
    <>
      <div className="flex flex-col w-full animate-fade-up">
        <div className="max-w-7xl mx-auto w-full px-margin-sm lg:px-margin py-space-lg flex flex-col gap-space-xl">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg animate-fade-up stagger-1">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <div className="flex flex-wrap items-center gap-space-sm">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-secondary-fixed font-label-caps text-label-caps uppercase tracking-widest shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)] animate-ping" />
                  {' '}
                  Real-Time Escrow Active
                </span>
                <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
                  Protocol 0x89A · Luminary Vault
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface tracking-tight">
                Financial Ledger{' '}
                <span className="text-outline-variant font-light">&</span>{' '}
                Procurement Engine
              </h1>
              <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant">
                Algorithmic allocation tracking, automated contractual disbursements, and predictive vendor savings calibrated for {eventName}.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-space-sm sm:gap-space-md shrink-0">
              <button
                type="button"
                onClick={handleExportStatement}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-container-high/80 text-on-surface hover:text-secondary-fixed hover:bg-surface-container-highest transition-all shadow-md group cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-secondary-fixed transition-colors">
                  {exported ? 'check_circle' : 'description'}
                </span>
                <span className="font-label-lg text-label-lg">
                  {exported ? 'Statement Exported' : 'Export Statement'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="relative group flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-container to-primary text-on-primary font-label-lg text-label-lg shadow-[0_0_24px_rgba(192,193,255,0.25)] hover:shadow-[0_0_32px_rgba(192,193,255,0.45)] active:scale-[0.985] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  add_circle
                </span>
                <span>Add Expense</span>
                <span className="ml-1 text-[11px] px-1.5 py-0.5 rounded bg-black/20 font-label-caps uppercase">
                  OCR Sync
                </span>
              </button>
            </div>
          </div>

          {/* Top 3 KPI Cards */}
          <BudgetKPIs totalBudget={totalBudget} />

          {/* Two-Column: Category Breakdown & Strategic Intelligence */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            <CategoryBreakdownList
              budgetBreakdown={budgetBreakdown}
              totalBudget={totalBudget}
            />
            <IntelligenceFeed />
          </div>

          {/* Escrow Disbursal & Contract Ledger Table */}
          <DisbursalLedgerTable />

          {/* Autonomous Escrow Guarantee Banner */}
          <div className="rounded-xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary-fixed shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-[26px]">token</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  Autonomous Escrow Guarantee
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Funds in Escrow are secured in insured FDIC-partnered trusts and cannot disburse without biometric host sign-off or fulfilled IoT sensor triggers.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-md shrink-0">
              <span className="font-label-caps text-label-caps text-secondary-fixed uppercase bg-secondary-container/30 px-3 py-1.5 rounded-lg">
                Encryption Standard: AES-256-GCM
              </span>
            </div>
          </div>
        </div>

        {/* Modal */}
        <ExpenseModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </>
  )
}
