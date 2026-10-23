export default function PageLoadingFallback() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-secondary-fixed/20 border-t-secondary-fixed animate-spin" />
        <div className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center shadow-[0_0_16px_rgba(240,225,195,0.4)]">
          <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest">
          Aura Nocturne Luminary
        </span>
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          Calibrating Celebration Matrix...
        </span>
      </div>
    </div>
  )
}
