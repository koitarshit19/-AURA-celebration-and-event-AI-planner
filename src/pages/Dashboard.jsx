import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

const metrics = [
  { label: 'RSVP Velocity', icon: 'group', iconCls: 'text-secondary-fixed', value: '112', unit: '/ 120 Guests', unitCls: 'text-on-surface-variant', bar: 'bg-secondary-fixed', width: '93.3%', left: '93% Confirmed', right: '+8 this week', rightCls: 'text-secondary-fixed' },
  { label: 'Vendor Lock Rate', icon: 'handshake', iconCls: 'text-primary', value: '88%', unit: 'Solidified', unitCls: 'text-primary', bar: 'bg-primary', width: '88%', left: '7 of 8 Contracts Verified', right: '1 Pending Sign', rightCls: 'text-primary' },
  { label: 'Ambience Studio Status', icon: 'palette', iconCls: 'text-tertiary', value: 'Scene 4', unit: 'Active Flow', unitCls: 'text-tertiary', bar: 'bg-tertiary', width: '100%', left: 'Lighting & Audio Mapped', right: 'DMX & Spatial ready', rightCls: 'text-tertiary' },
  { label: 'Weather Contingency', icon: 'wb_twilight', iconCls: 'text-secondary-fixed', value: '96%', unit: 'Optimal', unitCls: 'text-secondary-fixed-dim', bar: 'bg-secondary-fixed-dim', width: '96%', left: 'Clear Sky Forecast', right: 'Temp 68°F Sunset', rightCls: 'text-secondary-fixed' },
]

const donut = [
  { stroke: '#c0c1ff', dash: '124.6 389.5', offset: 0 },
  { stroke: '#f0e1c3', dash: '85.7 389.5', offset: -124.6 },
  { stroke: '#d0bcff', dash: '27.3 389.5', offset: -210.3 },
  { stroke: '#4ade80', dash: '11.7 389.5', offset: -237.6 },
]

const legend = [
  { name: 'Estate Venue', amount: '$24,000', pct: '32.0%', dot: 'bg-primary', text: 'text-primary' },
  { name: 'Dining & Cellar', amount: '$16,500', pct: '22.0%', dot: 'bg-secondary-fixed', text: 'text-secondary-fixed' },
  { name: 'Floral & Ambience', amount: '$5,250', pct: '7.0%', dot: 'bg-tertiary', text: 'text-tertiary' },
  { name: 'Smart Contingency', amount: '$2,500', pct: '3.3%', dot: 'bg-emerald-400', text: 'text-emerald-400' },
]

const initialTasks = [
  {
    id: 1, title: 'Tasting Menu & Wine Flight Approval', due: 'Due Tomorrow',
    dueCls: 'bg-secondary-container/40 text-secondary-fixed',
    desc: 'Chef Antoine (Meadowood Cellars) submits final 5-course pairings including the 2018 Oakville Reserve Cabernet.',
    meta: [{ icon: 'restaurant', text: 'Culinary Team' }, { icon: 'priority_high', text: 'High Impact' }],
    done: false,
  },
  {
    id: 2, title: 'DJ Acoustic Soundcheck & Decibel Zoning Protocol', due: 'Oct 18',
    dueCls: 'bg-surface-container-highest text-primary',
    desc: 'Calibration of outdoor bass resonance against St. Helena county sound ordinances past 22:00 PST.',
    meta: [{ icon: 'volume_up', text: 'Sound Architect' }, { icon: 'verified', text: 'AI Auto-Calibrated', cls: 'text-primary' }],
    done: false,
  },
  {
    id: 3, title: 'Seating Chart Dynamic Optimization (112/120 Confirmed)', due: 'Oct 20',
    dueCls: 'bg-surface-container-highest text-secondary-fixed-dim',
    desc: 'Algorithmic social cluster mapping: 14 circular estate tables balanced for conversation harmony and dietary compatibility.',
    meta: [{ icon: 'table_restaurant', text: 'Spatial Layout' }, { icon: 'bolt', text: '8 Pending Invites', cls: 'text-secondary-fixed' }],
    done: false,
  },
  {
    id: 4, title: 'Master Valet & Chauffeur Routing Plan', due: 'Completed',
    dueCls: 'bg-surface-container-highest text-outline',
    desc: 'Ingress permit secured for 45 guest vehicles; private shuttle sequence verified with Napa Black Car Service.',
    meta: [{ icon: 'directions_car', text: 'Logistics Enclave' }],
    done: true,
  },
]

