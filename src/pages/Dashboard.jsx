import { useAura } from '../context/AuraContext.jsx'
import EventHero from '../components/dashboard/EventHero.jsx'
import MetricsRow from '../components/dashboard/MetricsRow.jsx'
import DonutAllocationChart from '../components/dashboard/DonutAllocationChart.jsx'
import DirectivesList from '../components/dashboard/DirectivesList.jsx'
import GalleryConciergeSection from '../components/dashboard/GalleryConciergeSection.jsx'

export default function Dashboard() {
  const { tasks, addTask, toggleTask, activePlan } = useAura()

  const plan = activePlan || {}
  const eventName = plan.eventName || "Julian & Maya's Autumn Gala"
  const city = plan.city || 'Meadowood Estate, Napa Valley'
  const date = plan.date || 'October 24, 2025'
  const guestCount = plan.guestCount || 135
  const budget = plan.budget || 75000

  return (
    <>
      {/* Hero with countdown & next best action */}
      <EventHero
        eventName={eventName}
        city={city}
        date={date}
        guestCount={guestCount}
        budget={budget}
      />

      <div className="w-full max-w-7xl mx-auto px-margin-sm lg:px-margin flex flex-col gap-space-xl pb-space-xl">
        {/* KPI Metrics */}
        <MetricsRow />

        {/* Core Orchestration: Directives & Capital Allocation Donut */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start animate-fade-up stagger-5">
          <DirectivesList
            tasks={tasks}
            addTask={addTask}
            toggleTask={toggleTask}
          />
          <DonutAllocationChart budget={budget} />
        </section>

        {/* Live Aesthetic Simulation & Geographic Enclave */}
        <GalleryConciergeSection />
      </div>
    </>
  )
}
