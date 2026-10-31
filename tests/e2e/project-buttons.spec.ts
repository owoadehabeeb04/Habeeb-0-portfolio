import { test, expect } from '@playwright/test'

for (const path of ['/projects', '/portfolio']) {
  for (const width of [390, 1280]) {
    test(`project buttons finish without blur or transforms at ${path} (${width}px)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(path)
      const links = page.getByRole('link', { name: 'Read case study', exact: true })
      await expect(links).toHaveCount(4)
      for (const link of await links.all()) {
        await link.scrollIntoViewIfNeeded()
        const actions = link.locator('..')
        await expect(actions).toHaveClass(/project-buttons-animate/)
        await expect(actions).toHaveCSS('opacity', '1')
        await expect(actions).toHaveCSS('filter', 'none')
        await expect(actions).toHaveCSS('transform', 'none')
        await expect(link).toHaveAttribute('href', /\/projects\//)
        await expect(actions.getByRole('link', { name: 'View Project', exact: true })).toHaveAttribute('href', /^https:\/\//)
      }
    })
  }
}
