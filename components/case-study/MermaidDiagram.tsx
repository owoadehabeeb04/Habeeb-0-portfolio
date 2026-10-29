'use client'

import { useEffect, useState } from 'react'

interface MermaidDiagramProps {
  chart: string
  title: string
  caption?: string
}

// Mermaid needs a unique element id for every render call (React strict mode runs effects twice in dev)
let renderCount = 0

const currentTheme = () =>
  typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light' ? 'default' : 'dark'

export default function MermaidDiagram({ chart, title, caption }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)
  const [theme, setTheme] = useState<'default' | 'dark'>('dark')

  // Follow the site's light/dark switch
  useEffect(() => {
    setTheme(currentTheme())
    const observer = new MutationObserver(() => setTheme(currentTheme()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        // Lazy-load: the library is large and only needed on case-study pages
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({ startOnLoad: false, theme, securityLevel: 'strict', fontFamily: 'Arial, Helvetica, sans-serif' })
        const { svg } = await mermaid.render(`mermaid-diagram-${++renderCount}`, chart)
        if (!cancelled) {
          setSvg(svg)
          setFailed(false)
        }
      } catch {
        if (!cancelled) setFailed(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [chart, theme])

  return (
    <figure className="my-8">
      <figcaption className="mb-3 text-sm font-semibold text-[var(--text-primary)]">{title}</figcaption>
      <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 p-4">
        {failed ? (
          // Readable fallback if the diagram cannot render
          <pre className="whitespace-pre-wrap text-xs text-[var(--text-secondary)]">{chart}</pre>
        ) : svg ? (
          <div
            data-testid="mermaid-diagram"
            className="flex justify-center [&_svg]:h-auto [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="h-40 animate-pulse rounded-lg bg-[var(--bg-secondary)]" aria-label="Loading diagram" />
        )}
      </div>
      {caption && <p className="mt-2 text-xs text-[var(--text-secondary)]">{caption}</p>}
    </figure>
  )
}
