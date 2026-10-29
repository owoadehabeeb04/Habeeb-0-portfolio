import { expect, type Page } from '@playwright/test'

export type SseEvent = Record<string, unknown>

export interface ChatRequest {
  message: string
  conversationHistory: { sender: string; text: string }[]
}

// Fulfils /api/chat with a canned SSE stream and records every request body
export async function mockChat(page: Page, replies: SseEvent[][] | SseEvent[]) {
  const requests: ChatRequest[] = []
  const scripts: SseEvent[][] = Array.isArray(replies[0]) ? (replies as SseEvent[][]) : [replies as SseEvent[]]
  let call = 0

  await page.route('**/api/chat', async route => {
    requests.push(route.request().postDataJSON())
    const events = scripts[Math.min(call++, scripts.length - 1)]
    const body = events.map(e => `data: ${JSON.stringify(e)}\n\n`).join('') + 'data: [DONE]\n\n'
    await route.fulfill({ status: 200, contentType: 'text/event-stream', body })
  })
  return requests
}

export const input = (page: Page) => page.getByPlaceholder('Ask anything')

export async function send(page: Page, text: string) {
  await input(page).fill(text)
  await page.getByTitle('Send').click()
}

export async function openChat(page: Page) {
  await page.goto('/ask-habeeb')
  await expect(input(page)).toBeVisible()
}
