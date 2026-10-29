import { test, expect, type Page } from '@playwright/test'
import { mockChat, openChat, send, input } from './helpers'

// Fake Web Speech APIs so voice features can be tested headlessly
async function installFakeSpeech(page: Page) {
  await page.addInitScript(() => {
    const w = window as any
    w.__spoken = []
    class FakeRecognition {
      lang = ''
      interimResults = false
      continuous = false
      onresult: any = null
      onend: any = null
      onerror: any = null
      start() {
        w.__recognition = this
      }
      stop() {
        this.onend?.()
      }
    }
    w.SpeechRecognition = FakeRecognition
    w.webkitSpeechRecognition = FakeRecognition
    w.SpeechSynthesisUtterance = class {
      text: string
      lang = ''
      onend: any = null
      onerror: any = null
      constructor(text: string) {
        this.text = text
      }
    }
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: { speak: (u: any) => w.__spoken.push(u.text), cancel: () => {} },
    })
  })
}

test.describe('voice mode', () => {
  test('mic dictates into the input and keeps existing text', async ({ page }) => {
    await installFakeSpeech(page)
    await openChat(page)
    await input(page).fill('Tell me')
    await page.getByTitle('Speak your question').click()
    await expect(page.getByTitle('Stop listening')).toBeVisible()
    await page.evaluate(() => {
      const r = (window as any).__recognition
      r.onresult({ results: [[{ transcript: 'about your projects' }]] })
    })
    await expect(input(page)).toHaveValue('Tell me about your projects')
    await page.getByTitle('Stop listening').click()
    await expect(page.getByTitle('Speak your question')).toBeVisible()
  })

  test('Listen reads the reply as plain text without markdown or markers', async ({ page }) => {
    await installFakeSpeech(page)
    await mockChat(page, [{ content: '## Hi\n**Bold** and a [link](https://example.com).' }])
    await openChat(page)
    await send(page, 'hello')
    await expect(page.getByText('Bold')).toBeVisible()
    await page.getByText('Bold').hover()
    await page.getByTitle('Listen').click()
    const spoken = await page.evaluate(() => (window as any).__spoken)
    expect(spoken).toEqual(['Hi Bold and a link.'])
  })

  test('read-replies-aloud toggle speaks finished replies automatically', async ({ page }) => {
    await installFakeSpeech(page)
    await mockChat(page, [{ content: 'Auto spoken reply' }])
    await openChat(page)
    await page.getByRole('button', { name: /Read replies aloud/ }).click()
    await send(page, 'hello')
    await expect(page.getByText('Auto spoken reply')).toBeVisible()
    await expect.poll(() => page.evaluate(() => (window as any).__spoken)).toEqual(['Auto spoken reply'])
  })

  test('does not speak automatically when the toggle is off', async ({ page }) => {
    await installFakeSpeech(page)
    await mockChat(page, [{ content: 'Silent reply' }])
    await openChat(page)
    await send(page, 'hello')
    await expect(page.getByText('Silent reply')).toBeVisible()
    expect(await page.evaluate(() => (window as any).__spoken)).toEqual([])
  })

  test('voice controls are hidden when the browser has no speech support', async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as any
      delete w.SpeechRecognition
      delete w.webkitSpeechRecognition
      delete (Window.prototype as any).speechSynthesis
      delete (window as any).speechSynthesis
    })
    await openChat(page)
    await expect(page.getByTitle('Speak your question')).toHaveCount(0)
    await expect(page.getByRole('button', { name: /Read replies aloud/ })).toHaveCount(0)
  })
})

test('a speech failure never replaces the reply with an error', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: { speak: () => { throw new Error('speech blocked') }, cancel: () => {} },
    })
  })
  await mockChat(page, [{ content: 'The real answer' }])
  await openChat(page)
  await page.getByRole('button', { name: /Read replies aloud/ }).click()
  await send(page, 'hello')
  await expect(page.getByText('The real answer')).toBeVisible()
  await expect(page.getByText(/speech blocked/)).toHaveCount(0)
})
