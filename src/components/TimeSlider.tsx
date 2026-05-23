"use client"

import { useState, useMemo } from "react"
import { Slider } from "@/components/ui/Slider"

const STOPS = ["1s", "3s", "6s", "∞"]
const BUBBLE_LABELS = ["1s", "3s", "6s", "till the end of time"]
const DURATIONS = [1, 3, 6, 999]

interface TimeSliderProps {
  onChange?: (duration: number) => void
}

export default function TimeSlider({ onChange }: TimeSliderProps) {
  const [value, setValue] = useState(0)

  const handleChange = ([v]: number[]) => {
    setValue(v)
    onChange?.(DURATIONS[v])
  }

  const pct = (value / (STOPS.length - 1)) * 100
  const translate = useMemo(() => {
    if (pct <= 5) return "0"
    if (pct >= 95) return "-100%"
    return "-50%"
  }, [pct])

  return (
    <div className="w-full max-w-lg px-4 sm:px-0">
      <div className="relative pt-8 mb-6">
        <div
          className="absolute -top-1 bg-zinc-800 text-zinc-200 text-sm font-medium px-3 py-1 rounded-full border border-zinc-600 transition-all whitespace-nowrap"
          style={{ left: `${pct}%`, transform: `translateX(${translate})` }}
        >
          {BUBBLE_LABELS[value]}
        </div>

        <Slider
          min={0}
          max={STOPS.length - 1}
          step={1}
          value={[value]}
          onValueChange={handleChange}
        />
      </div>

      <div className="flex justify-between">
        {STOPS.map((label) => (
          <span key={label} className={`text-zinc-600 ${label === "∞" ? "text-lg" : "text-sm"}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
