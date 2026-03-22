'use client'
import { ReactNode } from 'react'

// ─── TILE ─────────────────────────────────────────────────────
interface TileProps {
  emoji: string
  label: string
  selected: boolean
  onClick: () => void
}
export function Tile({ emoji, label, selected, onClick }: TileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        h-[68px] rounded-r border flex flex-col items-center justify-center gap-1 px-1
        transition-all duration-[130ms] active:scale-[.93] cursor-pointer select-none
        ${selected
          ? 'border-accent bg-al shadow-tile'
          : 'border-bd bg-card hover:border-ink3'
        }
      `}
    >
      <span className="text-[20px] leading-none">{emoji}</span>
      <span className={`text-[10.5px] font-semibold text-center leading-tight tracking-[.01em] ${selected ? 'text-accent' : 'text-ink2'}`}>
        {label}
      </span>
    </button>
  )
}

// ─── PILL ─────────────────────────────────────────────────────
interface PillProps {
  label: string
  emoji?: string
  selected: boolean
  onClick: () => void
}
export function Pill({ label, emoji, selected, onClick }: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        h-[38px] px-[15px] rounded-full border inline-flex items-center justify-center gap-[6px]
        text-[13px] font-medium whitespace-nowrap cursor-pointer select-none
        transition-all duration-[130ms] active:scale-[.93]
        ${selected
          ? 'bg-ink border-ink text-white shadow-pill'
          : 'bg-card border-bd text-ink2 hover:border-ink3'
        }
      `}
    >
      {emoji && <span className="text-[14px] leading-none flex-shrink-0">{emoji}</span>}
      {label}
    </button>
  )
}

// ─── SCALE CARD ───────────────────────────────────────────────
interface ScaleCardProps {
  main: string
  sub: string
  selected: boolean
  onClick: () => void
}
export function ScaleCard({ main, sub, selected, onClick }: ScaleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-r border p-3 flex flex-col items-center justify-center gap-[3px]
        text-center cursor-pointer select-none
        transition-all duration-[130ms] active:scale-[.93]
        ${selected ? 'border-accent bg-al' : 'bg-card border-bd hover:border-ink3'}
      `}
    >
      <span className={`text-[13px] font-semibold leading-none ${selected ? 'text-accent' : 'text-ink2'}`}>{main}</span>
      <span className="text-[10px] text-ink3 font-normal leading-[1.3] mt-px">{sub}</span>
    </button>
  )
}

// ─── OPT CARD ─────────────────────────────────────────────────
interface OptCardProps {
  emoji: string
  label: string
  sub?: string
  selected: boolean
  onClick: () => void
}
export function OptCard({ emoji, label, sub, selected, onClick }: OptCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full px-[15px] py-[14px] rounded-r border flex items-center gap-[13px]
        cursor-pointer transition-all duration-[130ms] active:scale-[.99]
        ${selected ? 'border-accent bg-al' : 'bg-card border-bd hover:border-ink3'}
      `}
    >
      <span className="text-[20px] w-[26px] text-center flex-shrink-0">{emoji}</span>
      <span className="flex-1 text-left">
        <span className="block text-[14.5px] font-semibold text-ink">{label}</span>
        {sub && <span className="block text-[11.5px] text-ink3 font-normal mt-0.5">{sub}</span>}
      </span>
      <span className={`
        w-[18px] h-[18px] rounded-full border flex-shrink-0 ml-auto flex items-center justify-center
        transition-all duration-[130ms]
        ${selected ? 'border-accent bg-accent' : 'border-bd'}
      `}>
        {selected && <span className="w-[5px] h-[5px] rounded-full bg-white block" />}
      </span>
    </button>
  )
}

// ─── COUNT CARD ───────────────────────────────────────────────
interface CountCardProps {
  num: number
  selected: boolean
  onClick: () => void
}
export function CountCard({ num, selected, onClick }: CountCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        aspect-square rounded-r border flex flex-col items-center justify-center gap-[3px]
        cursor-pointer transition-all duration-[130ms] active:scale-[.93]
        ${selected ? 'border-accent bg-al' : 'bg-card border-bd hover:border-ink3'}
      `}
    >
      <span className={`font-serif text-[40px] font-medium leading-none ${selected ? 'text-accent' : 'text-ink'}`}>
        {num}
      </span>
      <span className="text-[9.5px] font-bold tracking-[.09em] uppercase text-ink3">meals</span>
    </button>
  )
}

// ─── MEAL BLOCK ───────────────────────────────────────────────
interface MealBlockProps {
  icon: string
  title: string
  always?: boolean
  children: ReactNode
}
export function MealBlock({ icon, title, always, children }: MealBlockProps) {
  return (
    <div className="rounded-r border border-bd bg-card overflow-hidden mb-[10px]">
      <div className="px-4 py-[13px] border-b border-bd2 flex items-center gap-[10px]">
        <span className="text-base flex-shrink-0">{icon}</span>
        <span className="text-[13px] font-bold flex-1 text-ink uppercase tracking-[.02em]">{title}</span>
        {always && (
          <span className="text-[9px] font-bold tracking-[.09em] uppercase text-green bg-gl px-[9px] py-[3px] rounded-full">
            Always
          </span>
        )}
      </div>
      <div className="px-4 py-[14px]">{children}</div>
    </div>
  )
}

// ─── FIELD LABEL ─────────────────────────────────────────────
export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="block text-[9.5px] font-bold tracking-[.13em] uppercase text-ink3 mb-[9px]">
      {children}
    </span>
  )
}
