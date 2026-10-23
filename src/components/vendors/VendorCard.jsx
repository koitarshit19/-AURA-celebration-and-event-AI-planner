import { useState, memo } from 'react'
import Icon from '../Icon.jsx'
import { getCategoryImage, getCategoryIcon } from '../../utils/categories.js'

function VendorCardComponent({ vendor, eventName, city, onAskCopilot }) {
  const [copied, setCopied] = useState(false)
  const status = vendor.status || 'Shortlisted'
  const isBooked = status.toLowerCase().includes('book')
  const isNeg = status.toLowerCase().includes('neg') || status.toLowerCase().includes('review')
  const imageSrc = getCategoryImage(vendor.category)
  const iconName = getCategoryIcon(vendor.category)

  const handleCopyAgreement = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <article className="vendor-card group relative bg-surface-container/70 backdrop-blur-2xl rounded-2xl p-space-lg shadow-[0_20px_40px_rgba(0,0,0,0.45)] hover:shadow-[0_28px_60px_rgba(0,0,0,0.6)] transition-all duration-300 border border-white/[0.05]">
      <div className="flex flex-col lg:flex-row gap-space-lg items-start">
        {/* Media column */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-space-sm">
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-surface-container-high">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt={vendor.title || vendor.name}
              src={imageSrc}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/[0.08]">
              <Icon name={iconName} className="text-secondary-fixed text-[14px]" />
              <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                {vendor.category || 'Vendor Category'}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-on-surface/90 bg-surface-container-high/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px]">
                {city}
              </span>
              <span className="font-label-caps text-label-caps text-secondary-fixed bg-surface-container-high/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px]">
                {status}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant px-1">
            <span>Milestone SLA Tracked</span>
            <span className="text-secondary-fixed font-semibold">
              ${(vendor.allocated || 8500).toLocaleString()} USD
            </span>
          </div>
        </div>

        {/* Details Column */}
        <div className="flex-1 flex flex-col justify-between self-stretch gap-space-md">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-space-xs">
              <div className="flex items-center gap-space-sm flex-wrap">
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  {vendor.title || vendor.name}
                </h3>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high/90 shadow-sm border border-white/[0.06]">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isBooked
                        ? 'bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)]'
                        : isNeg
                        ? 'bg-primary shadow-[0_0_8px_rgba(192,193,255,0.8)]'
                        : 'bg-tertiary'
                    }`}
                  />
                  <span
                    className={`font-label-caps text-label-caps font-semibold tracking-wider uppercase ${
                      isBooked
                        ? 'text-secondary-fixed'
                        : isNeg
                        ? 'text-primary'
                        : 'text-tertiary'
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="font-headline-sm text-headline-sm text-on-surface">
                  ${(vendor.allocated || 8500).toLocaleString()}{' '}
                  <span className="font-body-md text-body-md text-on-surface-variant font-normal">
                    / Target
                  </span>
                </div>
                <span className="font-label-caps text-label-caps text-secondary-fixed">
                  Allocated to {vendor.category}
                </span>
              </div>
            </div>

            {/* Badges / Rating */}
            <div className="flex flex-wrap items-center gap-space-md mt-1 text-xs">
              <div className="flex items-center gap-1 text-secondary-fixed">
                <Icon name="star" className="text-[18px]" fill />
                <span className="font-headline-sm text-[15px] font-bold text-on-surface">4.95</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  (Aura Luminary Verified)
                </span>
              </div>
              <div className="h-3 w-px bg-surface-variant" />
              <div className="flex items-center gap-1.5 text-secondary-fixed-dim">
                <Icon name="verified_user" className="text-[16px] text-secondary" />
                <span className="font-label-md text-label-md text-secondary-fixed-dim">
                  Escrow Protection Active
                </span>
              </div>
              <div className="h-3 w-px bg-surface-variant" />
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Calibrated for {eventName}
              </span>
            </div>

            {/* SLA Description */}
            <p className="mt-space-sm font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">SLA Requirement:</strong>{' '}
              {vendor.sla || 'Professional multi-phase execution guaranteed with zero audio/aesthetic disruption.'}
            </p>
          </div>

          {/* AI recommendation snippet */}
          <div className="p-space-sm rounded-xl bg-surface-container-lowest/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] flex flex-col md:flex-row md:items-center justify-between gap-space-sm border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-[0_0_12px_rgba(192,193,255,0.2)]">
                <Icon name="smart_toy" className="text-[20px]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Aura AI Procurement Recommendation
                  </span>
                  <span className="font-label-caps text-label-caps text-secondary-fixed bg-secondary-container/40 px-1.5 py-0.5 rounded">
                    Autonomous
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {vendor.recommended || 'Verify early soundcheck and power tie-in 2 hours before guest arrivals.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
              <button
                onClick={() => onAskCopilot(vendor)}
                className="px-3.5 py-1.5 rounded-lg bg-primary-container/20 hover:bg-primary-container/30 text-primary font-label-md text-label-md transition-all flex items-center gap-1.5 border border-primary/20 cursor-pointer"
                type="button"
              >
                <Icon name="chat" className="text-[16px]" />
                <span>AI Negotiate</span>
              </button>

              <button
                onClick={handleCopyAgreement}
                className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer"
                type="button"
              >
                <Icon name={copied ? 'check' : 'description'} className="text-[16px]" />
                <span>{copied ? 'SLA Saved' : 'View Agreement'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default memo(VendorCardComponent)
