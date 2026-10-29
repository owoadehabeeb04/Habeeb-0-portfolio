'use client'

import { useState } from 'react'
import type { TraceStep } from '@/types'

const STEP_ICONS: Record<TraceStep['step'], string> = {
  mode: '🎯',
  retrieve: '📚',
  web: '🌐',
  history: '🧠',
  generate: '⚡',
}

export default function AgentTrace({ trace }: { trace: TraceStep[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-3 text-xs text-[var(--text-secondary)]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors"
        aria-expanded={open}
      >
        <span className={`inline-block transition-transform ${open ? 'rotate-90' : ''}`}>▸</span>
        How I answered
      </button>
      {open && (
        <ol className="mt-2 space-y-2 border-l border-[var(--border)] pl-3">
          {trace.map((step, i) => (
            <li key={i}>
              <div className="font-medium text-[var(--text-primary)]">
                {STEP_ICONS[step.step]} {step.label}
              </div>
              {step.detail && <div className="break-words">{step.detail}</div>}
              {step.items && step.items.length > 0 && (
                <ul className="mt-1 flex flex-wrap gap-1">
                  {step.items.map(item => (
                    <li key={item} className="rounded-full border border-[var(--border)] px-2 py-0.5 break-all">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
