import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAura } from '../context/AuraContext.jsx'
import Icon from '../components/Icon.jsx'

import { TYPOLOGY_OPTIONS, VIBE_OPTIONS } from '../data/wizardData.js'

export default function NewEvent() {
  const { generatePlanWithGemini, planGenerating } = useAura()
  const navigate = useNavigate()

  const [eventType, setEventType] = useState('Weddings & Galas')
  const [date, setDate] = useState('October 24, 2025')
  const [city, setCity] = useState('St. Helena & Napa Valley, CA')
  const [guestCount, setGuestCount] = useState(135)
  const [budget, setBudget] = useState(75000)
  const [vibe, setVibe] = useState('Romantic & Ethereal')
  const [errorMsg, setErrorMsg] = useState(null)

  const handleGenerateBlueprint = async () => {
    setErrorMsg(null)
    try {
      await generatePlanWithGemini({
        eventType,
        date,
        guestCount,
        budget,
        city,
        vibe,
      })
      navigate('/plan-overview')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Plan generation failed. Please try again.')
    }
  }

  return (
    <div className="flex flex-col w-full animate-fade-up">
      <div className="relative w-full overflow-hidden pb-16">
        <div className="max-w-7xl mx-auto px-margin-sm lg:px-margin pt-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-8 animate-fade-up stagger-1">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)] animate-ping" />
                  Autonomous Blueprint Generator
                </span>
                <span className="text-outline-variant font-body-sm text-body-sm">/</span>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Gemini Server-Side Engine
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface tracking-tight">
                New Event Planning Wizard
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Define your celebration envelope. Gemini will synthesize exact budget categorizations, timeline milestones, vendor checklists, and 5 personalized creative ideas.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                  AI Orchestrator
                </span>
                <span className="font-label-md text-label-md font-semibold text-primary">
                  Ready to Synthesize
                </span>
              </div>
              <div className="flex items-center gap-1.5 w-60 h-2 bg-surface-container-high rounded-full overflow-hidden p-0.5 shadow-inner">
                <div className="h-full bg-gradient-to-r from-primary to-secondary-fixed rounded-full w-[85%] shadow-[0_0_12px_rgba(192,193,255,0.6)]" />
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Output: Budget, Timeline, Vendors &amp; Sensory Ideas
              </span>
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-error-container/40 border border-error/30 text-on-error-container flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Icon name="error" className="text-error text-[20px]" />
                <span className="font-body-md text-body-md">{errorMsg}</span>
              </div>
              <button
                type="button"
                onClick={() => setErrorMsg(null)}
                className="text-xs underline hover:no-underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Main Wizard Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter animate-fade-up stagger-2">
            <div className="lg:col-span-8 flex flex-col gap-space-xl">
              {/* Step 1: Typology */}
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-surface-container-high flex items-center justify-center font-label-caps text-label-caps text-secondary font-bold">
                      01
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Event Type / Canvas
                    </h2>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase">
                    Select One Archetype
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  {TYPOLOGY_OPTIONS.map((opt) => {
                    const isSelected = eventType === opt.id
                    return (
                      <div
                        key={opt.id}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        onClick={() => setEventType(opt.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setEventType(opt.id)
                          }
                        }}
                        className={`group relative rounded-xl p-5 transition-all cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-fixed ${
                          isSelected
                            ? 'bg-surface-container/90 border-primary/45 shadow-[0_12px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(192,193,255,0.25)]'
                            : 'bg-surface-container-low/60 hover:bg-surface-container border-outline-variant/15'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center shadow-[0_0_12px_rgba(240,225,195,0.8)]">
                            <Icon name="check" fill className="text-on-secondary-fixed text-[15px]" />
                          </div>
                        )}
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${
                              isSelected
                                ? 'bg-primary text-on-primary shadow-[0_0_16px_rgba(192,193,255,0.3)]'
                                : 'bg-surface-container-highest text-on-surface-variant group-hover:text-primary'
                            }`}
                          >
                            <Icon name={opt.icon} className="text-[26px]" />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-headline-sm text-[16px] text-on-surface font-semibold">
                                {opt.title}
                              </h3>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-secondary-container text-secondary-fixed tracking-wide">
                                {opt.badge}
                              </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                              {opt.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Step 2: Date, City, Guests, Budget */}
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-surface-container-high flex items-center justify-center font-label-caps text-label-caps text-secondary font-bold">
                    02
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Logistics &amp; Target Envelope
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {/* Target Date */}
                  <div className="rounded-xl p-5 bg-surface-container/60 backdrop-blur-md shadow-md border border-outline-variant/15 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="event-date-input" className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                        <Icon name="calendar_month" className="text-secondary text-[16px]" />
                        Target Event Date
                      </label>
                      <span className="font-label-caps text-label-caps text-secondary-fixed uppercase">
                        Date Locked
                      </span>
                    </div>
                    <div className="relative flex items-center rounded-lg bg-surface-container-lowest px-3 py-2 border border-outline-variant/20">
                      <Icon name="event_available" className="text-secondary-fixed text-[20px] mr-2 shrink-0" />
                      <input
                        id="event-date-input"
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="e.g., October 24, 2025"
                        className="w-full bg-transparent font-label-lg text-label-lg font-semibold text-on-surface focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Destination / City */}
                  <div className="rounded-xl p-5 bg-surface-container/60 backdrop-blur-md shadow-md border border-outline-variant/15 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="event-city-input" className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                        <Icon name="location_on" className="text-primary text-[16px]" />
                        Destination / City
                      </label>
                      <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase">
                        Geographic Pin
                      </span>
                    </div>
                    <div className="relative flex items-center rounded-lg bg-surface-container-lowest px-3 py-2 border border-outline-variant/20">
                      <Icon name="pin_drop" className="text-primary text-[20px] mr-2 shrink-0" />
                      <input
                        id="event-city-input"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g., St. Helena & Napa Valley, CA"
                        className="w-full bg-transparent font-label-lg text-label-lg font-semibold text-on-surface focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Guest Count */}
                  <div className="rounded-xl p-5 bg-surface-container/60 backdrop-blur-md shadow-md border border-outline-variant/15 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="guest-range-slider" className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                        <Icon name="group" className="text-secondary text-[16px]" />
                        Curated Guest Attendance
                      </label>
                      <span className="font-label-caps text-label-caps text-secondary-fixed bg-secondary-container/50 px-2 py-0.5 rounded uppercase">
                        {guestCount < 80 ? 'Salon' : guestCount <= 180 ? 'Intimate Luxury' : 'Pavilion'}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-headline-md text-headline-md font-bold text-on-surface">
                        {guestCount} <span className="text-sm font-normal text-on-surface-variant">Attendees</span>
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Range: 30 – 500
                      </span>
                    </div>
                    <div className="relative w-full py-1">
                      <input
                        id="guest-range-slider"
                        aria-label="Curated Guest Attendance"
                        type="range"
                        min="30"
                        max="500"
                        step="5"
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between text-outline-variant font-body-sm text-[11px]">
                      <span>Salon (30)</span>
                      <span className="text-secondary-fixed">Sweet Spot ({guestCount})</span>
                      <span>Grand (500)</span>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="rounded-xl p-5 bg-surface-container/60 backdrop-blur-md shadow-md border border-outline-variant/15 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="budget-range-slider" className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                        <Icon name="account_balance_wallet" className="text-secondary text-[16px]" />
                        Allocated Budget Envelope
                      </label>
                      <span className="font-label-caps text-label-caps text-primary bg-primary-container/20 px-2 py-0.5 rounded uppercase">
                        Exact Sum Reconciled
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-headline-md text-headline-md font-bold text-on-surface">
                        ${budget.toLocaleString()}{' '}
                        <span className="text-sm font-normal text-on-surface-variant">USD</span>
                      </span>
                      <span className="font-body-sm text-body-sm text-secondary-fixed font-medium flex items-center gap-1">
                        <Icon name="trending_up" className="text-[14px]" />
                        ${Math.round(budget / (guestCount || 1))}/guest
                      </span>
                    </div>
                    <div className="relative w-full py-1">
                      <input
                        id="budget-range-slider"
                        aria-label="Allocated Budget Envelope"
                        type="range"
                        min="15000"
                        max="250000"
                        step="2500"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full accent-secondary cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-[11px]">
                      <span>$15k Boutique</span>
                      <span className="text-secondary-fixed">${budget.toLocaleString()} Target</span>
                      <span>$250k Haute</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Aesthetic Vibe */}
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-surface-container-high flex items-center justify-center font-label-caps text-label-caps text-secondary font-bold">
                      03
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Vibe &amp; Aesthetic Mood Synthesis
                    </h2>
                  </div>
                  <span className="font-label-caps text-label-caps text-secondary-fixed flex items-center gap-1">
                    <Icon name="palette" className="text-[13px]" />
                    Atmospheric Tone
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                  {VIBE_OPTIONS.map((v) => {
                    const isSelected = vibe === v.id
                    return (
                      <div
                        key={v.id}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        onClick={() => setVibe(v.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setVibe(v.id)
                          }
                        }}
                        className={`relative group rounded-xl overflow-hidden bg-surface-container-low cursor-pointer flex flex-col transition-all transform hover:-translate-y-1 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-fixed ${
                          isSelected
                            ? 'shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_0_2px_rgba(240,225,195,0.7)] border-secondary-fixed/50'
                            : 'shadow-md border-outline-variant/15 hover:bg-surface-container'
                        }`}
                      >
                        <div className="relative h-44 w-full overflow-hidden">
                          <img
                            src={v.img}
                            alt={v.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/30 to-transparent" />
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-caps text-[9px] uppercase tracking-wider font-bold shadow-md">
                              Selected
                            </div>
                          )}
                          <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${v.dot}`} />
                            <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                              {v.colorLabel}
                            </span>
                          </div>
                        </div>
                        <div className="p-3.5 flex flex-col gap-1">
                          <h4 className="font-headline-sm text-[15px] text-on-surface font-semibold">
                            {v.title}
                          </h4>
                          <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                            {v.desc}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar Summary & Launch Action */}
            <div className="lg:col-span-4 flex flex-col gap-space-lg">
              <div className="sticky top-24 rounded-2xl bg-surface-container/80 backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col gap-space-md border border-outline-variant/20">
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant/15">
                  <div className="flex items-center gap-2.5">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container-high text-primary">
                      <Icon name="neurology" className="text-[18px]" />
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,1)]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">
                        Aura Gemini Core
                      </span>
                      <span className="font-label-caps text-label-caps text-secondary-fixed uppercase">
                        Server-Side Synthesizer
                      </span>
                    </div>
                  </div>
                  <span className="font-label-caps text-label-caps px-2 py-1 rounded bg-surface-container-highest text-primary font-semibold">
                    Structured JSON
                  </span>
                </div>

                {/* Selected Parameters Review */}
                <div className="space-y-2.5 py-1">
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-on-surface-variant">Event Type:</span>
                    <span className="text-on-surface font-semibold">{eventType}</span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-on-surface-variant">Destination:</span>
                    <span className="text-on-surface font-semibold truncate max-w-[180px]">{city}</span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-on-surface-variant">Target Date:</span>
                    <span className="text-on-surface font-semibold">{date}</span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-on-surface-variant">Attendance:</span>
                    <span className="text-secondary-fixed font-semibold">{guestCount} Guests</span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-on-surface-variant">Budget Cap:</span>
                    <span className="text-primary font-bold">${budget.toLocaleString()} USD</span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-on-surface-variant">Atmosphere:</span>
                    <span className="text-secondary-fixed font-semibold">{vibe}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 p-3.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/15 shadow-inner">
                  <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary-fixed">
                    What Gemini Generates:
                  </span>
                  <div className="space-y-1.5 text-[11px] text-on-surface-variant">
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="check_circle" className="text-primary text-[14px]" />
                      <span>Reconciled budget categories summing to ${budget.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="check_circle" className="text-secondary-fixed text-[14px]" />
                      <span>7-stage dated timeline &amp; day-of run-of-show cues</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="check_circle" className="text-tertiary text-[14px]" />
                      <span>Curated vendor checklist with SLA requirements</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="check_circle" className="text-emerald-400 text-[14px]" />
                      <span>5 personalized ideas (Theme, Music/DJ, Lighting, Dining, Space)</span>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    disabled={planGenerating}
                    onClick={handleGenerateBlueprint}
                    className="group relative w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary-container via-primary-fixed-dim to-secondary-fixed text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(128,131,255,0.4),0_0_20px_rgba(240,225,195,0.3)] hover:shadow-[0_12px_40px_rgba(128,131,255,0.6),0_0_30px_rgba(240,225,195,0.5)] transition-all transform active:scale-[0.985] cursor-pointer overflow-hidden disabled:opacity-50"
                  >
                    {planGenerating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border-2 border-on-primary border-t-transparent animate-spin" />
                        <span className="tracking-wide">Synthesizing with Gemini...</span>
                      </div>
                    ) : (
                      <>
                        <Icon
                          name="auto_awesome"
                          fill
                          className="text-[20px] transition-transform duration-500 group-hover:rotate-180"
                        />
                        <span className="tracking-wide">Generate My Plan</span>
                        <Icon
                          name="arrow_forward"
                          className="text-[18px] transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-on-surface-variant font-body-sm text-[11px] text-center pt-1">
                    <Icon name="lock" className="text-secondary-fixed text-[14px]" />
                    <span>Protected by Server-Side Gemini API &amp; Local Persistence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
