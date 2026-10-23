import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { useAura } from '../context/AuraContext.jsx'
import TimelineNode from '../components/schedule/TimelineNode.jsx'
import WeatherRadarCard from '../components/schedule/WeatherRadarCard.jsx'

export default function Schedule() {
  const { activePlan, setCopilotOpen } = useAura()
  const [activeTab, setActiveTab] = useState('dayof') // 'dayof' | 'countdown'

  const plan = activePlan || {}
  const eventName = plan.eventName || "Julian & Maya's Autumn Gala"
  const date = plan.date || 'October 24, 2025'
  const city = plan.city || 'St. Helena & Napa Valley, CA'
  const guestCount = plan.guestCount || 135
  const timeline = plan.timeline || []

  // Split into Day-of cues vs Countdown milestones
  const dayOfItems = timeline.filter(
    (item) =>
      (item.phase || '').toLowerCase().includes('day-of') ||
      (item.timing || '').includes(':') ||
      (item.timing || '').toLowerCase().includes('am') ||
      (item.timing || '').toLowerCase().includes('pm')
  )

  const countdownItems = timeline.filter(
    (item) =>
      !(item.phase || '').toLowerCase().includes('day-of') &&
      !(item.timing || '').includes(':') &&
      !(item.timing || '').toLowerCase().includes('am') &&
      !(item.timing || '').toLowerCase().includes('pm')
  )

  const displayedItems =
    activeTab === 'dayof'
      ? dayOfItems.length > 0
        ? dayOfItems
        : timeline
      : countdownItems.length > 0
      ? countdownItems
      : timeline

  const handleRepaceSchedule = () => {
    setCopilotOpen(true)
    setTimeout(() => {
      const el = document.getElementById('aura-floating-input')
      if (el) {
        el.value = `How should we adjust the timing cues for ${eventName} to ensure smooth transitions?`
        el.focus()
      }
    }, 100)
  }

  return (
    <div className="flex flex-col w-full animate-fade-up">
      <div className="relative w-full overflow-hidden pb-space-xl">
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-32 right-1/4 w-[500px] h-[350px] bg-tertiary-container/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-[420px] h-[420px] bg-secondary-container/20 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-margin-sm lg:px-margin space-y-space-lg">
          {/* HEADER SECTION */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pt-space-md animate-fade-up stagger-1">
            <div className="space-y-space-xs max-w-2xl">
              <div className="flex flex-wrap items-center gap-space-sm">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/40 text-secondary-fixed font-label-caps text-label-caps uppercase tracking-widest shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping" />
                  Live Sync Matrix
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  <Icon name="verified" className="text-[15px] text-primary" />
                  Algorithmic Time Buffer: +25m Nominal
                </span>
              </div>

              <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface tracking-tight">
                Event Master Schedule:{' '}
                <span className="text-secondary-fixed">{eventName}</span>
              </h1>

              <p className="font-body-md text-body-md text-on-surface-variant">
                {city} • {date} • {guestCount} Confirmed Guests • High-fidelity run-of-show automated pacing.
              </p>
            </div>

            {/* TAB CONTROLS */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-surface-container-low shadow-inner shrink-0 self-start lg:self-auto border border-white/[0.05]">
              <button
                onClick={() => setActiveTab('dayof')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  activeTab === 'dayof'
                    ? 'bg-surface-container-highest text-primary shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
                type="button"
              >
                <Icon name="view_timeline" className="text-[18px]" />
                <span>Day-of Run of Show ({dayOfItems.length || timeline.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('countdown')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  activeTab === 'countdown'
                    ? 'bg-surface-container-highest text-primary shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
                type="button"
              >
                <Icon name="calendar_month" className="text-[18px]" />
                <span>Milestone Countdown ({countdownItems.length || timeline.length})</span>
              </button>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start animate-fade-up stagger-2">
            {/* TIMELINE COLUMN */}
            <div className="lg:col-span-8 space-y-space-md">
              {/* CURRENT PHASE BANNER */}
              <div className="p-space-md rounded-2xl bg-surface-container-low/70 backdrop-blur-xl shadow-xl flex flex-wrap items-center justify-between gap-space-md border border-white/[0.04]">
                <div className="flex items-center gap-space-md">
                  <div className="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary-fixed shadow-sm">
                    <Icon name="timelapse" className="text-[24px]" />
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps uppercase text-secondary-fixed-dim">
                      Active Celebration Matrix
                    </p>
                    <p className="font-headline-sm text-headline-sm text-on-surface">
                      {activeTab === 'dayof'
                        ? 'Master Day-of Run-of-Show Protocol'
                        : 'Pre-Event Milestone Calibration'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm text-right">
                  <div>
                    <div className="font-headline-sm text-headline-sm text-tertiary">
                      {displayedItems.length} Cues
                    </div>
                    <div className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                      Synchronized
                    </div>
                  </div>
                </div>
              </div>

              {/* TIMELINE NODES */}
              <div className="space-y-space-md pt-space-xs">
                {displayedItems.map((item, idx) => (
                  <TimelineNode
                    key={idx}
                    item={item}
                    idx={idx}
                    isLast={idx === displayedItems.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Weather & Re-pace AI Sidebar */}
            <WeatherRadarCard
              city={city}
              date={date}
              eventName={eventName}
              onRepaceSchedule={handleRepaceSchedule}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
