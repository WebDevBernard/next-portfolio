"use client"

import { useState } from "react"
import BulldogBelly from "@/components/BulldogJiggle"
import TimeSlider from "@/components/TimeSlider"
import { bulldogSectionRef } from "@/lib/refs"

export default function BulldogSection() {
  const [duration, setDuration] = useState(1)

  return (
    <div
      ref={(el) => {
        bulldogSectionRef.current = el;
      }}
      className="flex flex-col items-center gap-6 w-full"
    >
      <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl mx-auto relative">
        <BulldogBelly src="/Bulldog-1.webp" jiggleDuration={duration} />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-2 sm:pb-6 text-white select-none [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
          <h3 className="font-semibold text-sm sm:text-base">Forbidden Burrito</h3>
          <p className="text-xs sm:text-sm text-zinc-300">Poke that belly!</p>
        </div>
      </div>
      <TimeSlider onChange={setDuration} />
    </div>
  )
}
