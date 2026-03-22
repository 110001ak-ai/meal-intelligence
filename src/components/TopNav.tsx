'use client'
import { useMealStore } from '@/store/mealStore'

export function TopNav() {
  const { step, totalSteps, goBack } = useMealStore()
  const progress = (step / totalSteps) * 100

  return (
    <div className="sticky top-0 z-40 bg-bg px-5 pt-[18px] pb-0">
      <div className="flex items-center gap-[14px] mb-4">
        {/* Back button */}
        <button
          type="button"
          onClick={goBack}
          className={`
            w-8 h-8 rounded-full border-[1.5px] border-bd bg-card flex items-center justify-center
            flex-shrink-0 text-ink2 text-[12px] cursor-pointer transition-all active:scale-[.88]
            ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
          aria-label="Go back"
        >
          ←
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-[2.5px] bg-bd rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step counter */}
        <span className="text-[11px] font-bold tracking-[.08em] uppercase text-ink3 whitespace-nowrap">
          {step} / {totalSteps}
        </span>
      </div>
    </div>
  )
}
