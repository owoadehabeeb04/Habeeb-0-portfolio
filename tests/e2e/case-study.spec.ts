import { test, expect } from '@playwright/test'

// Add each new case-study slug here as it ships
const SLUGS = ['sefa', 'soundradar', 'lumes', 'recipia', 'omo-ai', 'dev-link', 'tobi-portfolio']

for (const slug of SLUGS) {
  test.describe(`case study: ${slug}`, () => {
    test('renders the story, outcomes and every diagram', async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', e => errors.push(e.message))
      await page.goto(`/projects/${slug}`)

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      for (const heading of ['The problem', 'Constraints', 'Approach', 'Key decisions', 'Challenges', 'Results', 'What I would do next']) {
        await expect(page.getByRole('heading', { name: heading })).toBeVisible()
      }
      await expect(page.getByLabel('Key outcomes').getByRole('listitem').first()).toBeVisible()

      // Mermaid diagrams render to SVG (not the code fallback)
      const diagrams = page.getByTestId('mermaid-diagram')
      await expect(diagrams.first()).toBeVisible({ timeout: 20_000 })
      expect(await diagrams.count()).toBeGreaterThanOrEqual(1)
      await expect(page.locator('figure pre')).toHaveCount(0)
      expect(errors).toEqual([])
    })

    test('has no horizontal scroll on a phone', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 })
      await page.goto(`/projects/${slug}`)
      await expect(page.getByTestId('mermaid-diagram').first()).toBeVisible({ timeout: 20_000 })
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)
    })

    test('images are sharp on a retina screen: natural width is at least 1.5x the rendered width', async ({ browser }) => {
      // Blur shows up on 2x displays, so test at deviceScaleFactor 2
      const context = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1280, height: 900 } })
      const page = await context.newPage()
      await page.goto(`/projects/${slug}`)
      await page.getByTestId('mermaid-diagram').first().waitFor({ timeout: 20_000 })
      // img.naturalWidth is density-corrected for srcset images, so load the chosen file again to get its real pixel width
      const blurry = await page.evaluate(async () => {
        const images = Array.from(document.querySelectorAll('article img')) as HTMLImageElement[]
        const bad: string[] = []
        for (const img of images) {
          if (img.clientWidth === 0 || !img.currentSrc) continue
          const pixels = await new Promise<number>(resolve => {
            const probe = new Image()
            probe.onload = () => resolve(probe.naturalWidth)
            probe.onerror = () => resolve(0)
            probe.src = img.currentSrc
          })
          if (pixels < img.clientWidth * 1.5) bad.push(`${img.alt}: ${pixels}px for ${img.clientWidth}px`)
        }
        return bad
      })
      await context.close()
      expect(blurry).toEqual([])
    })

    test('is reachable from the case studies page and listed in the sitemap', async ({ page, request }) => {
      await page.goto('/case-studies')
      await page.locator(`a[href="/projects/${slug}"]`).first().click()
      await expect(page).toHaveURL(new RegExp(`/projects/${slug}$`))

      const sitemap = await (await request.get('/sitemap.xml')).text()
      expect(sitemap).toContain(`/projects/${slug}`)
    })

    test('never links to source code or shows code excerpts', async ({ page }) => {
      await page.goto(`/projects/${slug}`)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.locator('article a[href*="github.com"]')).toHaveCount(0)
      await expect(page.locator('article pre')).toHaveCount(0)
      await expect(page.getByText(/code ↗/)).toHaveCount(0)
    })
  })
}

test('unknown case study returns a 404', async ({ request }) => {
  const res = await request.get('/projects/does-not-exist')
  expect(res.status()).toBe(404)
})

test.describe('case studies index and navigation', () => {
  test('lists every case study with a working link', async ({ page }) => {
    await page.goto('/case-studies')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    for (const slug of SLUGS) {
      await expect(page.locator(`a[href="/projects/${slug}"]`).first()).toBeVisible()
    }
    await expect(page.getByLabel('Case studies').getByRole('listitem').first()).toBeVisible()
  })

  test('the navbar has a Case Studies link that opens the index (desktop)', async ({ page }) => {
    await page.goto('/portfolio')
    await page.getByRole('link', { name: 'Case Studies' }).first().click()
    await expect(page).toHaveURL(/\/case-studies$/)
  })

  test('the navbar has a Case Studies link on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/case-studies')
    await expect(page.getByRole('link', { name: 'Case Studies' })).toBeVisible()
  })

  test('navbar section links still work from a case-study page', async ({ page }) => {
    await page.goto('/projects/sefa')
    const href = await page.getByRole('link', { name: 'Contact', exact: true }).first().getAttribute('href')
    expect(href).toBe('/portfolio#contact')
  })

  test('/projects shows a Read case study button', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.getByRole('link', { name: 'Read case study' }).first()).toBeVisible()
  })

  test('the sitemap lists the case studies index', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap).toContain('/case-studies')
  })
})
