import { test, expect } from '@playwright/test'

// Real route tests. The missing-message check never reaches the model; live tests run with LIVE_API=1
// Fails with the response body (e.g. a 429 from the rate limiter) instead of a confusing TypeError
async function readEvents(response: import('@playwright/test').APIResponse) {
  const raw = await response.text()
  expect(response.status(), raw.slice(0, 300)).toBe(200)
  return parse(raw)
}

// Groq's free tier has a tokens-per-minute cap, so live calls retry after a 429
async function postChat(request: import('@playwright/test').APIRequestContext, options: { data: object }) {
  for (let attempt = 0; ; attempt++) {
    const response = await request.post('/api/chat', options)
    if (response.status() !== 429 || attempt >= 2) return response
    await new Promise(resolve => setTimeout(resolve, 25_000))
  }
}

const parse = (raw: string) =>
  raw
    .split('\n')
    .filter(l => l.startsWith('data: ') && !l.includes('[DONE]'))
    .map(l => JSON.parse(l.slice(6)) as Record<string, any>)

test.describe('/api/chat', () => {
  test('rejects a request without a message', async ({ request }) => {
    const response = await request.post('/api/chat', { data: {} })
    expect(response.status()).toBe(400)
    expect((await response.json()).error).toMatch(/required/i)
  })

  test.describe('live model', () => {
    test.skip(!process.env.LIVE_API, 'set LIVE_API=1 to hit the real model')
    test.setTimeout(120_000)
    // The route has an in-memory rate limiter (12/min) and Groq has token limits: don't fire these in parallel
    test.describe.configure({ mode: 'serial' })

    test('"continue" retrieves with the previous question and reports it in the trace', async ({ request }) => {
      const response = await postChat(request, {
        data: {
          message: 'continue',
          conversationHistory: [
            { sender: 'user', text: 'Tell me about SEFA' },
            { sender: 'bot', text: 'SEFA is an AI budgeting app that' },
          ],
        },
      })
      const events = await readEvents(response)
      const trace = events.find(e => e.trace)!.trace as { step: string; label: string; detail?: string; items?: string[] }[]
      expect(trace[0].label).toBe('Continuation')
      const retrieve = trace.find(t => t.step === 'retrieve')!
      expect(retrieve.detail).toContain('Tell me about SEFA')
      expect(retrieve.items!.some(i => i.startsWith('sefa'))).toBe(true)
    })

    test('a LinkedIn question triggers the web step (searched, or skipped with a reason)', async ({ request }) => {
      const response = await postChat(request, { data: { message: 'What does his LinkedIn say?', conversationHistory: [] } })
      const events = await readEvents(response)
      const trace = events.find(e => e.trace)!.trace as { step: string; label: string; detail?: string }[]
      const web = trace.find(t => t.step === 'web')!
      expect(web.label).not.toBe('Web search not needed')
      // With a Tavily key the trace shows the query; without one it shows why the search was skipped
      expect(web.detail).toMatch(/^(Query: .*LinkedIn|Reason: (no API key|failed|no results))/)
    })

    test('an ordinary question skips web search and retrieves relevant chunks', async ({ request }) => {
      const response = await postChat(request, { data: { message: 'Tell me about your experience', conversationHistory: [] } })
      const events = await readEvents(response)
      const trace = events.find(e => e.trace)!.trace as { step: string; label: string; items?: string[] }[]
      expect(trace.find(t => t.step === 'web')!.label).toBe('Web search not needed')
      expect(trace.find(t => t.step === 'retrieve')!.items!.length).toBeGreaterThan(0)
    })
  })
})
