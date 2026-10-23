import { memo } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { METRICS } from '../../data/dashboardData.js'

const labelCaps = 'font-label-caps text-label-caps'

function MetricsRowComponent() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md animate-fade-up stagger-4">
      {METRICS.map((m) => (
        <Link
          key={m.label}
          to={m.to}
          className="p-5 rounded-2xl aura-surface-card hover:bg-surface-container-high/90 transition-all duration-300 flex flex-col justify-between gap-4 group relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-primary/40"
        >
          <div className="flex items-center justify-between">
            <span className={`${labelCaps} text-on-surface-variant uppercase tracking-wider`}>
              {m.label}
            </span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${m.iconBg} ${m.iconCls}`}
            >
              <Icon name={m.icon} className="text-[18px]" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg font-semibold tracking-tight text-on-surface">
              {m.value}
            </span>
            <span className={`font-body-md text-body-md ${m.unitCls}`}>{m.unit}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${m.bar}`}
                style={{ width: m.width }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-label-md">
              <span className="text-on-surface-variant">{m.left}</span>
              <span className={`font-medium ${m.rightCls}`}>{m.right}</span>
            </div>
          </div>
        </Link>
      ))}
    </section>
  )
}

export default memo(MetricsRowComponent)
