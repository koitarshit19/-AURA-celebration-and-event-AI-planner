import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { useAura } from '../../context/AuraContext.jsx'
import { navItems, initialNotifications } from '../../data/navigation.js'

const linkBase = 'px-3 py-1.5 rounded-lg transition-all duration-200 font-label-md text-label-md whitespace-nowrap shrink-0'
const linkActive = 'bg-surface-container-highest text-primary shadow-[0_0_16px_rgba(192,193,255,0.18)] border border-primary/25'
const linkIdle = 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/80 border border-transparent'

export default function Header() {
  const {
    user,
    signInWithGoogle,
    signOutUser,
    events,
    selectedEvent,
    setSelectedEvent,
    setCopilotOpen,
  } = useAura()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [eventMenuOpen, setEventMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)

  const unreadCount = notifications.filter((n) => n.unread).length

  const closeMenus = () => {
    setMobileMenuOpen(false)
    setEventMenuOpen(false)
    setNotifOpen(false)
    setUserMenuOpen(false)
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-dim/85 backdrop-blur-2xl border-b border-outline-variant/20 shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
        <div className="h-16 sm:h-20 max-w-7xl mx-auto px-margin-sm lg:px-margin flex items-center justify-between gap-space-md">
          {/* Brand Zone */}
          <div className="flex items-center gap-space-md shrink-0">
            <Link to="/" className="flex items-center gap-space-sm group focus:outline-none">
              <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container-high border border-primary/20 shadow-[0_0_24px_rgba(192,193,255,0.2)] transition-transform duration-300 group-hover:scale-105">
                <Icon name="auto_awesome" className="text-primary text-[20px] sm:text-[22px] transition-transform duration-500 group-hover:rotate-12" />
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/30 blur-sm -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-[20px] sm:text-headline-md text-on-surface tracking-tight whitespace-nowrap">
                  Aura
                </span>
                <span className="font-label-caps text-label-caps text-secondary-fixed-dim uppercase tracking-wider -mt-1 whitespace-nowrap">
                  Nocturne Luminary
                </span>
              </div>
            </Link>
          </div>

          {/* Primary Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-surface-container-low/80 border border-outline-variant/15 backdrop-blur-md">
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

          {/* Right Action Controls + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-space-sm shrink-0 relative">
            {/* Active Event Selector */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => {
                  setEventMenuOpen((v) => !v)
                  setNotifOpen(false)
                  setUserMenuOpen(false)
                }}
                aria-label="Switch active celebration event"
                aria-haspopup="true"
                aria-expanded={eventMenuOpen}
                className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-xl bg-surface-container-low/80 hover:bg-surface-container-high border border-outline-variant/20 transition-all cursor-pointer"
              >
                <div className="flex flex-col text-right">
                  <span className="text-[11px] font-semibold text-secondary-fixed truncate max-w-[160px] xl:max-w-[190px]">
                    {selectedEvent.name}
                  </span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant tabular-nums">
                    {selectedEvent.countdown || 'T-Minus 42 Days'}
                  </span>
                </div>
                <Icon
                  name="expand_more"
                  className={`text-secondary text-[18px] transition-transform duration-200 ${eventMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {eventMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl bg-surface-container border border-outline-variant/25 shadow-2xl p-2 z-50 animate-scale-in">
                  <div className="px-3 py-1.5 flex items-center justify-between border-b border-outline-variant/15 mb-1">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                      Active Celebrations
                    </span>
                    <span className="font-label-caps text-label-caps text-secondary-fixed">
                      {events.length} Active
                    </span>
                  </div>
                  {events.map((ev) => (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => {
                        setSelectedEvent(ev)
                        setEventMenuOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                        selectedEvent.id === ev.id
                          ? 'bg-surface-container-highest text-on-surface'
                          : 'hover:bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-label-md text-label-md text-on-surface font-semibold truncate">
                          {ev.name}
                        </div>
                        <div className="font-body-sm text-[11px] text-on-surface-variant truncate">
                          {ev.venue} · {ev.countdown || 'T-Minus 42 Days'}
                        </div>
                      </div>
                      {selectedEvent.id === ev.id && (
                        <Icon name="check_circle" className="text-secondary-fixed text-[16px] shrink-0" />
                      )}
                    </button>
                  ))}
                  <div className="mt-1 pt-1 border-t border-outline-variant/15">
                    <Link
                      to="/new-event"
                      onClick={closeMenus}
                      className="w-full px-3 py-2 rounded-lg text-primary hover:bg-primary/10 font-label-md text-label-md flex items-center gap-2 transition-colors"
                    >
                      <Icon name="add_circle" className="text-[16px]" />
                      <span>Create New Celebration Blueprint</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* AI Copilot Quick Button */}
            <button
              type="button"
              onClick={() => setCopilotOpen((v) => !v)}
              title="Open Aura Gemini AI Copilot"
              aria-label="Open Aura Gemini AI Copilot"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary border border-primary/25 font-label-md text-[12px] transition-all cursor-pointer"
            >
              <Icon name="auto_awesome" className="text-[16px]" />
              <span className="hidden xl:inline">AI Copilot</span>
            </button>

            {/* Notifications Button & Dropdown */}
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => {
                  setNotifOpen((v) => !v)
                  setEventMenuOpen(false)
                  setUserMenuOpen(false)
                }}
                className="relative p-2 rounded-xl bg-surface-container-low/80 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border border-outline-variant/20 transition-all focus:outline-none cursor-pointer"
              >
                <Icon name="notifications" className="text-[20px]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,1)]" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-surface-container border border-outline-variant/25 shadow-2xl p-3 z-50 animate-scale-in">
                  <div className="flex items-center justify-between px-2 pb-2 border-b border-outline-variant/15">
                    <span className="font-headline-sm text-[15px] text-on-surface">Orchestration Alerts</span>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllRead}
                        className="font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-outline-variant/15 max-h-72 overflow-y-auto my-1">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-lg hover:bg-surface-container-high/60 transition-colors">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                            {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed shrink-0" />}
                            {n.title}
                          </span>
                          <span className="font-label-caps text-label-caps text-outline shrink-0">{n.time}</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{n.detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-outline-variant/15 flex items-center justify-between px-2">
                    <Link to="/schedule" onClick={closeMenus} className="font-label-md text-label-md text-secondary-fixed hover:underline">
                      View Master Timeline →
                    </Link>
                    <Link to="/concierge-support" onClick={closeMenus} className="font-label-md text-label-md text-primary hover:underline">
                      Concierge Desk
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Firebase Auth Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen((v) => !v)
                  setEventMenuOpen(false)
                  setNotifOpen(false)
                }}
                aria-label="User account and profile menu"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
                title={user ? `Signed in as ${user.displayName || user.email}` : 'Account & Studio Sign In'}
                className="relative p-0.5 rounded-full bg-gradient-to-tr from-secondary/50 via-primary/40 to-tertiary/20 shadow-[0_0_14px_rgba(211,197,168,0.25)] hover:scale-105 transition-transform cursor-pointer"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Icon name="person" className="text-on-primary text-[18px]" />
                  </div>
                )}
                {user && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-surface-dim" />
                )}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-68 rounded-xl bg-surface-container border border-outline-variant/25 shadow-2xl p-3 z-50 animate-scale-in">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5 pb-2 border-b border-outline-variant/15">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-9 h-9 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                            {(user.displayName || user.email || 'A')[0].toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-label-md text-label-md text-on-surface font-semibold truncate">
                            {user.displayName || 'Aura Host'}
                          </div>
                          <div className="font-body-sm text-[11px] text-on-surface-variant truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-1.5 rounded-lg bg-surface-container-high/60 flex items-center justify-between text-[11px]">
                        <span className="text-on-surface-variant">Firestore Sync</span>
                        <span className="text-secondary-fixed font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
                          Live Cloud
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={async () => {
                          await signOutUser()
                          closeMenus()
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Icon name="logout" className="text-[16px]" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <div className="px-1">
                        <div className="font-headline-sm text-[14px] text-on-surface">
                          Aura Cloud Enclave
                        </div>
                        <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                          Authenticate with Google or email to synchronize your celebration directives and vendor contracts in Firestore.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await signInWithGoogle()
                            closeMenus()
                          } catch {
                            // error tracked in context
                          }
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-primary-container to-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition-all cursor-pointer"
                      >
                        <Icon name="login" className="text-[16px]" />
                        <span>Sign In with Google</span>
                      </button>
                      <div className="pt-2 border-t border-outline-variant/15 flex items-center justify-between text-[11px]">
                        <Link to="/sign-in" onClick={closeMenus} className="text-primary hover:underline">
                          Host Login
                        </Link>
                        <Link to="/sign-up" onClick={closeMenus} className="text-secondary-fixed hover:underline">
                          Register Studio
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-xl bg-surface-container-low/80 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border border-outline-variant/20 transition-all focus:outline-none cursor-pointer"
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} className="text-[22px]" />
            </button>
          </div>
        </div>

        {/* Mobile Full Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-outline-variant/20 bg-surface-dim/95 backdrop-blur-2xl px-margin-sm py-4 max-h-[calc(100vh-4rem)] overflow-y-auto animate-fade-down shadow-2xl">
            <div className="flex flex-col gap-3">
              {/* Active Event card in mobile view */}
              <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/20 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <div className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                    Current Event
                  </div>
                  <div className="font-headline-sm text-[15px] text-on-surface truncate">
                    {selectedEvent.name}
                  </div>
                  <div className="font-body-sm text-[11px] text-on-surface-variant">
                    {selectedEvent.venue} · {selectedEvent.countdown || 'T-Minus 42 Days'}
                  </div>
                </div>
                <Link
                  to="/new-event"
                  onClick={closeMenus}
                  className="px-2.5 py-1.5 rounded-lg bg-secondary-container/40 text-secondary-fixed font-label-md text-[11px] shrink-0 hover:bg-secondary-container/60 transition-colors"
                >
                  New Plan
                </Link>
              </div>

              {/* Navigation Items */}
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? 'bg-surface-container-highest text-primary border border-primary/25 shadow-sm font-semibold'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
                      }`
                    }
                  >
                    <Icon name={item.icon} className="text-[20px] text-primary" />
                    <div className="flex-1 min-w-0">
                      <div className="font-label-lg text-label-lg text-on-surface font-medium truncate">
                        {item.label}
                      </div>
                      <div className="font-body-sm text-[11px] text-on-surface-variant truncate">
                        {item.sub}
                      </div>
                    </div>
                  </NavLink>
                ))}
              </nav>

              {/* Auth Quick Actions */}
              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between gap-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-secondary-fixed shrink-0" />
                      <span className="font-label-md text-label-md text-on-surface truncate">
                        {user.displayName || user.email}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        await signOutUser()
                        closeMenus()
                      }}
                      className="py-2 px-4 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await signInWithGoogle()
                          closeMenus()
                        } catch {
                          // handled
                        }
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary-container to-primary text-on-primary font-label-md text-label-md font-semibold text-center shadow-md transition-all"
                    >
                      Google Sign-In
                    </button>
                    <Link
                      to="/sign-in"
                      onClick={closeMenus}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md text-center transition-colors"
                    >
                      Studio Portal
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop when mobile menu open */}
      {mobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
        />
      )}
    </>
  )
}
