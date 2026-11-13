import { test, expect } from '@playwright/test'

test.describe('Research & Publications section', () => {
  test('sits between Projects and About, with all seven research interests', async ({ page }) => {
    await page.goto('/portfolio')
    await expect(page.getByRole('heading', { name: 'Research & Publications' })).toBeVisible()
    const order = await page.evaluate(() => {
      const top = (id: string) => (document.getElementById(id) as HTMLElement).offsetTop
      return { projects: top('projects'), research: top('research'), about: top('aboutme') }
    })
    expect(order.projects).toBeLessThan(order.research)
    expect(order.research).toBeLessThan(order.about)
    await expect(page.getByLabel('Research interests').getByRole('listitem')).toHaveCount(7)
  })

  test('both preprints link to their DOIs', async ({ page }) => {
    await page.goto('/portfolio')
    const links = page.locator('#research a', { hasText: 'Read the preprint' })
    await expect(links).toHaveCount(2)
    await expect(links.nth(0)).toHaveAttribute('href', 'https://doi.org/10.5281/zenodo.23363804')
    await expect(links.nth(1)).toHaveAttribute('href', 'https://doi.org/10.5281/zenodo.22881415')
  })

  test('shows the headline numbers and the evidence boundaries', async ({ page }) => {
    await page.goto('/portfolio')
    const research = page.locator('#research')
    await expect(research.getByText('0.9385').first()).toBeVisible()
    await expect(research.getByText('99.49%').first()).toBeVisible()
    await expect(research.getByLabel('Evidence boundaries')).toContainText('PDF/OCR')
  })

  test('method details expand to show the full results', async ({ page }) => {
    await page.goto('/portfolio')
    const details = page.locator('#research details').first()
    await details.locator('summary').click()
    await expect(details.getByText(/0\.8842 micro precision/)).toBeVisible()
    await expect(details.getByText(/285 vs\. 452 reads/)).toBeVisible()
  })

  test('has the Expo project entry', async ({ page }) => {
    await page.goto('/portfolio')
    await expect(page.locator('#research').getByRole('heading', { name: /^Expo/ })).toBeVisible()
    await expect(page.locator('#research').getByText(/330 backend and 244 desktop automated tests/)).toBeVisible()
  })

  test('the academic CV downloads as a PDF and the main CV is untouched', async ({ page, request }) => {
    await page.goto('/portfolio')
    const academic = page.getByRole('link', { name: 'Download academic CV' })
    await expect(academic).toHaveAttribute('href', '/Habeeb-Owoade-Academic-CV.pdf')
    await expect(academic).toHaveAttribute('download', 'Habeeb-Owoade-Academic-CV.pdf')

    const res = await request.get('/Habeeb-Owoade-Academic-CV.pdf')
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('pdf')
    expect((await res.body()).subarray(0, 4).toString()).toBe('%PDF')

    // The main CV still backs every Resume link
    await expect(page.getByRole('link', { name: 'Download Resume' })).toHaveAttribute('href', '/Habeeb-Owoade-CV.pdf')
    await expect(page.getByRole('link', { name: 'Resume', exact: true }).first()).toHaveAttribute('href', '/Habeeb-Owoade-CV.pdf')
  })

  test('publishes both preprints as structured data', async ({ page }) => {
    await page.goto('/portfolio')
    const schemas = await page.evaluate(() =>
      Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => JSON.parse(s.textContent || '{}'))
    )
    const articles = schemas.filter(s => s['@type'] === 'ScholarlyArticle')
    expect(articles.map(a => a.identifier.value).sort()).toEqual(['10.5281/zenodo.22881415', '10.5281/zenodo.23363804'])
  })

  test('has no horizontal scroll on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/portfolio')
    await expect(page.getByRole('heading', { name: 'Research & Publications' })).toBeVisible()
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
})

test.describe('Research navbar link', () => {
  test('jumps to the section on desktop', async ({ page }) => {
    await page.goto('/portfolio')
    await page.getByRole('link', { name: 'Research', exact: true }).first().click()
    await expect(page).toHaveURL(/#research$/)
    await expect(page.locator('#research')).toBeInViewport()
  })

  test('is available on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/portfolio')
    await expect(page.getByRole('link', { name: 'Research', exact: true })).toBeVisible()
  })

  test('links to /portfolio#research from other pages', async ({ page }) => {
    await page.goto('/case-studies')
    const href = await page.getByRole('link', { name: 'Research', exact: true }).first().getAttribute('href')
    expect(href).toBe('/portfolio#research')
  })

  for (const width of [768, 1024, 1280]) {
    test(`the navbar pill fits inside a ${width}px window`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.goto('/portfolio')
      await expect(page.getByRole('link', { name: 'Research', exact: true }).first()).toBeVisible()
      const box = await page.locator('.navbar-container').boundingBox()
      expect(box).not.toBeNull()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(width)
    })
  }
})
