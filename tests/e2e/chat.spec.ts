import { test, expect } from '@playwright/test'
import { mockChat, openChat, send, input } from './helpers'

test.describe('chat basics', () => {
  test('shows suggestion chips including the job matcher chip', async ({ page }) => {
    await openChat(page)
    await expect(page.getByRole('button', { name: 'Match me to a job' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Show me your projects' })).toBeVisible()
  })

  test('streams a reply and sends the message with history', async ({ page }) => {
    const requests = await mockChat(page, [{ content: 'Hello ' }, { content: 'there, I am Habeeb.' }])
    await openChat(page)
    await send(page, 'hi')
    await expect(page.getByText('Hello there, I am Habeeb.')).toBeVisible()
    expect(requests[0].message).toBe('hi')
    expect(requests[0].conversationHistory).toEqual([])
  })

  test('sends up to the last 12 messages as history', async ({ page }) => {
    const requests = await mockChat(page, [{ content: 'ok' }])
    await openChat(page)
    for (let i = 1; i <= 8; i++) {
      await send(page, `question ${i}`)
      await expect(page.getByText('ok')).toHaveCount(i)
    }
    // 7 earlier exchanges = 14 messages, trimmed to the newest 12
    expect(requests[7].conversationHistory).toHaveLength(12)
    expect(requests[7].conversationHistory[0].text).toBe('question 2')
  })

  test('renders markdown tables from replies', async ({ page }) => {
    await mockChat(page, [{ content: '| Phase | Tech |\n|---|---|\n| Plan | Figma |' }])
    await openChat(page)
    await send(page, 'table please')
    await expect(page.locator('table')).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Figma' })).toBeVisible()
  })

  test('shows a friendly message on rate limit (429)', async ({ page }) => {
    await page.route('**/api/chat', route =>
      route.fulfill({ status: 429, contentType: 'application/json', body: JSON.stringify({ error: 'slow down' }) })
    )
    await openChat(page)
    await send(page, 'hi')
    await expect(page.getByText(/quota limit reached/i)).toBeVisible()
  })

  test('keeps the conversation after a reload', async ({ page }) => {
    await mockChat(page, [{ content: 'Persisted answer' }])
    await openChat(page)
    await send(page, 'remember me')
    await expect(page.getByText('Persisted answer')).toBeVisible()
    await page.reload()
    await expect(page.getByText('Persisted answer')).toBeVisible()
    await expect(page.getByText('remember me')).toBeVisible()
  })

  test('clears the conversation', async ({ page }) => {
    await mockChat(page, [{ content: 'to be cleared' }])
    await openChat(page)
    await send(page, 'hello')
    await expect(page.getByText('to be cleared')).toBeVisible()
    await page.getByTitle('Clear chat').first().click()
    await page.getByRole('button', { name: 'Clear All' }).click()
    await expect(page.getByText('to be cleared')).toHaveCount(0)
  })

  test('editing a user message resends it', async ({ page }) => {
    const requests = await mockChat(page, [[{ content: 'first answer' }], [{ content: 'second answer' }]])
    await openChat(page)
    await send(page, 'original question')
    await expect(page.getByText('first answer')).toBeVisible()
    await page.getByText('original question').hover()
    await page.getByTitle('Edit').click()
    await page.locator('textarea[rows="4"]').fill('edited question')
    await page.getByRole('button', { name: 'Save' }).click()
    await expect(page.getByText('second answer')).toBeVisible()
    expect(requests[1].message).toBe('edited question')
    expect(requests[1].conversationHistory).toEqual([])
  })
})

test.describe('UI triggers', () => {
  test('SHOW_PROJECTS action renders project cards and respects the filter', async ({ page }) => {
    await mockChat(page, [{ content: 'Here you go.' }, { action: 'SHOW_PROJECTS', filter: 'all' }])
    await openChat(page)
    await send(page, 'show me your projects')
    const all = page.locator('a[target="_blank"]:has(img)')
    await expect(all.first()).toBeVisible()
    const allCount = await all.count()

    await page.getByTitle('Clear chat').first().click()
    await page.getByRole('button', { name: 'Clear All' }).click()

    await page.unroute('**/api/chat')
    await mockChat(page, [{ content: 'Fullstack.' }, { action: 'SHOW_PROJECTS', filter: 'fullstack' }])
    await send(page, 'show me your fullstack projects')
    await expect(all.first()).toBeVisible()
    expect(await all.count()).toBeLessThan(allCount)
  })

  test('SHOW_SKILLS action renders without errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', e => errors.push(e.message))
    await mockChat(page, [{ content: 'His skills:' }, { action: 'SHOW_SKILLS', filter: 'all' }])
    await openChat(page)
    await send(page, 'show me your skills')
    await expect(page.getByText('His skills:')).toBeVisible()
    expect(errors).toEqual([])
  })
})

test.describe('truncation and continue', () => {
  test('shows Continue when the answer was cut off and sends "continue" with history', async ({ page }) => {
    const requests = await mockChat(page, [
      [{ content: 'Part one of a long answer' }, { truncated: true }],
      [{ content: ' and part two.' }],
    ])
    await openChat(page)
    await send(page, 'long question')
    const cont = page.getByRole('button', { name: 'Continue response' })
    await expect(cont).toBeVisible()
    await cont.click()
    await expect(page.getByText('and part two.')).toBeVisible()
    expect(requests[1].message).toBe('continue')
    expect(requests[1].conversationHistory.map(m => m.text)).toEqual(['long question', 'Part one of a long answer'])
    await expect(cont).toHaveCount(0)
  })

  test('does not show Continue for complete answers', async ({ page }) => {
    await mockChat(page, [{ content: 'complete' }])
    await openChat(page)
    await send(page, 'short')
    await expect(page.getByText('complete')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Continue response' })).toHaveCount(0)
  })
})

test.describe('sources, trace and job match', () => {
  test('shows a Sources line with clickable links', async ({ page }) => {
    await mockChat(page, [
      { content: 'See his GitHub.' },
      { sources: [{ title: 'GitHub profile', url: 'https://github.com/owoadehabeeb04' }] },
    ])
    await openChat(page)
    await send(page, 'what is on his github?')
    const link = page.getByRole('link', { name: 'GitHub profile' })
    await expect(link).toHaveAttribute('href', 'https://github.com/owoadehabeeb04')
  })

  test('agent trace is collapsed by default and expands with the steps', async ({ page }) => {
    await mockChat(page, [
      {
        trace: [
          { step: 'mode', label: 'Question' },
          { step: 'retrieve', label: 'Retrieved 2 knowledge chunks', detail: 'Query: skills', items: ['skills (score 5)', 'bio (score 2)'] },
          { step: 'web', label: 'Web search skipped', detail: 'Reason: no API key' },
        ],
      },
      { content: 'answer with trace' },
    ])
    await openChat(page)
    await send(page, 'skills?')
    await expect(page.getByText('answer with trace')).toBeVisible()
    await expect(page.getByText('Retrieved 2 knowledge chunks')).toHaveCount(0)
    await page.getByRole('button', { name: /How I answered/ }).click()
    await expect(page.getByText('Retrieved 2 knowledge chunks')).toBeVisible()
    await expect(page.getByText('skills (score 5)')).toBeVisible()
    await expect(page.getByText('Reason: no API key')).toBeVisible()
  })

  test('the job match chip prefills the input and focuses it', async ({ page }) => {
    await openChat(page)
    await page.getByRole('button', { name: 'Match me to a job' }).click()
    await expect(input(page)).toHaveValue(/how well does Habeeb fit\?/)
    await expect(input(page)).toBeFocused()
  })

  test('job match reply shows the fit score badge', async ({ page }) => {
    await mockChat(page, [{ content: '## Fit score: 87/100\nStrong match.' }, { fitScore: 87 }])
    await openChat(page)
    await send(page, "Here's a job description - how well does Habeeb fit?\n\nReact role")
    await expect(page.getByText('87/100').first()).toBeVisible()
    await expect(page.getByText('Job fit')).toBeVisible()
  })
})
