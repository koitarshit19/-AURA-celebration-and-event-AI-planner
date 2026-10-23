import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest/90 backdrop-blur-xl mt-space-xl border-t border-outline-variant/15">
      <div className="max-w-7xl mx-auto px-margin-sm lg:px-margin py-8 flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex flex-col sm:flex-row items-center gap-space-sm sm:gap-space-md">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-on-surface">Aura</span>
            <span className="text-outline-variant">·</span>
            <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
              Nocturne Luminary
            </span>
          </div>
          <span className="hidden sm:inline text-outline-variant font-body-sm text-body-sm">|</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-center sm:text-left">
            © 2025 Aura Intelligence Ltd. All orchestrations secured &amp; verified.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-space-lg">
          <Link to="/plan-overview" className="font-label-md text-label-md text-on-surface-variant hover:text-secondary-fixed transition-colors">
            Masterplan
          </Link>
          <Link to="/vendors" className="font-label-md text-label-md text-on-surface-variant hover:text-secondary-fixed transition-colors">
            Vendor Hub
          </Link>
          <Link to="/concierge-support" className="font-label-md text-label-md text-on-surface-variant hover:text-secondary-fixed transition-colors">
            VIP Concierge
          </Link>
          <Link to="/sign-in" className="font-label-md text-label-md text-on-surface-variant hover:text-secondary-fixed transition-colors">
            Studio Portal
          </Link>
        </div>
      </div>
    </footer>
  )
}