const labelCaps = 'font-label-caps text-label-caps'
const card = 'rounded-xl backdrop-blur-2xl shadow-xl'

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks)
  const [auth, setAuth] = useState('idle') // idle | loading | done
  const [snoozed, setSnoozed] = useState(false)

  const toggleTask = (id) =>
    setTasks((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const authorize = () => {
    setAuth('loading')
    setTimeout(() => setAuth('done'), 650)
  }

  return (
    <>
      {/* HERO */}
      <section className="relative w-full -mt-20 pt-24 pb-12 overflow-hidden px-margin-sm lg:px-margin">
        <div className="absolute top-0 right-1/4 w-[520px] h-[520px] bg-tertiary-container/15 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 -left-20 w-[420px] h-[420px] bg-secondary-container/20 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-wrap items-center justify-between gap-space-md pt-2">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)] animate-ping" />
              <span className={`${labelCaps} text-secondary-fixed tracking-widest uppercase`}>Autonomous Event State: Real-Time Sync</span>
              <span className={`${labelCaps} text-outline-variant`}>•</span>
              <span className={`${labelCaps} text-on-surface-variant uppercase`}>Napa Valley Estate Protocol</span>
            </div>
            <div className="flex items-center gap-space-sm">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low/90 backdrop-blur-md">
                <Icon name="verified_user" className="text-primary text-[16px]" />
                <span className={`${labelCaps} text-primary tracking-wide uppercase`}>Aura AI Guard: Active</span>
              </div>
              <span className={`hidden sm:inline-block ${labelCaps} text-on-surface-variant/80 px-2.5 py-1 rounded-full bg-surface-container-low/60`}>
                ID: #NAPA-2025-OCT24
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
            <div className="lg:col-span-8 flex flex-col gap-space-sm">
              <span className={`${labelCaps} tracking-[0.22em] text-secondary-fixed uppercase`}>Autonomous Luminary Suite</span>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight max-w-3xl">
                Plan the party,{' '}
                <span className="bg-gradient-to-r from-secondary-fixed via-primary to-tertiary bg-clip-text text-transparent">not the stress.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Autonomous AI orchestration for Julian &amp; Maya's Autumn Napa Gala (October 24, 2025). High-fidelity scheduling, vendor micro-negotiations, and curated sensory balance under zero human friction.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <div className="p-5 rounded-xl bg-surface-container/70 backdrop-blur-2xl shadow-xl flex flex-col gap-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className={`${labelCaps} text-secondary-fixed-dim uppercase tracking-wider`}>Countdown to Twilight Reception</span>
                  <Icon name="hourglass_top" className="text-secondary-fixed text-[18px]" />
                </div>
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  {[
                    { n: '42', l: 'Days', nCls: 'text-on-surface', lCls: 'text-secondary-fixed', line: 'bg-secondary-fixed/70' },
                    { n: '14', l: 'Hours', nCls: 'text-on-surface', lCls: 'text-primary', line: 'bg-primary/70' },
                    { n: '28', l: 'Mins', nCls: 'text-secondary-fixed animate-pulse', lCls: 'text-on-surface-variant', line: 'bg-secondary-container' },
                  ].map((c) => (
                    <div key={c.l} className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-container-high/90 shadow-sm relative hover:bg-surface-bright transition-all">
                      <span className={`font-headline-lg text-headline-lg font-semibold tracking-tight ${c.nCls}`}>{c.n}</span>
                      <span className={`${labelCaps} uppercase tracking-widest mt-0.5 ${c.lCls}`}>{c.l}</span>
                      <div className={`absolute -bottom-0.5 w-6 h-0.5 rounded-full ${c.line}`} />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant pt-1">
                  <span>Meadowood Estate, Napa Valley</span>
                  <span className="text-secondary-fixed font-medium">17:30 PST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-margin-sm lg:px-margin flex flex-col gap-space-xl pb-space-xl">
        {/* AI NEXT BEST ACTION */}
        <section className={`relative w-full ${card} bg-surface-container-low/90 p-6 lg:p-8 overflow-hidden`}>
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-tertiary-container/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 shadow-md">
                <Icon name="neurology" fill className="text-primary text-[28px]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`px-2.5 py-0.5 rounded-full bg-secondary-container/60 text-secondary-fixed ${labelCaps} tracking-wider uppercase`}>AI Copilot Recommendation</span>
                  <span className="font-label-md text-label-md text-primary font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    Urgency: High / Cost-Vector Sensitive
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Finalize Floral Installation Contract with St. Helena Botanicals</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Lock in a <strong className="text-secondary-fixed font-medium">14% off-peak delivery incentive</strong> ($1,850 value). The contract has been parsed through your legal parameters: liability ceilings validated, arrival window pinned to 08:30 PST, zero overage risk detected.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                type="button"
                disabled={snoozed}
                onClick={() => setSnoozed(true)}
                className={`w-1/2 sm:w-auto px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg transition-all text-center ${snoozed ? 'opacity-50' : ''}`}
              >
                {snoozed ? 'Snoozed' : 'Snooze 24h'}
              </button>
              <button
                type="button"
                disabled={auth !== 'idle'}
                onClick={authorize}
                className={`w-1/2 sm:w-auto px-6 py-2.5 rounded-lg font-label-lg text-label-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                  auth === 'done' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-primary text-on-primary hover:bg-primary-container hover:shadow-primary/30'
                }`}
              >
                {auth === 'idle' && (<><Icon name="verified" className="text-[18px]" /><span>Review &amp; Authorize</span></>)}
                {auth === 'loading' && (<><Icon name="refresh" className="text-[18px] animate-spin" /> Authorizing...</>)}
                {auth === 'done' && (<><Icon name="check" className="text-[18px]" /> Authorized</>)}
              </button>
            </div>
          </div>
          {auth === 'done' && (
            <div className="mt-4 pt-4 flex items-center justify-between bg-surface-container-highest/60 rounded-lg px-4 py-2 text-secondary-fixed font-label-md text-label-md transition-all">
              <span className="flex items-center gap-2">
                <Icon name="check_circle" className="text-[18px]" />
                Contract executed through encrypted escrow. St. Helena Botanicals notified for Oct 24 arrival.
              </span>
              <button type="button" onClick={() => setAuth('idle')} className="text-on-surface-variant hover:text-on-surface underline">Undo</button>
            </div>
          )}
        </section>

        {/* METRICS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {metrics.map((m) => (
            <div key={m.label} className="p-5 rounded-xl bg-surface-container/70 backdrop-blur-xl shadow-lg flex flex-col gap-3 hover:bg-surface-container transition-all">
              <div className="flex items-center justify-between">
                <span className={`${labelCaps} text-on-surface-variant uppercase tracking-wider`}>{m.label}</span>
                <Icon name={m.icon} className={`${m.iconCls} text-[20px]`} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-md text-headline-md text-on-surface font-semibold">{m.value}</span>
                <span className={`font-body-md text-body-md ${m.unitCls}`}>{m.unit}</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                <div className={`${m.bar} h-1.5 rounded-full`} style={{ width: m.width }} />
              </div>
              <div className={`flex items-center justify-between ${labelCaps} text-on-surface-variant`}>
                <span>{m.left}</span>
                <span className={m.rightCls}>{m.right}</span>
              </div>
            </div>
          ))}
        </section>

        {/* BUDGET + TASKS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <div className={`lg:col-span-5 ${card} bg-surface-container/80 p-6 lg:p-7 flex flex-col gap-6`}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className={`${labelCaps} text-secondary-fixed uppercase tracking-wider`}>Financial Allocation</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Budget Health</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md">$75,000 Cap</span>
            </div>

            <div className="relative flex items-center justify-center py-4">
              <svg className="w-64 h-64 -rotate-90 transform" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="62" fill="transparent" stroke="currentColor" strokeWidth="14" className="text-surface-container-highest/40" />
                {donut.map((s) => (
                  <circle
                    key={s.stroke}
                    cx="80" cy="80" r="62" fill="transparent"
                    stroke={s.stroke} strokeWidth="14" strokeLinecap="round"
                    strokeDasharray={s.dash} strokeDashoffset={s.offset}
                    className="transition-all duration-700 hover:opacity-90 cursor-pointer"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className={`${labelCaps} text-on-surface-variant uppercase tracking-wider`}>Total Allocated</span>
                <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">$48,250</span>
                <span className="font-label-md text-label-md text-secondary-fixed">64.3% of Total Cap</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {legend.map((l) => (
                <div key={l.name} className="p-3 rounded-lg bg-surface-container-high/60 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${l.dot}`} />
                    <span className="font-label-md text-label-md text-on-surface font-medium">{l.name}</span>
                  </div>
                  <div className="flex justify-between items-baseline pl-4">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{l.amount}</span>
                    <span className={`${labelCaps} ${l.text}`}>{l.pct}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-lg bg-surface-container-lowest/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="savings" className="text-secondary-fixed text-[20px]" />
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface">Algorithmic Savings Generated</span>
                  <span className="font-body-sm text-body-sm text-secondary-fixed-dim">+$3,420 negotiated below standard rack rates</span>
                </div>
              </div>
              <Link to="/budget" className="font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors">Audit →</Link>
            </div>
          </div>

          <div className={`lg:col-span-7 ${card} bg-surface-container/80 p-6 lg:p-7 flex flex-col gap-6`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className={`${labelCaps} text-secondary-fixed uppercase tracking-wider`}>Priority Pipeline</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Orchestration Checklist</h3>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="px-3 py-1 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors active:scale-95">All Tasks (14)</button>
                <button type="button" className="px-3 py-1 rounded-lg bg-primary-container/20 text-primary font-label-md text-label-md">High Priority (4)</button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className={`group flex items-start gap-4 p-4 rounded-xl bg-surface-container-high/50 hover:bg-surface-container-high transition-all cursor-pointer ${t.done ? 'opacity-70' : ''}`}
                >
                  <button
                    type="button"
                    className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-colors ${t.done ? 'bg-primary text-on-primary' : 'bg-surface-container-highest group-hover:bg-primary/20'}`}
                  >
                    <Icon name="check" className={`text-[16px] ${t.done ? 'text-on-primary' : 'text-transparent'}`} />
                  </button>
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`font-body-lg text-body-lg text-on-surface font-medium truncate ${t.done ? 'line-through' : ''}`}>{t.title}</span>
                      <span className={`px-2 py-0.5 rounded-full ${labelCaps} uppercase ${t.dueCls}`}>{t.due}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{t.desc}</p>
                    <div className={`flex items-center gap-4 pt-1 ${labelCaps} text-outline`}>
                      {t.meta.map((m, i) => (
                        <span key={m.text} className="contents">
                          {i > 0 && <span>•</span>}
                          <span className={`flex items-center gap-1 ${m.cls || ''}`}>
                            <Icon name={m.icon} className="text-[14px]" /> {m.text}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button type="button" className="font-label-md text-label-md text-primary hover:text-primary-fixed flex items-center gap-1 transition-colors">
                <Icon name="add" className="text-[18px]" />
                Add Orchestration Directive
              </button>
              <span className={`${labelCaps} text-outline-variant`}>Aura Auto-Rebalancer: Idle</span>
            </div>
          </div>
        </section>

        {/* GALLERY + CONCIERGE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
          <div className={`lg:col-span-8 ${card} bg-surface-container/70 p-6 flex flex-col justify-between relative overflow-hidden group`}>
            <div className="relative w-full h-64 sm:h-72 rounded-lg overflow-hidden mb-4">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Napa Valley vineyard gala at twilight with glowing lights and candlelit tables"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJOKlmemOeoIjVopCAvfvZPnwbr837PEWHdxxMWRmMtBIhpoZLbI3LedAtZVxDXuN65GiTr-gVuka5KwbwVU-At6wijE9CBb5pZBXJLo2jXo13I3Xgx0Hons0a8J7983yiwqKLJXqSE-0Zd0lPL1Y5SSsv9L2cKgdoY1GubzEGZp71I_gublIUrns9mtGKB7QOUJf9abdu_DAaytQGhDTPLyBJd6QLSDa_JOyrDn1oGiepQR1kuJ1PsQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-surface-dim/80 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed" />
                <span className={`${labelCaps} text-secondary-fixed uppercase tracking-wider`}>Live Aesthetic Simulation</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Meadowood Pavilion • Twilight Transition</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Computed lux level: 18.4 lumens (Warm Gold &amp; Nocturne Indigo)</span>
                </div>
                <Link to="/ambience-studio" className="px-4 py-2 rounded-lg bg-surface-container-high/90 hover:bg-surface-container-highest text-on-surface font-label-md text-label-md backdrop-blur-md transition-all shrink-0">
                  Launch Studio →
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                ['Color Temperature', '2,400K Sunset Glow'],
                ['Spatial Audio Track', 'Nocturne Cello Suite'],
                ['Fragrance Diffusion', 'Cedar & Wild Fig'],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5">
                  <span className={`${labelCaps} text-outline`}>{k}</span>
                  <span className="font-label-lg text-label-lg text-on-surface">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`lg:col-span-4 ${card} bg-surface-container/70 p-6 flex flex-col justify-between gap-6`}>
            <div className="flex flex-col gap-2">
              <span className={`${labelCaps} text-secondary-fixed uppercase tracking-wider`}>Geographic Enclave</span>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">Estate Coordinates &amp; Ingress</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                St. Helena, Napa Valley, CA. Precision geo-fence active for vendor delivery tracking and authorized guest digital valet cards.
              </p>
            </div>
            <div
              className="w-full h-44 rounded-lg bg-cover bg-center relative overflow-hidden shadow-md"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIdwZKdwptAS2ogFHqIdVsadGnQP7W8z-jdlnYJZgi6Vk4e1eCwjwLswiK7llrHlF4yPXXCdm1n-Q2YCl7cgBk61XDoTb6p9MqF5VRpQWNqZnBRl-i8nzFW6c0TIG8ZpBcirp3HAlwS_ksqG6PKzEoqG4YPpjFdVwFFuvAt1ILeYwiCc5VpqlWsBQX9spTe_1xtmtlzUye6RP4CWndjPHZw0zeODcf8fqJHk5r4T2d_1i5fVxPNOXj2w')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/90 via-surface-dim/20 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <Icon name="pin_drop" className="text-secondary-fixed text-[20px]" />
                <span className="font-label-md text-label-md text-on-surface font-medium">Estate Gate 2 • East Vineyard Lawn</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-surface-container-high/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container/60 flex items-center justify-center text-secondary-fixed">
                  <Icon name="support_agent" className="text-[20px]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-medium">Dedicated VIP Concierge</span>
                  <span className="font-body-sm text-body-sm text-secondary-fixed-dim">Arthur Vance • 24/7 Available</span>
                </div>
              </div>
              <Link to="/concierge-support" title="Contact Concierge" className="p-2 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface transition-colors">
                <Icon name="chat" className="text-[18px]" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
