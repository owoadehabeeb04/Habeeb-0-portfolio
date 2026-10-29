'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { CaseStudyImage } from '@/types'

export default function Gallery({ images }: { images: CaseStudyImage[] }) {
  const [open, setOpen] = useState<CaseStudyImage | null>(null)
  if (images.length === 0) return null

  return (
    <>
      <div className="my-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map(image => (
          <figure key={image.src} className={image.kind === 'desktop' ? 'col-span-2 md:col-span-3' : ''}>
            <button
              onClick={() => setOpen(image)}
              className="block w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]/40 transition-colors hover:border-[var(--text-primary)]"
              aria-label={`Enlarge: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.kind === 'desktop' ? 1600 : 780}
                height={image.kind === 'desktop' ? 1000 : 1688}
                quality={90}
                sizes={image.kind === 'desktop' ? '(min-width: 1024px) 896px, 100vw' : '(min-width: 1024px) 290px, 50vw'}
                className="h-auto w-full"
              />
            </button>
            {image.caption && <figcaption className="mt-2 text-xs text-[var(--text-secondary)]">{image.caption}</figcaption>}
          </figure>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpen(null)}
        >
          <button className="absolute right-4 top-4 text-3xl text-white" aria-label="Close" onClick={() => setOpen(null)}>
            ×
          </button>
          <Image
            src={open.src}
            alt={open.alt}
            width={open.kind === 'desktop' ? 1600 : 780}
            height={open.kind === 'desktop' ? 1000 : 1688}
            quality={95}
            sizes="100vw"
            className="max-h-[90vh] w-auto max-w-full object-contain"
          />
        </div>
      )}
    </>
  )
}
