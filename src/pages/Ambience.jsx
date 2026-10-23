import { useState } from 'react'
import MoodSelector from '../components/ambience/MoodSelector.jsx'
import AcousticEnergyCurve from '../components/ambience/AcousticEnergyCurve.jsx'
import HeadlineArtistCard from '../components/ambience/HeadlineArtistCard.jsx'
import SpatialMapSimulation from '../components/ambience/SpatialMapSimulation.jsx'
import { AMBIENCE_MOODS } from '../data/ambienceData.js'

export default function Ambience() {
  const [currentMood, setCurrentMood] = useState('gold')
  const activeMoodObj = AMBIENCE_MOODS.find((m) => m.id === currentMood) || AMBIENCE_MOODS[0]

  return (
    <>
      <div className="flex flex-col w-full relative animate-fade-up">
        {/* Dynamic Atmospheric Color Engine Background */}
        <div
          className="pointer-events-none fixed inset-0 -z-10 transition-all duration-1000 ease-out"
          style={{ background: activeMoodObj.gradient }}
        />

        {/* Section Header */}
        <section className="w-full max-w-7xl mx-auto px-margin-sm lg:px-margin pt-6 pb-4 animate-fade-up stagger-1">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-secondary-fixed text-label-caps font-label-caps uppercase tracking-widest shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping" />
                  {' '}
                  Aura Sonic &amp; Spatial Engine
                </span>
                <span className="text-outline text-label-caps font-label-caps">
                  // STUDIO DEPLOYMENT 05
                </span>
              </div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface tracking-tight">
                  Ambience &amp; Acoustic Studio
                </h1>
                <span className="font-label-md text-label-md text-secondary-fixed-dim hidden sm:inline">
                  Meadowwood Glass Pavilion
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-container/70 backdrop-blur-xl shadow-lg border-0 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <div className="relative flex items-center justify-center w-3 h-3">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-pulse" />
                <span className="absolute inset-0 rounded-full bg-secondary-fixed/30 blur-sm" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">
                    DMX Fixtures Synced
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-bright text-secondary-fixed font-mono">
                    12/12 ONLINE
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-secondary">
                    wb_twilight
                  </span>
                  {' '}
                  Lux level calibrating to Golden Hour (2,100K • 48 Lux)
                </span>
              </div>
              <div className="h-8 w-px bg-surface-bright hidden sm:block" />
              <button
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright transition-colors text-primary font-label-md text-label-md cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                Overdrive
              </button>
            </div>
          </div>
        </section>

        {/* Reactive Mood Selector */}
        <MoodSelector
          currentMood={currentMood}
          onSelectMood={setCurrentMood}
        />

        {/* 2-Column Grid: Acoustic Choreography vs Spatial Simulation */}
        <div className="w-full max-w-7xl mx-auto px-margin-sm lg:px-margin grid grid-cols-1 lg:grid-cols-12 gap-gutter my-space-sm pb-16">
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <AcousticEnergyCurve />
            <HeadlineArtistCard />
          </div>

          <SpatialMapSimulation />
        </div>
      </div>
    </>
  )
}
