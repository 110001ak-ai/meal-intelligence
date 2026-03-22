'use client'
import { useMealStore } from '@/store/mealStore'
import { ScaleCard, Pill, FieldLabel } from '@/components/ui'

const GHEE_OPTS   = [{ v: 'Minimal', s: 'Rarely / very little' }, { v: 'Moderate', s: 'A tsp sometimes' }, { v: 'Generous', s: 'Daily, on most food' }]
const BUTTER_OPTS = [{ v: 'Minimal', s: 'Rarely / very little' }, { v: 'Moderate', s: 'On bread, in dal' }, { v: 'Generous', s: 'Makhan on everything' }]
const OIL_TYPES   = [
  { v: 'Mustard',   e: '🟡' },
  { v: 'Coconut',   e: '🥥' },
  { v: 'Groundnut', e: '🥜' },
  { v: 'Refined',   e: '' },
  { v: 'Sunflower', e: '🌻' },
  { v: 'Olive',     e: '🫒' },
  { v: 'Mixed',     e: '' },
]
const OIL_QTY = [{ v: 'Minimal', s: 'Light cooking' }, { v: 'Moderate', s: 'Regular tadka' }, { v: 'Heavy', s: 'Rich gravies' }]

export function Step3Fats() {
  const { gheeUse, butterUse, oilType, oilQty, setGheeUse, setButterUse, setOilType, setOilQty } = useMealStore()

  return (
    <div className="px-5 pt-[22px] pb-[10px]">
      <span className="block text-[10px] font-bold tracking-[.12em] uppercase text-accent mb-[7px]">
        Fat &amp; oil usage
      </span>
      <h1 className="font-serif text-[28px] font-medium leading-[1.18] text-ink mb-[5px]">
        How do you <em className="italic text-accent">cook?</em>
      </h1>
      <p className="text-[12.5px] text-ink3 leading-[1.65] mb-[26px]">
        The biggest signal of calorie load and regional authenticity
      </p>

      <div className="space-y-5">
        {/* Ghee */}
        <div>
          <FieldLabel>Ghee</FieldLabel>
          <div className="grid grid-cols-3 gap-2">
            {GHEE_OPTS.map(({ v, s }) => (
              <ScaleCard key={v} main={v} sub={s} selected={gheeUse === v} onClick={() => setGheeUse(v)} />
            ))}
          </div>
        </div>

        {/* Butter */}
        <div>
          <FieldLabel>Butter</FieldLabel>
          <div className="grid grid-cols-3 gap-2">
            {BUTTER_OPTS.map(({ v, s }) => (
              <ScaleCard key={v} main={v} sub={s} selected={butterUse === v} onClick={() => setButterUse(v)} />
            ))}
          </div>
        </div>

        {/* Oil type */}
        <div>
          <FieldLabel>Primary cooking oil</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {OIL_TYPES.map(({ v, e }) => (
              <Pill key={v} label={v} emoji={e || undefined} selected={oilType === v} onClick={() => setOilType(v)} />
            ))}
          </div>
        </div>

        {/* Oil quantity */}
        <div>
          <FieldLabel>Oil quantity per meal</FieldLabel>
          <div className="grid grid-cols-3 gap-2">
            {OIL_QTY.map(({ v, s }) => (
              <ScaleCard key={v} main={v} sub={s} selected={oilQty === v} onClick={() => setOilQty(v)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
