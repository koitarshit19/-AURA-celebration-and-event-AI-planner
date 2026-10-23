import { useState } from 'react'

export default function ExpenseModal({ isOpen, onClose }) {
  const [vendor, setVendor] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('culinary')
  const [milestone, setMilestone] = useState('')
  const [submitText, setSubmitText] = useState('Commit to Ledger')
  const [isScanning, setIsScanning] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitText('Processing OCR...')
    setIsScanning(true)

    setTimeout(() => {
      setSubmitText('Committed!')
      setTimeout(() => {
        setIsScanning(false)
        setSubmitText('Commit to Ledger')
        setVendor('')
        setAmount('')
        setMilestone('')
        onClose()
      }, 700)
    }, 800)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="expense-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
    >
      <div className="relative w-full max-w-lg rounded-xl bg-surface-container-low p-6 sm:p-8 shadow-[0_24px_48px_rgba(0,0,0,0.8)] border-0 flex flex-col gap-space-md animate-scale-in">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
              Fast Procurement
            </span>
            <h3 id="expense-modal-title" className="font-headline-md text-headline-md text-on-surface">
              Add Expense & OCR Ingestion
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close expense modal"
            className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="relative group cursor-pointer flex flex-col items-center justify-center gap-2 p-6 rounded-xl bg-surface-container/50 hover:bg-surface-container-high/60 transition-all text-center">
          <input
            accept=".pdf,.png,.jpg,.jpeg"
            aria-label="Upload invoice or receipt document for OCR processing"
            className="absolute inset-0 opacity-0 cursor-pointer"
            type="file"
            onChange={() => {
              setVendor('St. Helena Vineyard Estate & Cellars')
              setAmount('4850.00')
              setMilestone('Milestone II: Wine Barrel Aging Reserve')
            }}
          />
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[26px]">
              document_scanner
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg text-on-surface">
              Drop invoice or tap to scan
            </span>
            <span className="font-body-sm text-body-sm text-outline">
              Aura AI extracts line items, VAT, and vendor bank keys instantly
            </span>
          </div>
          <span className="font-label-caps text-label-caps text-secondary-fixed uppercase bg-secondary-container/30 px-2.5 py-0.5 rounded-full mt-1">
            PDF, TIFF, JPEG accepted
          </span>
        </div>

        <form className="flex flex-col gap-space-sm" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="expense-vendor-input" className="font-label-md text-label-md text-on-surface-variant">
              Vendor / Payee Entity
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-[18px] text-outline">
                business
              </span>
              <input
                id="expense-vendor-input"
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container text-on-surface placeholder:text-outline-variant font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Vintage Stemware Rentals Co."
                type="text"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="flex flex-col gap-1">
              <label htmlFor="expense-amount-input" className="font-label-md text-label-md text-on-surface-variant">
                Expense Amount ($)
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-[18px] text-outline">
                  attach_money
                </span>
                <input
                  id="expense-amount-input"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container text-on-surface placeholder:text-outline-variant font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="2450.00"
                  step="0.01"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="expense-category-select" className="font-label-md text-label-md text-on-surface-variant">
                Category Envelope
              </label>
              <select
                id="expense-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-3 rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="culinary">Food & Culinary Service</option>
                <option value="entertainment">Entertainment & Production</option>
                <option value="florals">Florals & Decor</option>
                <option value="venue">Venue & Grounds</option>
                <option value="photo">Photography & Film</option>
                <option value="contingency">Contingency Reserve</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="expense-milestone-input" className="font-label-md text-label-md text-on-surface-variant">
              Escrow Condition / Milestone Trigger
            </label>
            <input
              id="expense-milestone-input"
              className="w-full h-11 px-4 rounded-lg bg-surface-container text-on-surface placeholder:text-outline-variant font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="e.g. Disburse upon delivery confirmation"
              type="text"
              value={milestone}
              onChange={(e) => setMilestone(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-2">
            <button
              className="px-4 py-2.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg transition-colors cursor-pointer"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              disabled={isScanning}
              className="px-6 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary shadow-md transition-all cursor-pointer disabled:opacity-75"
              type="submit"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
