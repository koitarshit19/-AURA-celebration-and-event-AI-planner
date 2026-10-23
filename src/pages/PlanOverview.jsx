import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useAura } from '../context/AuraContext.jsx'
import PlanHeroBanner from '../components/plan/PlanHeroBanner.jsx'
import PlanIdeasGrid from '../components/plan/PlanIdeasGrid.jsx'
import PlanTimelineMilestones from '../components/plan/PlanTimelineMilestones.jsx'
import PlanBudgetAllocationBar from '../components/plan/PlanBudgetAllocationBar.jsx'

export default function PlanOverview() {
  const { activePlan, setCopilotOpen } = useAura()
  const [copied, setCopied] = useState(false)
  const [exported, setExported] = useState(false)
  const [synced, setSynced] = useState(false)
  const [queryInput, setQueryInput] = useState('')

  const plan = activePlan || {}
  const eventName = plan.eventName || "Julian & Maya's Autumn Gala"
  const eventType = plan.eventType || 'Weddings & Galas'
  const city = plan.city || 'St. Helena & Napa Valley, CA'
  const date = plan.date || 'October 24, 2025'
  const guestCount = plan.guestCount || 135
  const budget = plan.budget || 75000
  const vibe = plan.vibe || 'Romantic & Ethereal'
  const summary =
    plan.summary ||
    'A curated luxury celebration calibrated for seamless pacing, candlelight ambience, and sensory acoustic elevation.'
  const vitalityScore = plan.vitalityScore || 98
  const budgetBreakdown = plan.budgetBreakdown || []
  const timeline = plan.timeline || []
  const vendorChecklist = plan.vendorChecklist || []
  const personalizedIdeas = plan.personalizedIdeas || []

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExportPdf = () => {
    setExported(true)
    setTimeout(() => setExported(false), 2500)
  }

  const handleSync = () => {
    setSynced(true)
    setTimeout(() => setSynced(false), 2500)
  }

  const handleQuickAsk = (promptText) => {
    setCopilotOpen(true)
    setTimeout(() => {
      const el = document.getElementById('aura-floating-input')
      if (el) {
        el.value = promptText
        el.focus()
      }
    }, 100)
  }

  return (
    <div className="flex flex-col w-full animate-fade-up">
      <div className="relative w-full overflow-hidden pb-space-xl">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-1/3 w-[600px] h-[350px] bg-secondary-container/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-[450px] h-[450px] bg-primary-container/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-margin-sm lg:px-margin space-y-space-xl pt-space-md">
          {/* Top Masterplan Hero */}
          <PlanHeroBanner
            eventName={eventName}
            eventType={eventType}
            city={city}
            date={date}
            guestCount={guestCount}
            budget={budget}
            vibe={vibe}
            summary={summary}
            vitalityScore={vitalityScore}
            onCopyLink={handleCopyLink}
            copied={copied}
            onExportPdf={handleExportPdf}
            exported={exported}
            onSyncCloud={handleSync}
            synced={synced}
          />

          {/* 5 Bespoke Directives / Personalized Ideas */}
          <PlanIdeasGrid
            ideas={personalizedIdeas}
            onExploreIdea={(idea) =>
              handleQuickAsk(`Tell me more details about: ${idea.title}`)
            }
          />

          {/* Timeline & Milestones */}
          <PlanTimelineMilestones
            timeline={timeline}
            eventName={eventName}
          />

          {/* Budget Allocation & Capital Flow */}
          <PlanBudgetAllocationBar
            budget={budget}
            budgetBreakdown={budgetBreakdown}
          />

          {/* Vendor Sourcing Strip */}
          <section className="p-space-md rounded-2xl bg-surface-container/70 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-md border border-white/[0.05]">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shadow-[0_0_16px_rgba(192,193,255,0.2)]">
                <Icon name="handshake" className="text-[26px]" />
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Curated Vendor Checklist ({vendorChecklist.length} Vendors Calibrated)
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Automated SLA governance and contracts tailored for {city}
                </p>
              </div>
            </div>
            <Link
              to="/vendors"
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_16px_rgba(192,193,255,0.3)] shrink-0"
            >
              <span>Manage Vendors</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </section>

          {/* Quick Prompt & Master Sync Bottom Bar */}
          <section className="sticky bottom-6 z-30">
            <div className="p-2 sm:p-3 rounded-2xl bg-surface-container-high/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/[0.08]">
              <div className="flex flex-col md:flex-row items-center gap-space-sm">
                <div className="relative flex-1 w-full flex items-center">
                  <div className="absolute left-4 flex items-center gap-2 pointer-events-none text-secondary">
                    <Icon name="auto_awesome" className="text-[20px] animate-pulse" />
                  </div>
                  <input
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && queryInput.trim()) {
                        handleQuickAsk(queryInput)
                        setQueryInput('')
                      }
                    }}
                    className="w-full h-12 pl-12 pr-12 rounded-xl bg-surface-container-lowest/90 text-on-surface placeholder:text-outline-variant font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                    placeholder={`Ask Aura to refine ${eventName}'s budget, vendors, schedule, music or lighting...`}
                    type="text"
                  />
                  <button
                    onClick={() => {
                      if (queryInput.trim()) {
                        handleQuickAsk(queryInput)
                        setQueryInput('')
                      }
                    }}
                    className="absolute right-3 p-1.5 rounded-lg bg-surface-container-high text-on-surface hover:text-secondary-fixed transition-colors cursor-pointer"
                    title="Send Prompt to Aura Copilot"
                    type="button"
                  >
                    <Icon name="north_east" className="text-[18px]" />
                  </button>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                  <button
                    onClick={handleSync}
                    className={`w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-label-lg text-label-lg font-semibold shadow-[0_0_20px_rgba(240,225,195,0.3)] transition-all cursor-pointer ${
                      synced
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-secondary-fixed to-secondary text-on-secondary-fixed hover:brightness-105 active:scale-95'
                    }`}
                    type="button"
                  >
                    <Icon name={synced ? 'done_all' : 'sync_alt'} className="text-[18px]" />
                    <span>{synced ? 'All Calendars & Vendors Synced' : 'Sync to Master Schedule'}</span>
                  </button>
                </div>
              </div>

              {/* Suggested Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2.5 px-2">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                  Suggested Directives:
                </span>
                <button
                  onClick={() => handleQuickAsk(`What are top DJ and music recommendations for ${vibe}?`)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-surface-container-lowest/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors font-body-sm text-body-sm cursor-pointer"
                  type="button"
                >
                  “DJ &amp; music playlist ideas”
                </button>
                <button
                  onClick={() => handleQuickAsk(`Suggest warm 2400K ambient lighting cues for ${city}`)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-surface-container-lowest/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors font-body-sm text-body-sm cursor-pointer"
                  type="button"
                >
                  “Lighting &amp; sensory ambience cues”
                </button>
                <button
                  onClick={() => handleQuickAsk(`How should we distribute our $${budget.toLocaleString()} budget to save 10%?`)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-surface-container-lowest/60 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors font-body-sm text-body-sm cursor-pointer"
                  type="button"
                >
                  “Budget optimization suggestions”
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
