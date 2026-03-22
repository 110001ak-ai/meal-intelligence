'use client'
import { useMealStore } from '@/store/mealStore'

export function SuccessScreen() {
  const { buildPayload, reset } = useMealStore()
  const p = buildPayload()

  const rows = [
    ['Region',    String(p.region)],
    ['Diet',      String(p.diet) + (p.nv_freq ? ` · ${p.nv_freq}` : '')],
    ...(p.nv_pref ? [['Protein', String(p.nv_pref)]] : []),
    ['Ghee',      String(p.ghee)],
    ['Butter',    String(p.butter)],
    ['Oil',       `${p.oil_type} · ${p.oil_qty}`],
    ['Meals/day', String(p.meals_per_day)],
    ['Schedule',  String(p.meal_schedule)],
    ...(p.breakfast  ? [['Breakfast', String(p.breakfast)]]  : []),
    ...(p.lunch_base ? [['Lunch', [p.lunch_base, p.lunch_roti].filter(Boolean).join(', ')]] : []),
    ['Dinner',    String(p.dinner_base)],
    ...(p.snacks_types ? [['Snacks', [p.snacks_types, p.snacks_freq].filter(Boolean).join(' · ')]] : []),
  ]

  return (
    <div className="px-6 py-[52px] text-center min-h-screen flex flex-col items-center justify-start">
      {/* Check icon */}
      <div className="w-[58px] h-[58px] rounded-full bg-gl border-[1.5px] border-green flex items-center justify-center text-[22px] mb-[18px]">
        ✓
      </div>

      <h2 className="font-serif text-[27px] font-medium text-ink mb-[6px]">Profile complete</h2>
      <p className="text-[13px] text-ink3 mb-[26px]">Your kitchen intelligence has been captured</p>

      {/* Summary */}
      <div className="w-full bg-card rounded-r border-[1.5px] border-bd overflow-hidden text-left mb-[14px]">
        {rows.map(([k, v], i) => (
          <div
            key={k}
            className={`flex justify-between items-start px-[15px] py-[11px] gap-[12px] ${i < rows.length - 1 ? 'border-b border-bd2' : ''}`}
          >
            <span className="text-[11px] text-ink3 font-semibold whitespace-nowrap">{k}</span>
            <span className="text-[11.5px] text-ink font-semibold text-right max-w-[55%]">{v || '—'}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={reset}
        className="w-full h-[46px] rounded-r border-[1.5px] border-bd bg-transparent text-ink2 font-sans text-[13.5px] font-medium cursor-pointer hover:bg-bd2 transition-colors"
      >
        ↩ Start over
      </button>
    </div>
  )
}
