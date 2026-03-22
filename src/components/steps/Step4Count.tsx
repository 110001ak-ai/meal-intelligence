'use client'
import { useMealStore } from '@/store/mealStore'
import { CountCard, OptCard } from '@/components/ui'

export function Step4Count() {
  const { mealCount, meal2, setMealCount, setMeal2 } = useMealStore()

  return (
    <div className="px-5 pt-[22px] pb-[10px]">
      <span className="block text-[10px] font-bold tracking-[.12em] uppercase text-accent mb-[7px]">
        Meal structure
      </span>
      <h1 className="font-serif text-[28px] font-medium leading-[1.18] text-ink mb-[5px]">
        How many meals <em className="italic text-accent">a day?</em>
      </h1>
      <p className="text-[12.5px] text-ink3 leading-[1.65] mb-[26px]">
        Dinner is always part of your day
      </p>

      <div className="grid grid-cols-3 gap-2 mb-5">
        {([2, 3, 4] as const).map(n => (
          <CountCard key={n} num={n} selected={mealCount === n} onClick={() => setMealCount(n)} />
        ))}
      </div>

      {mealCount === 2 && (
        <div>
          <span className="block text-[9.5px] font-bold tracking-[.13em] uppercase text-ink3 mb-[10px]">
            Choose your pair
          </span>
          <div className="flex flex-col gap-2">
            <OptCard
              emoji="🥞"
              label="Breakfast + Dinner"
              selected={meal2 === 'Breakfast+Dinner'}
              onClick={() => setMeal2('Breakfast+Dinner')}
            />
            <OptCard
              emoji="🍛"
              label="Lunch + Dinner"
              selected={meal2 === 'Lunch+Dinner'}
              onClick={() => setMeal2('Lunch+Dinner')}
            />
          </div>
        </div>
      )}
    </div>
  )
}
