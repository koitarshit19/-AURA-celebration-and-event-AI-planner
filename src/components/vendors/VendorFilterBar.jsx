import { memo } from 'react'
import Icon from '../Icon.jsx'

function VendorFilterBarComponent({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  totalCount,
  bookedCount,
  negotiationCount,
  shortlistedCount,
}) {
  return (
    <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md bg-surface-container-low/70 backdrop-blur-2xl p-2 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.35)] border border-white/[0.05] animate-fade-up stagger-2">
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface-container-lowest">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
            filter === 'all'
              ? 'text-on-primary bg-primary-container shadow-[0_0_16px_rgba(192,193,255,0.25)]'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
          type="button"
        >
          All Vendors <span className="ml-1 opacity-80">({totalCount})</span>
        </button>

        <button
          onClick={() => setFilter('booked')}
          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
            filter === 'booked'
              ? 'text-on-primary bg-primary-container shadow-[0_0_16px_rgba(192,193,255,0.25)]'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
          type="button"
        >
          Booked{' '}
          <span className="ml-1 px-1.5 py-0.2 rounded-full bg-surface-container text-[11px] text-secondary-fixed">
            {bookedCount}
          </span>
        </button>

        <button
          onClick={() => setFilter('negotiation')}
          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
            filter === 'negotiation'
              ? 'text-on-primary bg-primary-container shadow-[0_0_16px_rgba(192,193,255,0.25)]'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
          type="button"
        >
          In Negotiation{' '}
          <span className="ml-1 px-1.5 py-0.2 rounded-full bg-surface-container text-[11px] text-primary">
            {negotiationCount}
          </span>
        </button>

        <button
          onClick={() => setFilter('shortlisted')}
          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
            filter === 'shortlisted'
              ? 'text-on-primary bg-primary-container shadow-[0_0_16px_rgba(192,193,255,0.25)]'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
          type="button"
        >
          Shortlisted{' '}
          <span className="ml-1 px-1.5 py-0.2 rounded-full bg-surface-container text-[11px] text-tertiary">
            {shortlistedCount}
          </span>
        </button>
      </div>

      <div className="flex items-center gap-space-sm px-2">
        <div className="relative flex-1 sm:w-64">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-surface-container text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-high shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] transition-all"
            placeholder="Search discipline, clause, name..."
            type="text"
          />
        </div>
      </div>
    </section>
  )
}

export default memo(VendorFilterBarComponent)
