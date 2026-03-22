'use client'
import { useMealStore } from '@/store/mealStore'
import { MealBlock, Pill, FieldLabel } from '@/components/ui'

// ── Breakfast ────────────────────────────────────────────────
const BF_TYPES = [
  { v: 'Paratha',    e: '🫓' },
  { v: 'Roti Sabzi', e: '🥬' },
  { v: 'Poha/Upma',  e: '🍲' },
  { v: 'Bread',      e: '🍞' },
  { v: 'Idli/Dosa',  e: '🥞' },
  { v: 'Fruits',     e: '🍎' },
  { v: 'Mixed',      e: '🔀' },
  { v: 'Eggs',       e: '🥚', nvOnly: true },
  { v: 'Packaged',   e: '📦' },
  { v: 'Other',      e: '✏️' },
]

// ── Lunch ─────────────────────────────────────────────────────
const LUNCH_BASES = [{ v: 'Roti', e: '🫓' }, { v: 'Rice', e: '🍚' }, { v: 'Both', e: '🔀' }]
const ROTI_TYPES  = ['Wheat', 'Multigrain', 'Bajra/Jowar']

// ── Dinner ────────────────────────────────────────────────────
const DINNER_BASES = [
  { v: 'Roti',       e: '🫓' },
  { v: 'Rice',       e: '🍚' },
  { v: 'Both',       e: '🔀' },
  { v: 'Light/Soup', e: '🍵' },
]

// ── Snacks ────────────────────────────────────────────────────
const SNACK_TYPES = [
  { v: 'Chai+biscuits',  e: '🍵' },
  { v: 'Namkeen',        e: '🥨' },
  { v: 'Fruits',         e: '🍎' },
  { v: 'Nuts',           e: '🥜' },
  { v: 'Street food',    e: '🌮' },
  { v: 'Packaged chips', e: '🥡' },
  { v: 'Mithai',         e: '🍮' },
]
const SNACK_FREQ = ['Daily', 'Most days', 'Occasionally', 'Rarely']

function BreakfastBlock() {
  const { diet, bf, setBfType, setBfOther } = useMealStore()
  const isStrictVeg = diet === 'Veg' || diet === 'Vegan' || diet === 'Jain'
  const types = isStrictVeg ? BF_TYPES.filter(t => !t.nvOnly) : BF_TYPES

  return (
    <MealBlock icon="🥞" title="Breakfast">
      <div className="flex flex-wrap gap-2">
        {types.map(({ v, e }) => (
          <Pill
            key={v}
            label={v}
            emoji={e}
            selected={bf.type === v}
            onClick={() => setBfType(v)}
          />
        ))}
      </div>
      {bf.type === 'Other' && (
        <input
          type="text"
          value={bf.otherText}
          onChange={ev => setBfOther(ev.target.value)}
          placeholder="e.g. Daliya, Chhena, Puri…"
          className="
            mt-[10px] w-full h-[44px] rounded-r border-[1.5px] border-bd bg-bg px-[14px]
            font-sans text-[13.5px] text-ink outline-none focus:border-accent
            transition-colors placeholder:text-ink3
          "
          autoFocus
        />
      )}
    </MealBlock>
  )
}

function LunchBlock() {
  const { lunch, setLunchBase, setLunchRotiType } = useMealStore()
  return (
    <MealBlock icon="🍛" title="Lunch">
      <div className="flex flex-wrap gap-2">
        {LUNCH_BASES.map(({ v, e }) => (
          <Pill key={v} label={v} emoji={e} selected={lunch.base === v} onClick={() => setLunchBase(v)} />
        ))}
      </div>
      {lunch.base === 'Roti' && (
        <div className="mt-3">
          <FieldLabel>Which roti?</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {ROTI_TYPES.map(r => (
              <Pill key={r} label={r} selected={lunch.rotiType === r} onClick={() => setLunchRotiType(r)} />
            ))}
          </div>
        </div>
      )}
    </MealBlock>
  )
}

function DinnerBlock() {
  const { dinner, setDinnerBase } = useMealStore()
  return (
    <MealBlock icon="🌙" title="Dinner" always>
      <div className="flex flex-wrap gap-2">
        {DINNER_BASES.map(({ v, e }) => (
          <Pill key={v} label={v} emoji={e} selected={dinner.base === v} onClick={() => setDinnerBase(v)} />
        ))}
      </div>
    </MealBlock>
  )
}

function SnacksBlock() {
  const { snacks, toggleSnackType, setSnackFreq } = useMealStore()
  return (
    <MealBlock icon="🍿" title="Snacks">
      <div className="flex flex-wrap gap-2 mb-[14px]">
        {SNACK_TYPES.map(({ v, e }) => (
          <Pill key={v} label={v} emoji={e} selected={snacks.types.includes(v)} onClick={() => toggleSnackType(v)} />
        ))}
      </div>
      <div>
        <FieldLabel>How often?</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {SNACK_FREQ.map(f => (
            <Pill key={f} label={f} selected={snacks.freq === f} onClick={() => setSnackFreq(f)} />
          ))}
        </div>
      </div>
    </MealBlock>
  )
}

export function Step5Meals() {
  const { activeMeals } = useMealStore()
  const meals = Array.from(new Set([...activeMeals, 'Dinner']))

  return (
    <div className="px-5 pt-[22px] pb-[10px]">
      <span className="block text-[10px] font-bold tracking-[.12em] uppercase text-accent mb-[7px]">
        What&apos;s on your plate
      </span>
      <h1 className="font-serif text-[28px] font-medium leading-[1.18] text-ink mb-[5px]">
        Your daily <em className="italic text-accent">meals</em>
      </h1>
      <p className="text-[12.5px] text-ink3 leading-[1.65] mb-[26px]">
        Tap all that match — no right or wrong answers
      </p>

      {meals.includes('Breakfast') && <BreakfastBlock />}
      {meals.includes('Lunch')     && <LunchBlock />}
      {meals.includes('Dinner')    && <DinnerBlock />}
      {meals.includes('Snacks')    && <SnacksBlock />}
    </div>
  )
}
