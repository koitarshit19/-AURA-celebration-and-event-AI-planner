import { memo } from 'react'
import Icon from '../Icon.jsx'

function WeatherRadarCardComponent({ city, date, eventName, onRepaceSchedule }) {
  return (
    <div className="lg:col-span-4 space-y-space-md">
      {/* MICRO-RADAR WEATHER */}
      <div className="p-space-lg rounded-2xl bg-surface-container-low/80 backdrop-blur-xl shadow-xl space-y-space-md border border-white/[0.05]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="radar" className="text-secondary-fixed text-[22px]" />
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Micro-Radar Weather
            </h2>
          </div>
          <span className="font-label-caps text-label-caps uppercase text-secondary-fixed px-2 py-0.5 rounded bg-secondary-container/40">
            {city.split(',')[0]}
          </span>
        </div>

        <div className="flex items-center justify-between bg-surface-container-high/40 p-space-md rounded-xl border border-white/[0.04]">
          <div>
            <div className="font-headline-xl text-headline-xl text-on-surface font-bold">
              71°<span className="text-secondary-fixed text-headline-md">F</span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              Ideal Ambient Profile
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-tertiary font-label-md text-label-md">
              <Icon name="water_drop" className="text-[16px]" />
              0% Rain Risk
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Target Date: {date}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-lg bg-surface-container-high/30">
            <span className="font-label-caps text-label-caps uppercase text-outline-variant block">
              Wind
            </span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              4 mph NW
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container-high/30">
            <span className="font-label-caps text-label-caps uppercase text-outline-variant block">
              Humidity
            </span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              42%
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container-high/30">
            <span className="font-label-caps text-label-caps uppercase text-outline-variant block">
              Golden Hr
            </span>
            <span className="font-label-md text-label-md text-secondary-fixed font-semibold">
              17:42
            </span>
          </div>
        </div>
      </div>

      {/* QUICK RE-PACING & COPILOT CARD */}
      <div className="p-space-lg rounded-2xl bg-surface-container-low/80 backdrop-blur-xl shadow-xl space-y-space-md border border-white/[0.05]">
        <div className="flex items-center gap-2">
          <Icon name="auto_awesome" className="text-primary text-[20px]" />
          <h3 className="font-headline-sm text-headline-sm text-on-surface">
            Aura Schedule Architect
          </h3>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Need to adjust call sheets, buffer guest arrival times, or sync acoustic lighting transitions for {eventName}?
        </p>
        <button
          onClick={onRepaceSchedule}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-secondary-fixed to-secondary text-on-secondary-fixed font-label-md text-label-md font-semibold hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(240,225,195,0.25)] cursor-pointer"
        >
          <Icon name="tune" className="text-[18px]" />
          <span>Re-Pace Schedule with AI</span>
        </button>
      </div>
    </div>
  )
}

export default memo(WeatherRadarCardComponent)
