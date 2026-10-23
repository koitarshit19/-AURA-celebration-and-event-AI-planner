import { memo } from 'react'
import Icon from '../Icon.jsx'

function VendorSecurityBannerComponent({ vendorCount = 6, onAskStrategist }) {
  return (
    <aside className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container-low p-space-md sm:p-space-lg shadow-[0_24px_48px_rgba(0,0,0,0.5)] border border-white/[0.06]">
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-72 h-32 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md w-full lg:w-auto">
          <div className="relative shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-surface-container-highest shadow-[0_0_24px_rgba(192,193,255,0.3)]">
            <Icon name="psychology" className="text-primary text-[26px]" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-secondary-fixed shadow-[0_0_10px_rgba(240,225,195,1)]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest font-semibold">
                Live Enclave Guard
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Auto-Escrow sync enabled
              </span>
            </div>
            <p className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
              Aura Agent is monitoring cancellation policies, sound permits, and milestone payments for {vendorCount} suppliers.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-space-sm w-full lg:w-auto justify-end shrink-0">
          <button
            onClick={onAskStrategist}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary-fixed to-secondary text-on-secondary-fixed font-label-lg text-label-lg shadow-[0_0_24px_rgba(211,197,168,0.3)] hover:brightness-105 active:scale-[0.985] transition-all flex items-center gap-2 font-semibold cursor-pointer"
            type="button"
          >
            <Icon name="support_agent" className="text-[18px]" />
            <span>Ask Vendor Strategist</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default memo(VendorSecurityBannerComponent)
