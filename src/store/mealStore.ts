import { create } from 'zustand'

// ─── TYPES ────────────────────────────────────────────────────
export interface MealState {
  // Navigation
  step: number
  totalSteps: number

  // Step 1 – Region
  region: string | null
  regionOther: string

  // Step 2 – Diet
  diet: 'Veg' | 'Non-Veg' | 'Vegan' | 'Jain' | null
  nvFreq: string | null
  nvPref: string[]

  // Step 3 – Cooking fats
  gheeUse: string | null
  butterUse: string | null
  oilType: string | null
  oilQty: string | null

  // Step 4 – Meal count
  mealCount: 2 | 3 | 4 | null
  meal2: string | null
  activeMeals: string[]

  // Step 5 – Meal details
  bf: { type: string | null; otherText: string }
  lunch: { base: string | null; rotiType: string | null }
  dinner: { base: string | null }
  snacks: { types: string[]; freq: string | null }

  // Submission
  submitting: boolean
  submitted: boolean

  // ─── ACTIONS ────────────────────────────────────────────────
  setStep: (n: number) => void
  goNext: () => void
  goBack: () => void

  setRegion: (v: string) => void
  setRegionOther: (v: string) => void

  setDiet: (v: MealState['diet']) => void
  setNvFreq: (v: string) => void
  toggleNvPref: (v: string) => void

  setGheeUse: (v: string) => void
  setButterUse: (v: string) => void
  setOilType: (v: string) => void
  setOilQty: (v: string) => void

  setMealCount: (n: 2 | 3 | 4) => void
  setMeal2: (v: string) => void

  setBfType: (v: string) => void
  setBfOther: (v: string) => void
  setLunchBase: (v: string) => void
  setLunchRotiType: (v: string) => void
  setDinnerBase: (v: string) => void
  toggleSnackType: (v: string) => void
  setSnackFreq: (v: string) => void

  setSubmitting: (v: boolean) => void
  setSubmitted: (v: boolean) => void
  reset: () => void

  // ─── COMPUTED ───────────────────────────────────────────────
  canProceed: () => boolean
  buildPayload: () => Record<string, string | number>
}

// ─── INITIAL STATE ────────────────────────────────────────────
const initial = {
  step: 1,
  totalSteps: 5,
  region: null,
  regionOther: '',
  diet: null,
  nvFreq: null,
  nvPref: [],
  gheeUse: null,
  butterUse: null,
  oilType: null,
  oilQty: null,
  mealCount: null,
  meal2: null,
  activeMeals: [] as string[],
  bf: { type: null, otherText: '' },
  lunch: { base: null, rotiType: null },
  dinner: { base: null },
  snacks: { types: [] as string[], freq: null },
  submitting: false,
  submitted: false,
}

