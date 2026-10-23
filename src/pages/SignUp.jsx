import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAura } from '../context/AuraContext.jsx'

export default function SignUp() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { signInWithGoogle } = useAura()
  const navigate = useNavigate()

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle()
      navigate('/')
    } catch {
      // handled in context
    }
  }

  // Original Stitch interactivity (runs once after the page is on screen)
  useEffect(() => {
    // Client-side interactions for Password visibility toggle and Preference Pill selections
        const togglePwdBtn = document.getElementById('togglePwd');
        const pwdInput = document.getElementById('password');
        const eyeIcon = document.getElementById('eyeIcon');

        if (togglePwdBtn && pwdInput && eyeIcon) {
          togglePwdBtn.addEventListener('click', () => {
            const isPassword = pwdInput.getAttribute('type') === 'password';
            pwdInput.setAttribute('type', isPassword ? 'text' : 'password');
            eyeIcon.textContent = isPassword ? 'visibility_off' : 'visibility';
          });
        }

        // Category button toggling
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            categoryBtns.forEach(b => {
              b.classList.remove('bg-primary', 'text-on-primary', 'active');
              b.classList.add('bg-surface-container-high/80', 'text-on-surface-variant');
              const icon = b.querySelector('.material-symbols-outlined');
              if (icon) icon.classList.add('opacity-0');
            });
            btn.classList.add('bg-primary', 'text-on-primary', 'active');
            btn.classList.remove('bg-surface-container-high/80', 'text-on-surface-variant');
            const icon = btn.querySelector('.material-symbols-outlined');
            if (icon) icon.classList.remove('opacity-0');
          });
        });
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
              <Link to="/sign-in" className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors">
                Sign In
              </Link>
              <Link to="/sign-up" aria-current="page" className="transition-colors text-primary font-label-lg text-label-lg">
                Create Account
              </Link>
              <Link to="/concierge-support" className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors">
                Help &amp; Concierge
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
            <Link to="/new-event" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high font-label-lg text-label-lg text-on-surface flex items-center justify-between">
              <span>Create Celebration Blueprint</span>
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed">add_circle</span>
            </Link>
            <Link to="/concierge-support" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high font-label-lg text-label-lg text-on-surface flex items-center justify-between">
              <span>Help &amp; VIP Concierge</span>
              <span className="material-symbols-outlined text-[18px] text-tertiary">support_agent</span>
            </Link>
            <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg font-semibold text-center mt-1">
              Sign In to Existing Account
            </Link>
          </div>
        )}
      </header>
      <main className="relative z-10 w-full pt-16 flex-1 flex flex-col justify-center animate-fade-up">
        <div className="flex flex-col w-full">
          <div className="relative w-full max-w-7xl mx-auto px-margin-sm lg:px-margin py-space-xl">
            <div className="absolute -top-12 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-10 right-1/4 w-[380px] h-[380px] bg-tertiary-container/10 rounded-full blur-[130px] pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start relative z-10">
              <div className="lg:col-span-6 flex flex-col justify-between space-y-space-lg pt-space-xs">
                <div className="flex flex-col space-y-space-sm">
                  <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-high/90 shadow-sm w-fit">
                    <span className="material-symbols-outlined text-secondary text-[16px]">
                      auto_awesome
                    </span>
                    <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">
                      Welcome to Aura Intelligence
                    </span>
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                    Design unforgettably.
                    <br />
                    <span className="text-primary">
                      Guided by autonomous AI.
                    </span>
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                    Set up your studio profile in under 2 minutes to unlock personalized budgeting, vendor negotiation agents, and real-time run-of-show orchestration.
                  </p>
                </div>
                <div className="bg-surface-container-low/70 backdrop-blur-xl p-space-md rounded-xl shadow-xl flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-outline">
                      Studio Setup Velocity
                    </span>
                    <span className="font-label-caps text-label-caps text-secondary bg-surface-container-high px-2 py-0.5 rounded-full font-semibold">
                      Step 1 of 3
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-space-xs">
                    <div className="h-1.5 rounded-full bg-primary-container shadow-sm"></div>
                    <div className="h-1.5 rounded-full bg-surface-container-highest"></div>
                    <div className="h-1.5 rounded-full bg-surface-container-highest"></div>
                  </div>
                  <div className="space-y-space-xs">
                    <div className="flex items-start gap-space-sm p-space-xs rounded-lg bg-surface-container-high/60 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">
                          edit_note
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-label-lg text-label-lg text-on-surface font-semibold">
                          1. Account & Studio Identity
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Profile credentials, brand tier & workspace URL
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        radio_button_checked
                      </span>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-xs rounded-lg opacity-70">
                      <div className="w-6 h-6 rounded-full bg-surface-container-highest text-outline flex items-center justify-center shrink-0 mt-0.5">
                        <span className="font-label-caps text-label-caps">
                          02
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-label-lg text-label-lg text-on-surface">
                          2. Primary Event Blueprint
                        </p>
                        <p className="font-body-sm text-body-sm text-outline">
                          Select default scale, guest capacities & aesthetic tags
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-outline text-[18px]">
                        lock
                      </span>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-xs rounded-lg opacity-70">
                      <div className="w-6 h-6 rounded-full bg-surface-container-highest text-outline flex items-center justify-center shrink-0 mt-0.5">
                        <span className="font-label-caps text-label-caps">
                          03
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-label-lg text-label-lg text-on-surface">
                          3. Copilot Agent Calibration
                        </p>
                        <p className="font-body-sm text-body-sm text-outline">
                          Autonomous contract threshold & vendor auto-inquiry
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-outline text-[18px]">
                        lock
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl bg-surface-container/80 backdrop-blur-2xl p-space-md shadow-2xl">
                  <div className="flex items-center justify-between mb-space-sm">
                    <div className="flex items-center gap-space-xs">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      <span className="font-label-caps text-label-caps tracking-widest text-on-surface-variant uppercase">
                        Copilot Synthesis
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary text-label-caps font-label-caps">
                      <span className="material-symbols-outlined text-[13px] text-secondary">
                        verified
                      </span>
                      <span>
                        99.4% Match Accuracy
                      </span>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest/80 rounded-lg p-space-sm font-body-sm text-body-sm space-y-2">
                    <div className="flex items-center gap-space-xs text-primary">
                      <span className="material-symbols-outlined text-[16px]">
                        psychology
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        Active Agent Prompt
                      </span>
                    </div>
                    <p className="text-on-surface-variant italic leading-relaxed">
                      “Synthesizing $65K Napa Valley Autumn Wedding budget distribution: Allocating 44% to vineyard venue & catering, orchestrating 6 verified floral/lighting partners.”
                    </p>
                    <div className="pt-space-xs flex flex-wrap items-center gap-space-xs">
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps">
                        Venue: St. Helena Estate
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps">
                        Floral: Botanical Luxe
                      </span>
                      <span className="px-2 py-0.5 rounded bg-secondary-container/60 text-secondary font-label-caps text-label-caps">
                        Est. Savings: $4,820
                      </span>
                    </div>
                  </div>
                  <div className="mt-space-sm flex items-center justify-between pt-space-xs">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-[18px]">
                          trending_up
                        </span>
                      </div>
                      <div>
                        <p className="font-label-caps text-label-caps text-outline uppercase">
                          Execution Efficiency
                        </p>
                        <p className="font-label-lg text-label-lg text-on-surface font-semibold">
                          +34 hrs saved / event
                        </p>
                      </div>
                    </div>
                    <svg className="w-28 h-7 text-primary" fill="none" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 20L15 17L30 19L45 12L60 14L75 6L90 8L100 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      <path d="M0 20L15 17L30 19L45 12L60 14L75 6L90 8L100 2V24H0V20Z" fill="currentColor" fillOpacity="0.12"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-space-md pt-space-xs">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest ring-2 ring-background flex items-center justify-center overflow-hidden">
                      <img className="w-full h-full object-cover" data-alt="Close-up portrait of an elegant creative director at an upscale event venue, soft warm ambient studio lighting, dark palette" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7u8OJK9GkDCFA35_f6g0dVHc4PjZrA6UhJbjBZVaySLCqNbHwr09w92vWWVK149HuW4GaUYOmAFltwTJVhfsqABgeMeJ96EEYTvxLsk-K79r2pZfAYI5bNp0_u8RYOG0Pgh-Bh5Iba8Phey5eZICNj4urQcQWjEUoKo2l43SjsFKXcJmO9jGF4vwKcvWukvzJw2A1H6qJX5YpWquAim4CwMBC_L6lIB83D8rm0oHc_dHqn0rlf_z26A" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest ring-2 ring-background flex items-center justify-center overflow-hidden">
                      <img className="w-full h-full object-cover" data-alt="Portrait of a modern wedding coordinator smiling in an architectural loft setting with moody evening lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEkiPfW9ignJ8bsPnFz_LiuixDNn2Ml37Otcp-E0qPfUimgz5ROhwQqx4Fv1XcJARoTO2rN29ruioJfa-5hlA73UVck4fjSpLTRZfMhsP1YuGW4EDAvNLR8fGcVB9os101YlGRyON-KyO961xdEmBghvrUtheawvqRre2OIHQuVGUm_xuynS1TCmEaRDqLml3xdPrYB7Ayah6OP_2jsrb37AwcOAIdoRp62OLH_rHRDK8KHu811PLyRQ" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest ring-2 ring-background flex items-center justify-center overflow-hidden">
                      <img className="w-full h-full object-cover" data-alt="Headshot of a luxury celebration designer outdoors in Monte Carlo at dusk with subtle bokeh lights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNQbhNz9POr2-kmQ_gbjXgtXarE5hR-gEsy-9ROe9LRC39mPEtBeKcWDciJ8BjDEzZ1tNupzplm8TH3VCB_ufm7ZMpmrSGU4SHMVvMYe7MnlHyKls4EF9MSNc2PdaCkXCgw1Ios423gLu0WIa1WkronGJJOa1EFcgAv7cEdar_OKltz4vHQ6Rx7DxAGqFoQTueTrI0FiS6trn7tCVdPdRNOCGo88fOzg-otx0TKi-pa9_PifGWy4VCJw" />
                    </div>
                  </div>
                  <div className="text-on-surface-variant font-body-sm text-body-sm">
                    <span className="font-semibold text-on-surface">
                      Over 4,200 visionary planners
                    </span>
                    {' '}
                    orchestrate with Aura worldwide.
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 w-full">
                <div className="bg-surface-container/70 backdrop-blur-2xl rounded-2xl p-space-lg md:p-space-xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-container/40 to-transparent"></div>
                  <div className="flex flex-col space-y-space-xs mb-space-md">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                      Create your Aura account
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Start your 14-day full access trial — no credit card required.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-space-sm mb-space-md">
                    <button onClick={handleGoogleSignUp} className="flex items-center justify-center gap-space-xs h-12 px-space-md rounded-lg bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer" type="button">
                      <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                        <path d="M12.24 10.285V13.4h6.887C18.2 16.14 15.645 18 12.24 18c-3.315 0-6-2.685-6-6s2.685-6 6-6c1.47 0 2.81.53 3.86 1.41l2.36-2.36C17.02 3.69 14.77 3 12.24 3 7.27 3 3.24 7.03 3.24 12s4.03 9 9 9c5.2 0 8.65-3.66 8.65-8.81 0-.61-.06-1.22-.16-1.9H12.24z"></path>
                      </svg>
                      <span>
                        Google
                      </span>
                    </button>
                    <button onClick={handleGoogleSignUp} className="flex items-center justify-center gap-space-xs h-12 px-space-md rounded-lg bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer" type="button">
                      <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.65-.79 1.1-1.9 1-3.01-1 .04-2.13.68-2.79 1.45-.58.67-1.1 1.76-.98 2.85 1.12.09 2.19-.55 2.77-1.29z"></path>
                      </svg>
                      <span>
                        Apple ID
                      </span>
                    </button>
                  </div>
                  <div className="relative flex items-center justify-center my-space-md">
                    <div className="w-full h-px bg-surface-container-highest"></div>
                    <span className="absolute px-space-sm bg-surface-container font-label-caps text-label-caps uppercase text-outline tracking-wider">
                      Or sign up with work email
                    </span>
                  </div>
                  <form className="space-y-space-md" onSubmit={(e) => { e.preventDefault(); handleGoogleSignUp(); }}>
                    <div className="space-y-space-xs">
                      <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="fullName">
                        Full Name
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                          person
                        </span>
                        <input className="w-full h-12 pl-11 pr-4 rounded-lg bg-surface-container-high/80 text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-highest transition-all duration-200" id="fullName" placeholder="e.g. Jacqueline Vance" type="text" />
                      </div>
                    </div>
                    <div className="space-y-space-xs">
                      <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="email">
                        Work or Personal Email
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                          mail
                        </span>
                        <input className="w-full h-12 pl-11 pr-4 rounded-lg bg-surface-container-high/80 text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-highest transition-all duration-200" id="email" placeholder="name@studioevent.com" type="email" />
                      </div>
                    </div>
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="password">
                          Create Secure Master Key
                        </label>
                        <span className="font-label-caps text-label-caps text-secondary font-semibold" id="pwdStrengthLabel">
                          Strength: Strong
                        </span>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                          lock
                        </span>
                        <input className="w-full h-12 pl-11 pr-11 rounded-lg bg-surface-container-high/80 text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-highest transition-all duration-200" id="password" placeholder="Minimum 10 characters" type="password" defaultValue={"AuraSuperSecret2025#"} />
                        <button className="absolute right-3.5 text-outline hover:text-on-surface transition-colors" id="togglePwd" type="button">
                          <span className="material-symbols-outlined text-[20px]" id="eyeIcon">
                            visibility
                          </span>
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 pt-1">
                        <div className="h-1 rounded-full bg-primary"></div>
                        <div className="h-1 rounded-full bg-primary"></div>
                        <div className="h-1 rounded-full bg-primary"></div>
                        <div className="h-1 rounded-full bg-secondary"></div>
                      </div>
                    </div>
                    <div className="space-y-space-xs pt-space-xs">
                      <label className="block font-label-md text-label-md text-on-surface-variant">
                        What are you planning primarily?
                      </label>
                      <div className="grid grid-cols-2 gap-space-xs" id="categoryGroup">
                        <button className="category-btn active px-space-sm py-2 rounded-lg text-left bg-primary text-on-primary font-label-md text-label-md font-medium transition-all duration-150 flex items-center justify-between shadow-sm" type="button">
                          <span>
                            Weddings & Galas
                          </span>
                          <span className="material-symbols-outlined text-[16px]">
                            check_circle
                          </span>
                        </button>
                        <button className="category-btn px-space-sm py-2 rounded-lg text-left bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium transition-all duration-150 flex items-center justify-between" type="button">
                          <span>
                            Milestones & Soirées
                          </span>
                          <span className="material-symbols-outlined text-[16px] opacity-0">
                            check_circle
                          </span>
                        </button>
                        <button className="category-btn px-space-sm py-2 rounded-lg text-left bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium transition-all duration-150 flex items-center justify-between" type="button">
                          <span>
                            Corporate & Summits
                          </span>
                          <span className="material-symbols-outlined text-[16px] opacity-0">
                            check_circle
                          </span>
                        </button>
                        <button className="category-btn px-space-sm py-2 rounded-lg text-left bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium transition-all duration-150 flex items-center justify-between" type="button">
                          <span>
                            Private Dining
                          </span>
                          <span className="material-symbols-outlined text-[16px] opacity-0">
                            check_circle
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-space-xs pt-space-xs">
                      <label className="flex items-start gap-space-sm cursor-pointer select-none group">
                        <input defaultChecked className="mt-1 h-4 w-4 rounded bg-surface-container-high text-primary focus:ring-0 focus:ring-offset-0 transition-colors cursor-pointer accent-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                          I agree to the
                          {' '}
                          <a className="text-primary hover:underline font-medium" data-path="terms-of-service" href="#">
                            Terms of Service
                          </a>
                          {' '}
                          and
                          {' '}
                          <a className="text-primary hover:underline font-medium" data-path="privacy-policy" href="#">
                            Privacy Policy
                          </a>
                          .
                        </span>
                      </label>
                      <label className="flex items-start gap-space-sm cursor-pointer select-none group">
                        <input defaultChecked className="mt-1 h-4 w-4 rounded bg-surface-container-high text-primary focus:ring-0 focus:ring-offset-0 transition-colors cursor-pointer accent-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                          Receive weekly AI event trends & autonomous vendor intelligence reports.
                        </span>
                      </label>
                    </div>
                    <button className="w-full h-12 rounded-lg bg-gradient-to-r from-primary-container via-inverse-primary to-primary text-on-primary-fixed font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs shadow-lg shadow-primary-container/20 hover:shadow-primary-container/40 active:scale-[0.985] transition-all duration-200 mt-space-sm group" type="submit">
                      <span>
                        Create Account & Begin Setup
                      </span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  </form>
                  <div className="mt-space-md pt-space-md flex flex-col items-center justify-center space-y-space-xs bg-surface-container-low/50 -mx-space-lg md:-mx-space-xl -mb-space-lg md:-mb-space-xl p-space-md rounded-b-2xl">
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
                      Already have an Aura account?
                      {' '}
                      <Link to="/sign-in" className="text-primary font-semibold hover:underline ml-1">
                        Sign In
                      </Link>
                    </p>
                    <p className="font-label-caps text-label-caps text-outline text-center uppercase tracking-wider">
                      Enterprise SSO, SAML, and custom billing available on request
                    </p>
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
