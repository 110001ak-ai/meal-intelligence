'use client'
import { useMealStore } from '@/store/mealStore'
import { TopNav } from '@/components/TopNav'
import { Step1Region } from '@/components/steps/Step1Region'
import { Step2Diet } from '@/components/steps/Step2Diet'
import { Step3Fats } from '@/components/steps/Step3Fats'
import { Step4Count } from '@/components/steps/Step4Count'
import { Step5Meals } from '@/components/steps/Step5Meals'
import { SuccessScreen } from '@/components/SuccessScreen'
import { submitToSheets } from '@/lib/submitToSheets'

const STEPS = [Step1Region, Step2Diet, Step3Fats, Step4Count, Step5Meals]

function SavingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />

      {/* Dialog card */}
      <div className="relative bg-card rounded-[16px] px-10 py-10 flex flex-col items-center gap-5 shadow-2xl mx-6 w-full max-w-[300px]">

        {/* Spinner ring */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-[3px] border-bd" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-accent animate-spin" />
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-[15px] font-semibold text-ink leading-tight mb-[6px]">
            Saving your profile
          </p>
          <p className="text-[12.5px] text-ink3 font-normal">
            Just a moment…
          </p>
        </div>
      </div>
    </div>
  )
}

export function MealForm() {
  const {
    step,
    totalSteps,
    submitted,
    submitting,
    goNext,
    canProceed,
    buildPayload,
    setSubmitting,
    setSubmitted,
  } = useMealStore()

  if (submitted) return <SuccessScreen />

  const StepComponent = STEPS[step - 1]
  const isLast = step === totalSteps
  const ok = canProceed()

  async function handleNext() {
    if (!ok || submitting) return
    if (!isLast) { goNext(); return }
    setSubmitting(true)
    try {
      await submitToSheets(buildPayload())
    } finally {
      setSubmitting(false)
      setSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">

      {/* Saving overlay — shown while submitting */}
      {submitting && <SavingOverlay />}

      <div className="max-w-[430px] w-full mx-auto flex flex-col flex-1">
        <TopNav />

        {/* Step content */}
        <div
          key={step}
          className="flex-1 pb-[100px]"
          style={{ animation: 'stepRise .28s cubic-bezier(.2,.8,.3,1)' }}
        >
          <StepComponent />
        </div>

        {/* Fixed footer */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-6 pt-[10px] bg-gradient-to-t from-bg via-bg/80 to-transparent z-30">
          <button
            type="button"
            onClick={handleNext}
            disabled={!ok || submitting}
            className={`
              w-full h-[52px] rounded-r text-[14.5px] font-bold tracking-[.01em]
              flex items-center justify-center transition-all duration-200
              ${ok && !submitting
                ? isLast
                  ? 'bg-accent border border-accent text-white cursor-pointer active:scale-[.99] active:opacity-90'
                  : 'bg-ink border border-ink text-white cursor-pointer active:scale-[.99]'
                : 'bg-bd2 border-[1.5px] border-bd text-ink3 cursor-not-allowed font-normal'
              }
            `}
          >
            {isLast ? 'Submit' : 'Continue'}
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes stepRise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}