import { test, expect } from '@playwright/test'
import { retrieveChunkDetails } from '../../lib/portfolio-data'

// The chatbot answers from these chunks, so check the right ones come back for typical questions
const retrieved = (question: string) => retrieveChunkDetails(question, 5).chunks.map(c => c.id)

test.describe('chatbot knowledge', () => {
  test('knows about the publications', () => {
    expect(retrieved('what research papers have you published')).toContain('research_publications')
  })

  test('knows the revalidation study numbers', () => {
    const { text } = retrieveChunkDetails('what is the F1 of the revalidation study', 5)
    expect(text).toContain('0.9385')
    expect(text).toContain('0.8842')
    expect(text).toContain('https://doi.org/10.5281/zenodo.23363804')
  })

  test('knows the research interests', () => {
    expect(retrieved('what are your research interests')).toContain('research_interests')
  })

  test('knows the Expo project', () => {
    expect(retrieved('tell me about the Expo project')).toContain('research_expo')
  })

  test('links to the section and the academic CV', () => {
    const { text } = retrieveChunkDetails('what research have you done', 5)
    expect(text).toContain('/portfolio#research')
    expect(text).toContain('/Habeeb-Owoade-Academic-CV.pdf')
  })

  test('the SEFA numbers carry the evidence boundaries', () => {
    const { text } = retrieveChunkDetails('what evidence boundaries does the SEFA paper state', 5)
    expect(text).toContain('3,880')
    expect(text).toMatch(/PDF\/OCR/)
  })

  test('the voice, read-aloud and job-match features are gone from the knowledge base', () => {
    const { text } = retrieveChunkDetails('can I paste a job description or use voice', 5)
    expect(text).not.toMatch(/Match me to a job|read replies aloud/i)
  })
})
