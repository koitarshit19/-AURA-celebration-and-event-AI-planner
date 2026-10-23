import { memo } from 'react'
import Icon from '../Icon.jsx'
import { getIdeaIcon } from '../../utils/categories.js'

function PlanIdeasGridComponent({ ideas = [], onExploreIdea }) {
  return (
    <section className="space-y-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <div className="w-2.5 h-6 rounded-full bg-gradient-to-b from-secondary to-primary" />
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Curated Celebration Design &amp; Sensory Themes
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Tailored concepts synthesized by Aura Celebration Architect for sensory immersion
            </p>
          </div>
        </div>
        <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider bg-secondary-container/40 px-3 py-1 rounded-full border border-secondary-fixed/20">
          5 Bespoke Directives
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {ideas.map((idea, idx) => {
          const iconName = getIdeaIcon(idea.type || idea.category || '')
          return (
            <div
              key={idx}
              className="relative group rounded-2xl bg-surface-container/70 backdrop-blur-xl overflow-hidden p-space-md flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.45)] hover:-translate-y-1 transition-all duration-300 border border-white/[0.05]"
            >
              <div className="space-y-space-sm">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary-fixed shadow-[0_0_16px_rgba(240,225,195,0.25)]">
                    <Icon name={iconName} className="text-[24px]" />
                  </div>
                  <span className="font-label-caps text-label-caps text-secondary-fixed bg-secondary-container/30 px-2.5 py-1 rounded-full uppercase border border-secondary-fixed/20">
                    {idea.type || idea.category || 'Creative Concept'}
                  </span>
                </div>

                <div className="space-y-space-xs pt-2">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary-fixed transition-colors">
                    {idea.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {idea.description}
                  </p>
                </div>
              </div>

              <div className="pt-space-md mt-space-sm flex items-center justify-between border-t border-white/[0.06]">
                <span className="font-label-caps text-label-caps text-secondary-fixed-dim">
                  {idea.aestheticDetail || 'Autonomous Directive'}
                </span>
                <button
                  onClick={() => onExploreIdea(idea)}
                  className="flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-secondary-fixed transition-colors cursor-pointer"
                  type="button"
                >
                  <span>Explore</span>
                  <Icon name="arrow_forward" className="text-[16px]" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default memo(PlanIdeasGridComponent)
