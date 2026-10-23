import { memo } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'

const labelCaps = 'font-label-caps text-label-caps'

function GalleryConciergeSectionComponent() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch animate-fade-up stagger-6">
      <div className="lg:col-span-8 rounded-2xl aura-surface-card p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group">
        <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden mb-4">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Napa Valley vineyard gala at twilight with glowing lights and candlelit tables"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJOKlmemOeoIjVopCAvfvZPnwbr837PEWHdxxMWRmMtBIhpoZLbI3LedAtZVxDXuN65GiTr-gVuka5KwbwVU-At6wijE9CBb5pZBXJLo2jXo13I3Xgx0Hons0a8J7983yiwqKLJXqSE-0Zd0lPL1Y5SSsv9L2cKgdoY1GubzEGZp71I_gublIUrns9mtGKB7QOUJf9abdu_DAaytQGhDTPLyBJd6QLSDa_JOyrDn1oGiepQR1kuJ1PsQ"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/35 to-transparent" />
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2 px-3 py-1 rounded-full bg-surface-dim/85 backdrop-blur-md border border-white/10">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
            <span className={`${labelCaps} text-secondary-fixed uppercase tracking-wider`}>
              Live Aesthetic Simulation
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Meadowood Pavilion • Twilight Transition
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Computed lux level: 18.4 lumens (Warm Gold &amp; Nocturne Indigo)
              </span>
            </div>
            <Link
              to="/ambience-studio"
              className="px-4 py-2 rounded-xl bg-surface-container-high/90 hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md backdrop-blur-md border border-white/10 transition-all shrink-0 self-start sm:self-auto flex items-center gap-1.5"
            >
              <span>Launch Studio</span>
              <Icon name="arrow_forward" className="text-[15px]" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
          {[
            ['Color Temperature', '2,400K Sunset Glow', 'wb_incandescent'],
            ['Spatial Audio Track', 'Nocturne Cello Suite', 'spatial_audio'],
            ['Fragrance Diffusion', 'Cedar & Wild Fig', 'air'],
          ].map(([k, v, ic]) => (
            <div
              key={k}
              className="p-3 rounded-xl bg-surface-container-high/45 border border-white/[0.04] flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary-fixed shrink-0">
                <Icon name={ic.toLowerCase()} className="text-[17px]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`${labelCaps} text-outline truncate`}>{k}</span>
                <span className="font-label-lg text-label-lg text-on-surface truncate">{v}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 rounded-2xl aura-surface-card p-5 sm:p-6 flex flex-col justify-between gap-5">
        <div className="flex flex-col gap-1.5">
          <span className={`${labelCaps} text-secondary-fixed uppercase tracking-wider`}>
            Geographic Enclave
          </span>
          <h4 className="font-headline-sm text-headline-sm text-on-surface">
            Estate Coordinates &amp; Ingress
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            St. Helena, Napa Valley, CA. Precision geo-fence active for vendor delivery tracking and authorized guest digital valet cards.
          </p>
        </div>
        <div
          className="w-full h-44 rounded-xl bg-cover bg-center relative overflow-hidden shadow-md group"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIdwZKdwptAS2ogFHqIdVsadGnQP7W8z-jdlnYJZgi6Vk4e1eCwjwLswiK7llrHlF4yPXXCdm1n-Q2YCl7cgBk61XDoTb6p9MqF5VRpQWNqZnBRl-i8nzFW6c0TIG8ZpBcirp3HAlwS_ksqG6PKzEoqG4YPpjFdVwFFuvAt1ILeYwiCc5VpqlWsBQX9spTe_1xtmtlzUye6RP4CWndjPHZw0zeODcf8fqJHk5r4T2d_1i5fVxPNOXj2w')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/90 via-surface-dim/25 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="pin_drop" className="text-secondary-fixed text-[20px]" />
              <span className="font-label-md text-label-md text-on-surface font-medium">
                Estate Gate 2 • East Vineyard Lawn
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest/80 text-secondary-fixed font-label-caps text-label-caps">
              GPS LOCKED
            </span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-high/75 border border-white/[0.06] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/60 border border-secondary-fixed/20 flex items-center justify-center text-secondary-fixed shrink-0">
              <Icon name="support_agent" className="text-[20px]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-on-surface font-medium truncate">
                Dedicated VIP Concierge
              </span>
              <span className="font-body-sm text-body-sm text-secondary-fixed-dim truncate">
                Arthur Vance • 24/7 Available
              </span>
            </div>
          </div>
          <Link
            to="/concierge-support"
            title="Contact Concierge"
            className="px-3 py-2 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md transition-all flex items-center gap-1.5 shrink-0"
          >
            <Icon name="chat" className="text-[17px]" />
            <span className="hidden sm:inline">Connect</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default memo(GalleryConciergeSectionComponent)