// ─── STORE ────────────────────────────────────────────────────
export const useMealStore = create<MealState>((set, get) => ({
  ...initial,

  setStep: (n) => set({ step: n }),

  goNext: () => {
    const { step, totalSteps } = get()
    if (step < totalSteps) set({ step: step + 1 })
  },

  goBack: () => {
    const { step } = get()
    if (step > 1) set({ step: step - 1 })
  },

  // ── Step 1 ──────────────────────────────────────────────────
  setRegion: (v) => set({ region: v, regionOther: v !== 'Other' ? '' : get().regionOther }),
  setRegionOther: (v) => set({ regionOther: v }),

  // ── Step 2 ──────────────────────────────────────────────────
  setDiet: (v) => set({
    diet: v,
    nvFreq: v !== 'Non-Veg' ? null : get().nvFreq,
    nvPref: v !== 'Non-Veg' ? [] : get().nvPref,
  }),
  setNvFreq: (v) => set({ nvFreq: v }),
  toggleNvPref: (v) => set((s) => ({
    nvPref: s.nvPref.includes(v) ? s.nvPref.filter(x => x !== v) : [...s.nvPref, v]
  })),

  // ── Step 3 ──────────────────────────────────────────────────
  setGheeUse: (v) => set({ gheeUse: v }),
  setButterUse: (v) => set({ butterUse: v }),
  setOilType: (v) => set({ oilType: v }),
  setOilQty: (v) => set({ oilQty: v }),

  // ── Step 4 ──────────────────────────────────────────────────
  setMealCount: (n) => {
    let activeMeals: string[] = []
    if (n === 3) activeMeals = ['Breakfast', 'Lunch', 'Dinner']
    if (n === 4) activeMeals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
    set({ mealCount: n, meal2: null, activeMeals })
  },
  setMeal2: (v) => set({
    meal2: v,
    activeMeals: v === 'Breakfast+Dinner' ? ['Breakfast', 'Dinner'] : ['Lunch', 'Dinner'],
  }),

  // ── Step 5 ──────────────────────────────────────────────────
  setBfType: (v) => set({ bf: { type: v, otherText: v !== 'Other' ? '' : get().bf.otherText } }),
  setBfOther: (v) => set((s) => ({ bf: { ...s.bf, otherText: v } })),
  setLunchBase: (v) => set((s) => ({ lunch: { ...s.lunch, base: v, rotiType: v !== 'Roti' ? null : s.lunch.rotiType } })),
  setLunchRotiType: (v) => set((s) => ({ lunch: { ...s.lunch, rotiType: v } })),
  setDinnerBase: (v) => set({ dinner: { base: v } }),
  toggleSnackType: (v) => set((s) => ({
    snacks: {
      ...s.snacks,
      types: s.snacks.types.includes(v) ? s.snacks.types.filter(x => x !== v) : [...s.snacks.types, v]
    }
  })),
  setSnackFreq: (v) => set((s) => ({ snacks: { ...s.snacks, freq: v } })),

  // ── Submission ──────────────────────────────────────────────
  setSubmitting: (v) => set({ submitting: v }),
  setSubmitted: (v) => set({ submitted: v }),

  reset: () => set({ ...initial, bf: { type: null, otherText: '' }, lunch: { base: null, rotiType: null }, dinner: { base: null }, snacks: { types: [], freq: null } }),

  // ── Validation ──────────────────────────────────────────────
  canProceed: () => {
    const s = get()
    if (s.step === 1) return !!s.region && (s.region !== 'Other' || s.regionOther.trim().length > 0)
    if (s.step === 2) return !!s.diet && (s.diet !== 'Non-Veg' || !!s.nvFreq)
    if (s.step === 3) return !!s.gheeUse && !!s.butterUse && !!s.oilType && !!s.oilQty
    if (s.step === 4) return !!s.mealCount && (s.mealCount !== 2 || !!s.meal2)
    if (s.step === 5) {
      const meals = [...new Set([...s.activeMeals, 'Dinner'])]
      return meals.every(m => {
        if (m === 'Breakfast') return !!s.bf.type
        if (m === 'Lunch')     return !!s.lunch.base
        if (m === 'Dinner')    return !!s.dinner.base
        if (m === 'Snacks')    return s.snacks.types.length > 0 && !!s.snacks.freq
        return true
      })
    }
    return false
  },

  // ── Payload ─────────────────────────────────────────────────
  buildPayload: () => {
    const s = get()
    const rv = s.region === 'Other' ? (s.regionOther || 'Other') : (s.region || '')
    return {
      timestamp:      new Date().toISOString(),
      region:         rv,
      diet:           s.diet || '',
      nv_freq:        s.nvFreq || '',
      nv_pref:        s.nvPref.join(', '),
      ghee:           s.gheeUse || '',
      butter:         s.butterUse || '',
      oil_type:       s.oilType || '',
      oil_qty:        s.oilQty || '',
      meals_per_day:  s.mealCount || 0,
      meal_schedule:  s.activeMeals.join(', '),
      breakfast:      s.activeMeals.includes('Breakfast') ? [s.bf.type, s.bf.otherText].filter(Boolean).join(' · ') : '',
      lunch_base:     s.activeMeals.includes('Lunch') ? (s.lunch.base || '') : '',
      lunch_roti:     s.activeMeals.includes('Lunch') ? (s.lunch.rotiType || '') : '',
      dinner_base:    s.dinner.base || '',
      snacks_types:   s.activeMeals.includes('Snacks') ? s.snacks.types.join(', ') : '',
      snacks_freq:    s.activeMeals.includes('Snacks') ? (s.snacks.freq || '') : '',
    }
  },
}))
