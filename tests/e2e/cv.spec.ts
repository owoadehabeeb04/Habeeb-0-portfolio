import { test, expect } from '@playwright/test'

test.describe('CV downloads', () => {
  test('the CV PDF is served as a PDF', async ({ request }) => {
    const response = await request.get('/Habeeb-Owoade-CV.pdf')
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('application/pdf')
    const body = await response.body()
    expect(body.subarray(0, 4).toString()).toBe('%PDF')
  })

  test('home page Download Resume and navbar Resume link to the local CV', async ({ page }) => {
    await page.goto('/portfolio')
    const download = page.getByRole('link', { name: 'Download Resume' })
    await expect(download).toHaveAttribute('href', '/Habeeb-Owoade-CV.pdf')
    await expect(download).toHaveAttribute('download', 'Habeeb-Owoade-CV.pdf')

    const resumeLinks = page.getByRole('link', { name: 'Resume', exact: true })
    expect(await resumeLinks.count()).toBeGreaterThan(0)
    for (const link of await resumeLinks.all()) {
      await expect(link).toHaveAttribute('href', '/Habeeb-Owoade-CV.pdf')
    }
  })

  test('no page still links to the old Dropbox resume', async ({ page }) => {
    for (const path of ['/', '/portfolio', '/ask-habeeb']) {
      await page.goto(path)
      await expect(page.locator('a[href*="dropbox.com"]')).toHaveCount(0)
    }
  })

  test('clicking Download Resume triggers a PDF download', async ({ page }) => {
    await page.goto('/portfolio')
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('link', { name: 'Download Resume' }).click(),
    ])
    expect(download.suggestedFilename()).toBe('Habeeb-Owoade-CV.pdf')
  })
})
