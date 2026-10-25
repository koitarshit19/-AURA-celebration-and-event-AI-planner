import { memo } from 'react'
import { AMBIENCE_MOODS } from '../../data/ambienceData.js'

/**
 * MoodSelectorComponent allows users to select a spatial lighting and ambiance mood.
 * 
 * @param {Object} props - Component props
 * @param {string} props.currentMood - The ID of the currently selected mood
 * @param {Function} props.onSelectMood - Callback function fired when a mood button is clicked
 */
function MoodSelectorComponent({ currentMood, onSelectMood }) {
  const activeMoodObj = AMBIENCE_MOODS.find((m) => m.id === currentMood) || AMBIENCE_MOODS[0]

  return (
    <section 
      className="w-full max-w-7xl mx-auto px-margin-sm lg:px-margin my-space-md animate-fade-up stagger-2"
      aria-label="Interactive Master Environment: Spatial Lighting Mood Selector"
    >
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary-fixed">
              Interactive Master Environment
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              Spatial Lighting Mood Selector{' '}
              <span 
                className="material-symbols-outlined text-[18px] text-secondary" 
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                light_mode
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              Adaptive Photometrics
            </span>
            <span 
              className={`px-2.5 py-1 rounded-full font-label-caps text-label-caps font-semibold tracking-wider ${activeMoodObj.tagCls}`}
              aria-live="polite"
            >
              {activeMoodObj.tag}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3" role="group" aria-label="Mood options">
          {AMBIENCE_MOODS.map((mood) => {
            const isSelected = currentMood === mood.id
            return (
              <button
                key={mood.id}
                type="button"
                onClick={() => onSelectMood(mood.id)}
                aria-pressed={isSelected}
                aria-label={`Select ${mood.name} mood.${mood.desc}`}
                className={`group relative text-left p-4 rounded-xl transition-all duration-500 overflow-hidden cursor-pointer ${
                  isSelected
                    ? `bg-surface-container-high/90 ${mood.ringCls}`
                    : 'bg-surface-container/60 hover:bg-surface-container-high/70 shadow-none'
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-secondary-fixed/15 via-transparent to-transparent transition-opacity ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-inner ${mood.iconBg}`}
                      aria-hidden="true"
                    >
                      <span className={`material-symbols-outlined text-[20px] ${mood.iconColor}`}>
                        {mood.icon}
                      </span>
                    </div>
                    <div>
                      <span className="font-headline-sm text-headline-sm text-on-surface block leading-tight">
                        {mood.name}
                      </span>
                      <span className="font-label-caps text-label-caps text-secondary-fixed-dim">
                        {mood.subtitle}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? mood.indicatorBg : 'bg-surface-bright'
                    }`}
                    aria-hidden="true"
                  >
                    <span className={`w-1
