import { useState, memo } from 'react'

function SpatialMapSimulationComponent() {
  const [viewMode, setViewMode] = useState('2d') // '2d' | '3d'
  const [activeCue, setActiveCue] = useState(null)

  const triggerTestCue = (cueName) => {
    setActiveCue(cueName)
    setTimeout(() => setActiveCue(null), 2000)
  }

  return (
    <div className="lg:col-span-5 flex flex-col gap-space-lg">
      <div className="p-6 rounded-2xl bg-surface-container-low/70 backdrop-blur-xl shadow-xl flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-label-caps text-label-caps uppercase text-secondary-fixed tracking-wider">
              Spatial Simulation
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Meadowwood Pavilion Plan
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded-lg">
            <button
              onClick={() => setViewMode('2d')}
              className={`px-2 py-0.5 rounded text-label-caps font-label-caps cursor-pointer transition-colors ${
                viewMode === '2d'
                  ? 'bg-surface-bright text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              2D MAP
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-2 py-0.5 rounded text-label-caps font-label-caps cursor-pointer transition-colors ${
                viewMode === '3d'
                  ? 'bg-surface-bright text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              ISO 3D
            </button>
          </div>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Interactive acoustic field simulation mapping speaker decay, dance floor SPL zones, and wireless DMX architectural plinths.
        </p>
        <div className="relative w-full aspect-[4/3] rounded-xl bg-surface-container-lowest p-3 overflow-hidden shadow-inner flex items-center justify-center">
          <svg className="w-full h-full max-h-[320px]" fill="none" viewBox="0 0 400 300">
            <rect className="text-outline-variant/40" height="260" rx="16" stroke="currentColor" strokeDasharray="6 4" strokeWidth="1.5" width="360" x="20" y="20" />
            <circle className="fill-surface-bright stroke-secondary/50" cx="36" cy="36" r="6" />
            <circle className="fill-surface-bright stroke-secondary/50" cx="364" cy="36" r="6" />
            <circle className="fill-surface-bright stroke-secondary/50" cx="36" cy="264" r="6" />
            <circle className="fill-surface-bright stroke-secondary/50" cx="364" cy="264" r="6" />
            <ellipse className="fill-primary/10 stroke-primary/30" cx="200" cy="55" rx="80" ry="45" strokeDasharray="3 3" />
            <ellipse className="fill-primary/5 stroke-primary/15" cx="200" cy="55" rx="140" ry="85" strokeDasharray="4 4" />
            <ellipse className="fill-secondary/5 stroke-secondary/10" cx="200" cy="55" rx="190" ry="120" />
            <rect className="fill-surface-container-high stroke-secondary-fixed/70" height="42" rx="6" strokeWidth="1.5" width="100" x="150" y="32" />
            <text className="fill-secondary-fixed text-[9px] font-sans font-bold tracking-wider" textAnchor="middle" x="200" y="52">
              STAGE • DJ KAI
            </text>
            <text className="fill-on-surface-variant text-[7px] font-mono" textAnchor="middle" x="200" y="65">
              DMX HEAD 01-04
            </text>
            <rect className="fill-surface-container/70 stroke-primary-fixed/40" height="95" rx="12" strokeWidth="1.5" width="170" x="115" y="92" />
            <text className="fill-on-surface text-[10px] font-semibold tracking-wide" textAnchor="middle" x="200" y="142">
              DANCE FLOOR (88 dB)
            </text>
            <text className="fill-secondary-fixed-dim text-[8px] font-mono" textAnchor="middle" x="200" y="156">
              SUB HARMONIC ARRAY
            </text>
            <g className="cursor-pointer">
              <circle className="fill-secondary-container stroke-secondary-fixed animate-pulse" cx="95" cy="110" r="8" />
              <circle className="fill-secondary-container stroke-secondary-fixed animate-pulse" cx="305" cy="110" r="8" />
              <circle className="fill-secondary-container stroke-secondary-fixed animate-pulse" cx="95" cy="170" r="8" />
              <circle className="fill-secondary-container stroke-secondary-fixed animate-pulse" cx="305" cy="170" r="8" />
            </g>
            <circle className="fill-surface-container stroke-outline-variant/40" cx="70" cy="225" r="22" />
            <text className="fill-on-surface text-[8px] font-semibold" textAnchor="middle" x="70" y="228">
              T-01
            </text>
            <circle className="fill-surface-container stroke-outline-variant/40" cx="155" cy="235" r="22" />
            <text className="fill-on-surface text-[8px] font-semibold" textAnchor="middle" x="155" y="238">
              T-02
            </text>
            <circle className="fill-surface-container stroke-outline-variant/40" cx="245" cy="235" r="22" />
            <text className="fill-on-surface text-[8px] font-semibold" textAnchor="middle" x="245" y="238">
              T-03
            </text>
            <circle className="fill-surface-container stroke-outline-variant/40" cx="330" cy="225" r="22" />
            <text className="fill-on-surface text-[8px] font-semibold" textAnchor="middle" x="330" y="228">
              T-04
            </text>
            <text className="fill-on-surface-variant text-[8px] tracking-widest font-mono" textAnchor="middle" x="200" y="278">
              NORTH TERRACE GLASS FACADE
            </text>
          </svg>
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-surface-dim/90 backdrop-blur-md text-[10px] text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed" /> DMX Uplights
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" /> Peak SPL Zone
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-surface-bright" /> Acoustic Buffer
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-surface-container flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              Ceiling Glass Reverb
            </span>
            <span className="font-headline-sm text-headline-sm text-secondary-fixed">
              0.82s RT60
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Optimized via drapes
            </span>
          </div>
          <div className="p-3 rounded-xl bg-surface-container flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              Terrace Spill Shield
            </span>
            <span className="font-headline-sm text-headline-sm text-primary">
              Active
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Neighborhood curfew safe
            </span>
          </div>
        </div>
        <button
          className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-lg text-label-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">view_in_ar</span>{' '}
          Calibrate Sound Decibel Ceiling
        </button>
      </div>

      <div className="p-5 rounded-2xl bg-surface-container-low/70 backdrop-blur-xl shadow-xl flex flex-col gap-3">
        <span className="font-label-caps text-label-caps uppercase text-secondary-fixed tracking-wider">
          Automated Scene Triggers
        </span>
        <div
          onClick={() => triggerTestCue('cake')}
          className="flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">cake</span>
            <div>
              <span className="font-label-lg text-label-lg text-on-surface font-medium block">
                Cake Cutting Spotlight Solo
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Dims outer perimeter 80% • Follow spot #2
              </span>
            </div>
          </div>
          <span className="font-label-caps text-label-caps px-2 py-1 rounded bg-surface-bright text-secondary-fixed">
            {activeCue === 'cake' ? 'FIRING CUE...' : 'TEST CUE'}
          </span>
        </div>
        <div
          onClick={() => triggerTestCue('dance')}
          className="flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
            <div>
              <span className="font-label-lg text-label-lg text-on-surface font-medium block">
                First Dance Cold Spark Flare
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                DMX Gerb launch sync • Soft violin crossfade
              </span>
            </div>
          </div>
          <span className="font-label-caps text-label-caps px-2 py-1 rounded bg-surface-bright text-primary">
            {activeCue === 'dance' ? 'FIRING CUE...' : 'TEST CUE'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(SpatialMapSimulationComponent)
