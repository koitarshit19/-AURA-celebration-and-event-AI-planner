import { useState, useMemo } from 'react'
import Icon from '../components/Icon.jsx'
import { useAura } from '../context/AuraContext.jsx'
import VendorFilterBar from '../components/vendors/VendorFilterBar.jsx'
import VendorCard from '../components/vendors/VendorCard.jsx'
import VendorSecurityBanner from '../components/vendors/VendorSecurityBanner.jsx'

/**
 * Vendors page component rendering real-time procurement directory,
 * SLA contract tracking, and negotiation intelligence.
 */
export default function Vendors() {
  const { activePlan, setCopilotOpen } = useAura()
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const plan = activePlan || {}
  const eventName = plan.eventName || "Julian & Maya's Autumn Gala"
  const city = plan.city || 'St. Helena & Napa Valley, CA'
  const vendorList = useMemo(() => plan.vendorChecklist || [], [plan.vendorChecklist])

  const filteredVendors = useMemo(() => {
    return vendorList.filter((v) => {
      const status = (v.status || '').toLowerCase()
      const matchesFilter =
        filter === 'all' ||
        (filter === 'booked' && status.includes('book')) ||
        (filter === 'negotiation' && (status.includes('neg') || status.includes('review'))) ||
        (filter === 'shortlisted' && status.includes('short'))

      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        (v.title || v.name || '').toLowerCase().includes(q) ||
        (v.category || '').toLowerCase().includes(q) ||
        (v.sla || '').toLowerCase().includes(q)

      return matchesFilter && matchesSearch
    })
  }, [vendorList, filter, searchQuery])

  const bookedCount = vendorList.filter((v) => (v.status || '').toLowerCase().includes('book')).length
  const negotiationCount = vendorList.filter((v) =>
    (v.status || '').toLowerCase().includes('neg') || (v.status || '').toLowerCase().includes('review')
  ).length
  const shortlistedCount = vendorList.filter((v) => (v.status || '').toLowerCase().includes('short')).length

  const handleAskCopilot = (v) => {
    setCopilotOpen(true)
    setTimeout(() => {
      const el = document.getElementById('aura-floating-input')
      if (el) {
        el.value = `Help me negotiate contract terms and check SLA details for ${v.title} (${v.category})`
        el.focus()
      }
    }, 100)
  }

  return (
    <div className="flex flex-col w-full animate-fade-up">
      <div className="max-w-7xl mx-auto px-margin-sm lg:px-margin py-space-lg w-full flex flex-col gap-space-xl">
        {/* HEADER SECTION */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md animate-fade-up stagger-1">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)]" aria-hidden="true" />
              <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest">
                Autonomous Procurement Engine
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface tracking-tight">
              Curated Vendor Directory &amp; Negotiation Hub
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Real-time contractual risk intelligence, rate benchmarks, and automated milestone governance calibrated for {eventName} in {city}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm sm:gap-space-md shrink-0">
            <div className="px-space-md py-space-sm rounded-xl bg-surface-container-low shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex items-center gap-3 border border-white/[0.04]">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary" aria-hidden="true">
                <Icon name="verified" className="text-[20px]" fill />
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  SLA Audits
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  100% Compliant
                </span>
              </div>
            </div>

            <div className="px-space-md py-space-sm rounded-xl bg-surface-container-low shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex items-center gap-3 border border-white/[0.04]">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary" aria-hidden="true">
                <Icon name="psychology" className="text-[20px]" />
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Vendor Network
                </span>
                <span className="font-headline-sm text-headline-sm text-primary">
                  {vendorList.length} Calibrated
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter bar */}
        <VendorFilterBar
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalCount={vendorList.length}
          bookedCount={bookedCount}
          negotiationCount={negotiationCount}
          shortlistedCount={shortlistedCount}
        />

        {/* Vendor cards list */}
        <div className="flex flex-col gap-space-lg animate-fade-up stagger-3" id="vendor-grid">
          {filteredVendors.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-surface-container/50 border border-white/[0.05]">
              <Icon name="search_off" className="text-4xl text-on-surface-variant mx-auto mb-2" aria-hidden="true" />
              <p className="text-on-surface text-lg font-medium">No vendors matched your query</p>
              <p className="text-on-surface-variant text-sm mt-1">Try switching tabs or resetting your search filter.</p>
            </div>
          ) : (
            filteredVendors.map((vendor, idx) => (
              <VendorCard
                key={vendor.id || idx}
                vendor={vendor}
                eventName={eventName}
                city={city}
                onAskCopilot={handleAskCopilot}
              />
            ))
          )}
        </div>

        {/* Bottom AI Enclave Guard banner */}
        <VendorSecurityBanner
          vendorCount={vendorList.length}
          onAskStrategist={() => setCopilotOpen(true)}
        />
      </div>
    </div>
  )
}