import { useState, useMemo } from 'react'
import { INITIAL_LEDGER_TRANSACTIONS } from '../../data/budgetData.js'

export default function DisbursalLedgerTable() {
  const [filter, setFilter] = useState('all') // 'all' | 'escrow' | 'released'
  const [transactions] = useState(INITIAL_LEDGER_TRANSACTIONS)

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions
    return transactions.filter((t) => t.statusType === filter)
  }, [filter, transactions])

  return (
    <div className="flex flex-col gap-space-md mt-space-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-fixed text-[22px]">
              gavel
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Escrow Disbursal & Contract Ledger
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Cryptographically sealed milestone disbursements and automated vendor retention guarantees.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto bg-surface-container p-1 rounded-xl shadow-inner">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-surface-container-highest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All Ledger
          </button>
          <button
            type="button"
            onClick={() => setFilter('escrow')}
            className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
              filter === 'escrow'
                ? 'bg-surface-container-highest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Protected (Escrow)
          </button>
          <button
            type="button"
            onClick={() => setFilter('released')}
            className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
              filter === 'released'
                ? 'bg-surface-container-highest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Released
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-xl bg-surface-container-low/70 shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-surface-container-high/60 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              <th className="py-4 px-5">Execution Date</th>
              <th className="py-4 px-5">Vendor & Legal Entity</th>
              <th className="py-4 px-5">Category</th>
              <th className="py-4 px-5">Contract Milestone</th>
              <th className="py-4 px-5 text-right">Amount</th>
              <th className="py-4 px-5 text-center">Status</th>
              <th className="py-4 px-5 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 font-body-md text-body-md">
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-surface-container transition-colors">
                <td className="py-4 px-5 text-on-surface-variant whitespace-nowrap">
                  <span className="text-on-surface font-medium">{tx.date}</span>
                  <span className="block text-[11px] text-outline">{tx.subDate}</span>
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center ${tx.iconColor}`}>
                      <span className="material-symbols-outlined text-[18px]">
                        {tx.categoryIcon}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-on-surface">{tx.vendor}</span>
                      <span className="text-[11px] text-outline">{tx.contractRef}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-5">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-label-md bg-surface-container text-on-surface-variant">
                    {tx.category}
                  </span>
                </td>
                <td className="py-4 px-5">
                  <span className="text-on-surface">{tx.milestone}</span>
                </td>
                <td className="py-4 px-5 text-right font-semibold text-on-surface">
                  ${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-5 text-center">
                  {tx.statusType === 'released' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-label-caps text-label-caps uppercase font-bold tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Released
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary font-label-caps text-label-caps uppercase font-bold tracking-wider shadow-[0_0_8px_rgba(192,193,255,0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Protected (Escrow)
                    </span>
                  )}
                </td>
                <td className="py-4 px-5 text-right">
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    title={tx.statusType === 'released' ? 'View Verification Hash' : 'Lock Condition Terms'}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {tx.statusType === 'released' ? 'verified_user' : 'lock'}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
