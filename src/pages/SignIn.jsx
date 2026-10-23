import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAura } from '../context/AuraContext.jsx'

export default function SignIn() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, signInWithGoogle, authError } = useAura()
  const navigate = useNavigate()

  async function handleGoogleLogin() {
    try {
      await signInWithGoogle()
      navigate('/')
    } catch {
      // error displayed via authError
    }
  }

  function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    if (!passwordInput || !eyeIcon) return;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeIcon.textContent = 'visibility_off';
    } else {
      passwordInput.type = 'password';
      eyeIcon.textContent = 'visibility';
    }
  }

  function updateIconHighlight(input, iconId) {
    const icon = document.getElementById(iconId);
    if (!icon) return;
    if (input.value.trim().length > 0) {
      icon.classList.add('text-secondary');
      icon.classList.remove('text-on-surface-variant');
    } else {
      icon.classList.remove('text-secondary');
      icon.classList.add('text-on-surface-variant');
    }
  }

  function handleAuraAuth() {
    handleGoogleLogin()
  }

  useEffect(() => {
    window.togglePasswordVisibility = togglePasswordVisibility
    window.updateIconHighlight = updateIconHighlight
  }, [])

  return (
      <div className="bg-background font-body-md text-on-surface antialiased relative min-h-screen flex flex-col justify-between selection:bg-primary-container selection:text-on-primary-container">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-tertiary-container/10 rounded-full blur-[140px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-secondary-container/15 rounded-full blur-[110px]"></div>
      </div>
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-7xl mx-auto px-margin-sm lg:px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <Link to="/" className="flex items-center gap-space-sm">
              <img alt="Aura Events Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UVwdC8RfAAb6FcUA4r1PWpZ5jN627WJHoF0C6m6spUiaZS1Pbs3EtaHKlqPjyG_wvDF2KY100kTbaQrYGcGhZgnGMVG68FOYy6THH2sq-YFBbDQRTJV8yILShPoE2BRceuMBJMMLs1gb7oknMv2HZmIzwMvnT3pMKKHySLqoH8v7qSrJQc4NA1vrF4G2s1eBbhrz7GRqSpwGGhtJ9rpjBe8p9Akbyj2NRjkfOu_gtmMTiGq2WKDGg1CYA" />
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                Aura
              </span>
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high/80 text-secondary font-label-caps text-label-caps uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              v2.4 AI Engine
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-space-lg">
            <nav className="hidden md:flex items-center gap-space-lg" data-active-classes="text-primary font-label-lg text-label-lg">
              <Link to="/" className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors">
                Dashboard
              </Link>
              <Link to="/concierge-support" className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors">
                Help &amp; Concierge
              </Link>
              <Link to="/sign-up" className="font-label-lg text-label-lg text-secondary-fixed hover:text-on-surface transition-colors">
                Create Account
              </Link>
            </nav>
            <Link to="/" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0" title="Back to Dashboard">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface-container-low/95 backdrop-blur-2xl border-b border-white/[0.08] px-margin-sm py-4 flex flex-col gap-2 animate-scale-in">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high font-label-lg text-label-lg text-on-surface flex items-center justify-between">
              <span>Live Event Dashboard</span>
              <span className="material-symbols-outlined text-[18px] text-primary">dashboard</span>
            </Link>
            <Link to="/plan-overview" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high font-label-lg text-label-lg text-on-surface flex items-center justify-between">
              <span>Masterplan Overview</span>
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed">auto_awesome</span>
            </Link>
            <Link to="/concierge-support" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high font-label-lg text-label-lg text-on-surface flex items-center justify-between">
              <span>Help &amp; VIP Concierge</span>
              <span className="material-symbols-outlined text-[18px] text-tertiary">support_agent</span>
            </Link>
            <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg font-semibold text-center mt-1">
              Create Aura Account
            </Link>
          </div>
        )}
      </header>
      <main className="relative z-10 w-full pt-16 flex-1 flex flex-col justify-center animate-fade-up">
        <div className="flex flex-col w-full">
          <div className="relative w-full min-h-[calc(100vh-8rem)] flex items-center justify-center px-margin-sm md:px-margin py-space-lg">
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
              <div className="lg:col-span-6 flex flex-col justify-center space-y-space-lg pr-0 lg:pr-space-md">
                <div className="inline-flex items-center gap-space-xs self-start px-3 py-1.5 rounded-full bg-surface-container-high/60 backdrop-blur-md">
                  <span className="material-symbols-outlined text-secondary text-[16px]" style={{ "fontVariationSettings": "'FILL' 1" }}>
                    auto_awesome
                  </span>
                  <span className="font-label-md text-label-md text-secondary tracking-wide">
                    Next-Generation Orchestration
                  </span>
                </div>
                <div className="space-y-space-sm">
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                    AI-orchestrated celebrations.
                    {' '}
                    <span className="text-primary underline decoration-secondary/40 decoration-2 underline-offset-8">
                      Zero stress.
                    </span>
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                    Immersive intelligence for visionary hosts and luxury event curators. Turn complex logistics into synchronized, cinematic experiences effortlessly.
                  </p>
                </div>
                <div className="relative rounded-xl p-space-lg bg-surface-container/70 backdrop-blur-2xl shadow-xl space-y-space-md overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary-container/20 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center justify-between pb-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-9 h-9 rounded-lg bg-surface-bright flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">
                          hub
                        </span>
                      </div>
                      <div>
                        <p className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                          Active Live Sync
                        </p>
                        <p className="font-label-md text-label-md text-secondary">
                          Autonomous Operations
                        </p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-caps text-label-caps uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                      {' '}
                      Live Engine
                    </span>
                  </div>
                  <div className="space-y-space-sm">
                    <div className="p-space-sm rounded-lg bg-surface-container-high/60 flex items-center justify-between transition-all hover:bg-surface-container-high">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-[16px]">
                            favorite
                          </span>
                        </div>
                        <div>
                          <p className="font-label-lg text-label-lg text-on-surface">
                            Julian & Maya's Riviera Wedding
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Timeline, catering, and VIP itineraries locked
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-sm text-headline-sm text-primary">
                          98%
                        </span>
                        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                          Ready
                        </p>
                      </div>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-container-high/60 flex items-center justify-between transition-all hover:bg-surface-container-high">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined text-[16px]">
                            account_balance_wallet
                          </span>
                        </div>
                        <div>
                          <p className="font-label-lg text-label-lg text-on-surface">
                            Oakridge Charity Gala
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Dynamic vendor contracts reconciled
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-label-lg text-label-lg text-secondary font-semibold">
                          $42,500
                        </span>
                        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                          Balanced
                        </p>
                      </div>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-container-high/60 flex items-center justify-between transition-all hover:bg-surface-container-high">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-7 h-7 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                          <span className="material-symbols-outlined text-[16px]">
                            bolt
                          </span>
                        </div>
                        <div>
                          <p className="font-label-lg text-label-lg text-on-surface">
                            Vendor Intelligence Swarm
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Sound engineering, floral, and transport agents
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-primary">
                        <span className="font-label-lg text-label-lg font-semibold">
                          4 running
                        </span>
                        <span className="material-symbols-outlined text-[16px]">
                          check_circle
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-space-xs flex items-center justify-between text-on-surface-variant">
                    <span className="font-body-sm text-body-sm">
                      Last autonomous checkpoint: 2 mins ago
                    </span>
                    <span className="font-label-caps text-label-caps text-secondary uppercase tracking-wider">
                      Aura Core v2.4
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-md pt-space-xs">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[16px]">
                        celebration
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface-bright flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[16px]">
                        hotel_class
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined text-[16px]">
                        verified
                      </span>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Trusted by top global event directors across 34 countries.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6 flex justify-center w-full">
                <div className="w-full max-w-md rounded-xl bg-surface-container/80 backdrop-blur-2xl shadow-2xl p-space-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"></div>
                  <div className="space-y-space-xs text-left mb-space-lg">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                      Sign in to Aura
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Continue crafting extraordinary moments with GenAI precision.
                    </p>
                  </div>
                  {user && (
                    <div className="mb-space-md p-3 rounded-xl bg-secondary-container/30 border border-secondary-fixed/30 flex items-center justify-between">
                      <span className="font-label-md text-label-md text-secondary-fixed">
                        Signed in as {user.displayName || user.email}
                      </span>
                      <Link to="/" className="font-label-md text-label-md text-primary underline">
                        Open Dashboard →
                      </Link>
                    </div>
                  )}
                  {authError && (
                    <div className="mb-space-md p-3 rounded-xl bg-error-container/40 text-on-error-container font-body-sm text-body-sm">
                      {authError}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-space-sm mb-space-lg">
                    <button onClick={handleGoogleLogin} className="group flex items-center justify-center gap-space-sm h-12 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-bright transition-all duration-200 cursor-pointer" type="button">
                      <svg className="w-5 h-5 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                        <path d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" fill="#EA4335"></path>
                        <path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.9z" fill="#4285F4"></path>
                        <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" fill="#FBBC05"></path>
                        <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" fill="#34A853"></path>
                      </svg>
                      <span className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors">
                        Google
                      </span>
                    </button>
                    <button className="group flex items-center justify-center gap-space-sm h-12 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-bright transition-all duration-200" type="button">
                      <svg className="w-5 h-5 fill-current text-on-surface group-hover:text-primary transition-colors" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.71-.93 2.73 1 .08 2.02-.48 2.64-1.23z"></path>
                      </svg>
                      <span className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors">
                        Apple
                      </span>
                    </button>
                  </div>
                  <div className="relative flex items-center justify-center my-space-md">
                    <div className="w-full h-px bg-surface-variant"></div>
                    <span className="absolute px-3 bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                      or continue with email
                    </span>
                  </div>
                  <form className="space-y-space-md" id="aura-login-form" onSubmit={(e) => { e.preventDefault(); handleAuraAuth(); }}>
                    <div className="space-y-space-xs text-left">
                      <label className="block font-label-lg text-label-lg text-on-surface" htmlFor="email">
                        Email address
                      </label>
                      <div className="relative rounded-lg bg-surface-container-high/70 focus-within:bg-surface-container-high focus-within:shadow-[0_0_0_2px_rgba(192,193,255,0.4)] transition-all duration-200">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none transition-colors" id="email-icon">
                          mail
                        </span>
                        <input autoComplete="email" className="w-full h-12 bg-transparent pl-11 pr-4 text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none" id="email" onInput={(e) => { updateIconHighlight(e.currentTarget, 'email-icon') }} placeholder="name@organization.com" required type="email" />
                      </div>
                    </div>
                    <div className="space-y-space-xs text-left">
                      <div className="flex items-center justify-between">
                        <label className="block font-label-lg text-label-lg text-on-surface" htmlFor="password">
                          Password
                        </label>
                        <a className="font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors" data-path="forgot-password" href="#">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="relative rounded-lg bg-surface-container-high/70 focus-within:bg-surface-container-high focus-within:shadow-[0_0_0_2px_rgba(192,193,255,0.4)] transition-all duration-200">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none transition-colors" id="pass-icon">
                          lock
                        </span>
                        <input autoComplete="current-password" className="w-full h-12 bg-transparent pl-11 pr-11 text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none" id="password" onInput={(e) => { updateIconHighlight(e.currentTarget, 'pass-icon') }} placeholder="••••••••••••" required type="password" />
                        <button aria-label="Toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors p-1" id="toggle-pass-visibility" onClick={() => { togglePasswordVisibility() }} type="button">
                          <span className="material-symbols-outlined text-[20px]" id="eye-icon">
                            visibility
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-space-xs">
                      <label className="flex items-center gap-space-sm cursor-pointer select-none">
                        <input className="sr-only peer" id="remember" type="checkbox" />
                        <div className="w-4 h-4 rounded bg-surface-container-high peer-checked:bg-primary-container flex items-center justify-center transition-colors shadow-sm">
                          <span className="material-symbols-outlined text-[14px] text-on-primary-container hidden peer-checked:block" style={{ "fontVariationSettings": "'wght' 700" }}>
                            check
                          </span>
                        </div>
                        <span className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">
                          Remember this device for 30 days
                        </span>
                      </label>
                    </div>
                    <button className="relative w-full h-12 rounded-lg bg-gradient-to-r from-primary-container via-inverse-primary to-primary-container bg-[length:200%_auto] text-on-primary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-space-sm shadow-lg hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 overflow-hidden cursor-pointer" id="submit-btn" type="submit">
                      <span className="flex items-center gap-2" id="btn-text">
                        Sign In to Orchestrator
                        {' '}
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </span>
                      <div className="hidden items-center gap-2" id="btn-spinner">
                        <div className="w-4 h-4 rounded-full animate-spin bg-transparent"></div>
                        <span>
                          Authorizing...
                        </span>
                      </div>
                    </button>
                  </form>
                  <div className="mt-space-lg text-center space-y-space-md">
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Don't have an Aura account?
                      {' '}
                      <Link to="/sign-up" className="font-label-lg text-label-lg text-primary hover:text-primary-fixed underline underline-offset-4 transition-colors">
                        Create an account
                      </Link>
                      <span className="text-secondary">
                        (14-day free trial)
                      </span>
                    </p>
                    <div className="pt-space-xs flex items-center justify-center gap-space-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        shield
                      </span>
                      <span className="font-label-md text-label-md">
                        Enterprise-grade encryption • Single Sign-On available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="relative z-10 w-full bg-surface-container-lowest/60 backdrop-blur-md py-space-md mt-space-lg">
        <div className="max-w-7xl mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md flex-wrap">
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                verified_user
              </span>
              <span className="font-label-md text-label-md">
                SOC-2 Certified
              </span>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                lock
              </span>
              <span className="font-label-md text-label-md">
                256-bit AES Encryption
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>
              <span className="font-label-md text-label-md text-on-surface-variant">
                All systems operational
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-lg">
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="privacy-policy" href="#">
              Privacy Policy
            </a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="terms-of-service" href="#">
              Terms of Service
            </a>
            <span className="font-body-sm text-body-sm text-outline">
              © 2025 Aura Intelligence Corp.
            </span>
          </div>
        </div>
      </footer>
      </div>
  )
}
