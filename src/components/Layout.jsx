import { NavLink, Link, Outlet } from 'react-router-dom'
import Icon from './Icon.jsx'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/new-event', label: 'New Event' },
  { to: '/plan-overview', label: 'Plan Overview' },
  { to: '/vendors', label: 'Vendors' },
  { to: '/ambience-studio', label: 'Ambience Studio' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/budget', label: 'Budget' },
  { to: '/concierge-support', label: 'Support / Concierge' },
]

const linkBase = 'px-3 py-1.5 rounded-lg transition-all font-label-md text-label-md'
const linkActive =
  'bg-surface-container-highest text-primary shadow-[0_0_16px_rgba(192,193,255,0.15)]'
const linkIdle =
  'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'

export default function Layout() {
  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md text-body-md antialiased selection:bg-primary-container selection:text-on-primary min-h-screen relative overflow-x-hidden">
      {/* background glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-tertiary-container/10 blur-[130px] rounded-full" />
        <div className="absolute top-[40%] -left-[15%] w-[600px] h-[600px] bg-primary/5 blur-[140px] rounded-full" />
        <div className="absolute top-[20%] -right-[15%] w-[650px] h-[650px] bg-secondary-container/15 blur-[150px] rounded-full" />
      </div>

      {/* header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-dim/80 backdrop-blur-2xl shadow-[0_16px_36px_rgba(0,0,0,0.45)]">
        <div className="h-20 max-w-7xl mx-auto px-margin-sm lg:px-margin flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-lg shrink-0">
            <Link to="/" className="flex items-center gap-space-sm group focus:outline-none">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container-high shadow-[0_0_24px_rgba(192,193,255,0.2)]">
                <Icon name="auto_awesome" className="text-primary text-[22px] transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 blur-sm -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-on-surface tracking-tight flex items-center gap-1.5">
                  Aura
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.8)]" />
                </span>
                <span className="font-label-caps text-label-caps text-secondary-fixed-dim uppercase tracking-wider -mt-1">
                  Autonomous Luminary
                </span>
              </div>
            </Link>
            <div className="hidden xl:flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container-high/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(211,197,168,0.9)]" />
              <span className="font-label-caps text-label-caps text-secondary-fixed tracking-widest uppercase">
                V2.4 LUMINARY CORE
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-surface-container-low/70 backdrop-blur-md">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
            <div className="hidden md:flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-xl bg-surface-container-low/80 hover:bg-surface-container-high transition-all cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
              <div className="flex flex-col text-right">
                <span className="text-[11px] font-semibold text-secondary-fixed truncate max-w-[170px]">
                  Julian &amp; Maya's Autumn Gala
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">T-Minus 42 Days</span>
              </div>
              <Icon name="expand_more" className="text-secondary text-[18px]" />
            </div>
            <button
              type="button"
              className="relative p-2 rounded-xl bg-surface-container-low/70 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all focus:outline-none"
            >
              <Icon name="notifications" className="text-[20px]" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,1)]" />
            </button>
            <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-secondary/50 via-primary/40 to-tertiary/20 shadow-[0_0_14px_rgba(211,197,168,0.25)]">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Icon name="person" className="text-on-primary text-[18px]" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-transparent min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>

      {/* footer */}
      <footer className="w-full bg-surface-container-lowest/90 backdrop-blur-xl mt-space-xl shadow-[0_-1px_12px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-margin-sm lg:px-margin py-space-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex flex-col sm:flex-row items-center gap-space-md">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface">Aura</span>
              <span className="font-label-caps text-label-caps text-secondary-fixed uppercase px-2 py-0.5 rounded bg-secondary-container/40">
                Nocturne Luminary
              </span>
            </div>
            <span className="hidden sm:inline text-outline-variant font-body-sm text-body-sm">|</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-center sm:text-left">
              © 2025 Aura Intelligence Ltd. All orchestrations secured &amp; verified.
            </p>
          </div>
          <div className="flex items-center gap-space-lg">
            <Link to="/concierge-support" className="font-label-md text-label-md text-on-surface-variant hover:text-secondary-fixed transition-colors">VIP Concierge</Link>
            <a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-secondary-fixed transition-colors">Protocol &amp; Privacy</a>
            <a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-secondary-fixed transition-colors">Security Enclave</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
