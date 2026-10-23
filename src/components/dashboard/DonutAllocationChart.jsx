import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { DONUT_SEGMENTS, DONUT_LEGEND } from '../../data/dashboardData.js'

const labelCaps = 'font-label-caps text-label-caps'

function DonutAllocationChartComponent({ budget = 75000 }) {
  const [activeSegment, setActiveSegment] = useState(null)
  const selectedDonut = DONUT_SEGMENTS.find((d) => d.id === activeSegment)

  return (
    <div className="lg:col-span-5 p-6 rounded-2xl aura-surface-card flex flex-col justify-between gap-6 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="pie_chart" className="text-secondary-fixed text-[20px]" />
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Capital Allocation
          </h2>
        </div>
        <span className={`${labelCaps} text-secondary-fixed/90 px-2 py-0.5 rounded-full bg-secondary-container/40 border border-secondary-fixed/20`}>
          Cap: ${budget.toLocaleString()}
        </span>
      </div>

      {/* SVG Donut Visualizer */}
      <div className="relative flex items-center justify-center my-2">
        <svg
          viewBox="0 0 160 160"
          className="w-48 h-48 -rotate-90 filter drop-shadow-[0_0_16px_rgba(192,193,255,0.15)]"
        >
          {DONUT_SEGMENTS.map((seg) => (
            <circle
              key={seg.id}
              cx="80"
              cy="80"
              r="62"
              fill="transparent"
              stroke={seg.stroke}
              strokeWidth={activeSegment === seg.id ? '18' : '14'}
              strokeDasharray={seg.dash}
              strokeDashoffset={seg.offset}
              className="transition-all duration-300 cursor-pointer hover:opacity-100"
              style={{ opacity: activeSegment && activeSegment !== seg.id ? 0.35 : 0.95 }}
              onMouseEnter={() => setActiveSegment(seg.id)}
              onMouseLeave={() => setActiveSegment(null)}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="font-headline-md text-[20px] font-semibold text-on-surface tracking-tight">
            {selectedDonut ? selectedDonut.amount : '$75,000'}
          </span>
          <span className={`${labelCaps} text-secondary-fixed text-[10px] uppercase tracking-wider`}>
            {selectedDonut ? selectedDonut.name : 'Allocated'}
          </span>
        </div>
      </div>

      {/* Segment Legend */}
      <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/[0.05]">
        {DONUT_LEGEND.map((l) => (
          <button
            key={l.id}
            type="button"
            onMouseEnter={() => setActiveSegment(l.id)}
            onMouseLeave={() => setActiveSegment(null)}
            className={`p-2 rounded-xl text-left transition-all flex flex-col gap-0.5 cursor-pointer ${
              activeSegment === l.id
                ? 'bg-surface-container-highest ring-1 ring-white/10'
                : 'hover:bg-surface-container-high/60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${l.dot}`} />
              <span className="font-label-md text-[12px] text-on-surface truncate">
                {l.name}
              </span>
            </div>
            <div className="flex items-baseline justify-between pl-3.5">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                {l.amount}
              </span>
              <span className={`font-label-caps text-[10px] ${l.text}`}>{l.pct}</span>
            </div>
          </button>
        ))}
      </div>

      <Link
        to="/budget"
        className="w-full py-2.5 px-4 rounded-xl bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 border border-white/[0.05] transition-all"
      >
        <Icon name="account_balance_wallet" className="text-[16px] text-secondary-fixed" />
        <span>Manage Escrow Ledger & Disbursals</span>
      </Link>
    </div>
  )
}

export default memo(DonutAllocationChartComponent)
