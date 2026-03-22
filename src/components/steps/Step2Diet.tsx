'use client'
import { useMealStore } from '@/store/mealStore'
import { OptCard, Pill } from '@/components/ui'

const DIET_OPTS = [
  { v: 'Veg',     e: '🌿', l: 'Vegetarian',     s: 'Dal, sabzi, paneer, dairy' },
  { v: 'Non-Veg', e: '🍗', l: 'Non-Vegetarian',  s: 'Includes meat, fish or eggs' },
  { v: 'Vegan',   e: '🌱', l: 'Vegan',           s: 'No animal products' },
  { v: 'Jain',    e: '🪷', l: 'Jain',            s: 'Strictly veg, no root vegetables' },
]

const NV_FREQ = ['Daily', '4–5× week', '2–3× week', 'Occasionally']
const NV_PREF = [
  { v: 'Chicken', e: '🍗' },
  { v: 'Fish',    e: '🐟' },
  { v: 'Mutton',  e: '🥩' },
  { v: 'Eggs',    e: '🥚' },
]

export function Step2Diet() {
  const { diet, nvFreq, nvPref, setDiet, setNvFreq, toggleNvPref } = useMealStore()
  const isNV = diet === 'Non-Veg'

  return (
    <div className="px-5 pt-[22px] pb-[10px]">
      <span className="block text-[10px] font-bold tracking-[.12em] uppercase text-accent mb-[7px]">
        Diet type
      </span>
      <h1 className="font-serif text-[28px] font-medium leading-[1.18] text-ink mb-[5px]">
        What do you <em className="italic text-accent">eat?</em>
      </h1>
      <p className="text-[12.5px] text-ink3 leading-[1.65] mb-[26px]">
        Determines protein sources and fat patterns
      </p>

      <div className="flex flex-col gap-2">
        {DIET_OPTS.map(({ v, e, l, s }) => (
          <OptCard
            key={v}
            emoji={e}
            label={l}
            sub={s}
            selected={diet === v}
            onClick={() => setDiet(v as typeof diet)}
          />
        ))}
      </div>

      {/* Non-veg sub-section */}
      {isNV && (
        <div className="mt-5 space-y-4">
          <div>
            <span className="block text-[9.5px] font-bold tracking-[.13em] uppercase text-ink3 mb-[9px]">
              How often non-veg?
            </span>
            <div className="flex flex-wrap gap-2">
              {NV_FREQ.map(f => (
                <Pill key={f} label={f} selected={nvFreq === f} onClick={() => setNvFreq(f)} />
              ))}
            </div>
          </div>
          <div>
            <span className="block text-[9.5px] font-bold tracking-[.13em] uppercase text-ink3 mb-[9px]">
              Preferred protein
            </span>
            <div className="flex flex-wrap gap-2">
              {NV_PREF.map(({ v, e }) => (
                <Pill key={v} label={v} emoji={e} selected={nvPref.includes(v)} onClick={() => toggleNvPref(v)} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
