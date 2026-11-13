import { test, expect } from '@playwright/test'
import { retrieveChunkDetails } from '../../lib/portfolio-data'

const REPO = 'https://github.com/owoadehabeeb04/Pastebin-system-design'

test.describe('System Design section', () => {
  test('sits after Research and before About, with Pastebin built vs design-only', async ({ page }) => {
    await page.goto('/portfolio')
    await expect(page.getByRole('heading', { name: 'System Design', exact: true })).toBeVisible()
    const order = await page.evaluate(() => {
      const top = (id: string) => (document.getElementById(id) as HTMLElement).offsetTop
      return { research: top('research'), design: top('system-design'), about: top('aboutme') }
    })
    expect(order.research).toBeLessThan(order.design)
    expect(order.design).toBeLessThan(order.about)
    const section = page.locator('#system-design')
    await expect(section.getByText('Built and run locally')).toBeVisible()
    await expect(section.getByText('Design only, not built')).toBeVisible()
    await expect(section.getByText('from the design, not from measurement')).toBeVisible()
  })

  test('links to the case study, repo and write-up', async ({ page }) => {
    await page.goto('/portfolio')
    const section = page.locator('#system-design')
    await expect(section.getByRole('link', { name: 'Read the case study' })).toHaveAttribute('href', '/projects/pastebin')
    await expect(section.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', REPO)
    await expect(section.getByRole('link', { name: /Design write-up/ })).toHaveAttribute('href', /docs\.google\.com/)
  })

  test('makes no performance claims', async ({ page }) => {
    for (const path of ['/portfolio', '/projects/pastebin']) {
      await page.goto(path)
      const text = await page.locator(path === '/portfolio' ? '#system-design' : 'article').first().innerText()
      expect(text).not.toMatch(/\bp(50|95|99)\b|latency|\d\s?ms\b|requests per second achieved|handles [\d,]+ (users|requests)/i)
    }
  })

  test('navbar link scrolls to the section (desktop and phone)', async ({ page }) => {
    await page.goto('/portfolio')
    await page.locator('nav a[href$="#system-design"]').first().click()
    await expect(page).toHaveURL(/#system-design$/)
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/portfolio')
    await expect(page.getByRole('link', { name: 'System Design', exact: true }).last()).toHaveAttribute('href', /#system-design$/)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })

  for (const width of [768, 1024, 1280]) {
    test(`navbar pill fits at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.goto('/portfolio')
      const box = await page.locator('.navbar-container').boundingBox()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(width)
    })
  }
})

test.describe('Pastebin case study page', () => {
  test('renders every section and links to the public repo', async ({ page }) => {
    await page.goto('/projects/pastebin')
    await expect(page.getByRole('heading', { level: 1, name: 'Pastebin' })).toBeVisible()
    for (const heading of ['The problem', 'Constraints', 'Approach', 'Key decisions', 'Challenges', 'Results', 'What I would do next']) {
      await expect(page.getByRole('heading', { name: heading })).toBeVisible()
    }
    await expect(page.locator('article a', { hasText: 'GitHub repo' })).toHaveAttribute('href', REPO)
    await expect(page.locator('article pre')).toHaveCount(0)
  })

  test('appears on the case studies page and in the sitemap', async ({ page, request }) => {
    await page.goto('/case-studies')
    await expect(page.locator('a[href="/projects/pastebin"]').first()).toBeVisible()
    expect(await (await request.get('/sitemap.xml')).text()).toContain('/projects/pastebin')
  })

  test('has no horizontal scroll on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/projects/pastebin')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0)
  })
})

test.describe('chatbot knowledge: system design', () => {
  const ids = (q: string) => retrieveChunkDetails(q, 5).chunks.map(c => c.id)
  test('retrieves the Pastebin chunk and its links', () => {
    expect(ids('tell me about the Pastebin project')).toContain('system_design_pastebin')
    const { text } = retrieveChunkDetails('what system design projects have you done', 5)
    expect(text).toContain('/portfolio#system-design')
    expect(text).toContain('DESIGN ONLY')
  })
})

test.describe('system design pages', () => {
  test('index lists every project and links to its design page', async ({ page, request }) => {
    await page.goto('/system-design')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByLabel('System designs').locator('a[href="/system-design/pastebin"]')).toBeVisible()
    expect(await (await request.get('/sitemap.xml')).text()).toContain('/system-design/pastebin')
  })

  test('the section links to the full design', async ({ page }) => {
    await page.goto('/portfolio')
    await page.locator('#system-design').getByRole('link', { name: 'Read the full design' }).click()
    await expect(page).toHaveURL(/\/system-design\/pastebin$/)
  })

  test('detail page has every part of the design, with built and design-only marks', async ({ page }) => {
    await page.goto('/system-design/pastebin')
    await expect(page.getByRole('heading', { level: 1, name: 'Pastebin' })).toBeVisible()
    for (const h of ['Requirements', 'Estimates', 'API', 'Short codes', 'Data model', 'Components', 'Write path: create a paste', 'Read path: open a link', 'Expiry', 'Rate limiting', 'Security (design only)']) {
      await expect(page.getByRole('heading', { name: h, exact: true })).toBeVisible()
    }
    await expect(page.getByLabel('Components').getByText('Design only').first()).toBeVisible()
    await expect(page.getByLabel('Components').getByText('Built', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('/pastes/:code')).toBeVisible()
    await expect(page.locator('article pre')).toHaveCount(0)
  })

  test('detail page has no horizontal scroll on a phone and no performance claims', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/system-design/pastebin')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0)
    const text = await page.locator('article').innerText()
    expect(text).not.toMatch(/latency|\d\s?ms\b|handles [\d,]+ (users|requests)/i)
  })

  test('unknown design returns 404', async ({ request }) => {
    expect((await request.get('/system-design/nope')).status()).toBe(404)
  })

  test('chatbot knows the read path and what is design only', () => {
    const { text } = retrieveChunkDetails('explain the pastebin read path and what is design only', 5)
    expect(text).toContain('READ PATH')
    expect(text).toContain('[design only]')
  })

  test('detail page shows the four diagrams, sharp and enlargeable', async ({ page }) => {
    await page.goto('/system-design/pastebin')
    const section = page.locator('#diagrams')
    await expect(section.locator('img')).toHaveCount(4)
    for (const img of await section.locator('img').all()) {
      await img.scrollIntoViewIfNeeded()
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
    }
    await section.getByRole('button').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('case study shows the diagrams under a Diagrams heading', async ({ page }) => {
    await page.goto('/projects/pastebin')
    await expect(page.getByRole('heading', { name: 'Diagrams', exact: true })).toBeVisible()
    await expect(page.locator('#screens img')).toHaveCount(4)
  })

  test('detail page content has side padding of at least 24px on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/system-design/pastebin')
    const left = await page.locator('article').first().evaluate(el => el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft))
    expect(left).toBeGreaterThanOrEqual(24)
  })

  test('chatbot lists Pastebin among the projects and the About section mentions research', async ({ page }) => {
    const { text } = retrieveChunkDetails('show me the pastebin project you built', 5)
    expect(text).toContain('/system-design/pastebin')
    await page.goto('/portfolio')
    await expect(page.locator('#aboutme')).toContainText('research')
    await expect(page.locator('#aboutme')).toContainText('system design')
    await expect(page.locator('#aboutme')).not.toContainText('final year')
  })
})
