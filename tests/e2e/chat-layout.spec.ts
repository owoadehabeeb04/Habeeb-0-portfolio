import { test, expect } from '@playwright/test'
import { mockChat, send, input } from './helpers'

const paragraph = 'Habeeb builds full-stack applications with React, Next.js, TypeScript, and Node.js. His work covers responsive interfaces, backend services, and AI integrations that solve practical problems.'
const reply = `${paragraph}\n\n- Responsive web applications\n- Backend services and AI integrations\n\n[Project details](https://example.com/${'project-details-'.repeat(15)})\n\n| Project | Stack |\n|---|---|\n| Portfolio | Next.js and TypeScript |`

for (const path of ['/', '/ask-habeeb']) {
  for (const width of [320, 390, 430]) {
    test(`AI replies use the full mobile content width at ${path} (${width}px)`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 844 })
      await mockChat(page, [{ content: reply }])
      await page.goto(path)
      await expect(input(page)).toBeVisible()
      await send(page, 'Tell me about your experience')
      const answer = page.getByText(paragraph, { exact: true })
      await expect(answer).toBeVisible()
      const layout = await answer.evaluate(element => {
        const column = element.parentElement!.parentElement!.parentElement!
        const row = column.parentElement!
        return {
          answer: element.getBoundingClientRect().width,
          column: column.getBoundingClientRect().width,
          row: row.getBoundingClientRect().width,
          overflow: document.documentElement.scrollWidth - window.innerWidth,
        }
      })
      await page.screenshot({ path: testInfo.outputPath('mobile-chat.png'), fullPage: true })
      expect(layout.column, JSON.stringify(layout)).toBeCloseTo(layout.row, 0)
      expect(layout.answer, JSON.stringify(layout)).toBeCloseTo(layout.row, 0)
      expect(layout.overflow).toBeLessThanOrEqual(0)
    })
  }
}
