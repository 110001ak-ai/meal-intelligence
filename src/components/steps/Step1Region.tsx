'use client'
import { useMealStore } from '@/store/mealStore'
import { Tile } from '@/components/ui'

const REGIONS = [
  { v: 'Punjabi',       e: '🌾' },
  { v: 'Haryanvi',      e: '🥛' },
  { v: 'Awadhi',        e: '🍲' },
  { v: 'Brij / Agra',   e: '🫕' },
  { v: 'Kashmiri',      e: '🍖' },
  { v: 'Himachali',     e: '🏔️' },
  { v: 'Garhwali',      e: '🌿' },
  { v: 'Bihari',        e: '🍛' },
  { v: 'Bengali',       e: '🐟' },
  { v: 'Odia',          e: '🍚' },
  { v: 'Assamese',      e: '🍵' },
  { v: 'Rajasthani',    e: '🌶️' },
  { v: 'Gujarati',      e: '🥜' },
  { v: 'Maharashtrian', e: '🫙' },
  { v: 'Malwi',         e: '🌽' },
  { v: 'Bundelkhandi',  e: '🫘' },
  { v: 'South Indian',  e: '🥥' },
  { v: 'Other',         e: '✏️' },
]

export function Step1Region() {
  const { region, regionOther, setRegion, setRegionOther } = useMealStore()

  return (
    <div className="px-5 pt-[22px] pb-[10px]">
      <span className="block text-[10px] font-bold tracking-[.12em] uppercase text-accent mb-[7px]">
        Your kitchen
      </span>
      <h1 className="font-serif text-[28px] font-medium leading-[1.18] text-ink mb-[5px]">
        Where is your food <em className="italic text-accent">rooted?</em>
      </h1>
      <p className="text-[12.5px] text-ink3 leading-[1.65] mb-[26px]">
        Pick one — this anchors all your insights
      </p>

      <div className="grid grid-cols-3 gap-2">
        {REGIONS.map(({ v, e }) => (
          <Tile
            key={v}
            emoji={e}
            label={v}
            selected={region === v}
            onClick={() => setRegion(v)}
          />
        ))}
      </div>

      {region === 'Other' && (
        <div className="mt-[10px]">
          <input
            type="text"
            value={regionOther}
            onChange={e => setRegionOther(e.target.value)}
            placeholder="e.g. Sindhi, Konkani, Mixed…"
            className="
              w-full h-[44px] rounded-r border-[1.5px] border-bd bg-card px-[14px]
              font-sans text-[13.5px] text-ink outline-none
              focus:border-accent transition-colors
              placeholder:text-ink3
            "
            autoFocus
          />
        </div>
      )}
    </div>
  )
}
