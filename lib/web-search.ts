// Tavily web search for questions the local portfolio data can't answer (LinkedIn, GitHub, publications, recent activity)
export interface WebSource {
  title: string
  url: string
  content: string
}

// Only search the web when the question is about public/online presence or recent activity
const WEB_SEARCH_TRIGGER =
  /linkedin|recommendation|endorse|certif|github|repo(sitor|s\b)|stars?\b|zenodo|preprint|paper|publication|article|blog|post(s|ed)?\b|talk|podcast|news|latest|recent(ly)?|announce|award|featured|mention/i

// Pages that are actually about Habeeb; keeps results on-topic and on-trust
const SEARCH_DOMAINS = ['linkedin.com', 'github.com', 'zenodo.org', 'doi.org', 'dev.to', 'medium.com', 'x.com', 'twitter.com']

export interface WebSearchResult {
  query: string
  domains: string[]
  sources: WebSource[]
  // Why no results were used, when sources is empty
  skipped?: 'no API key' | 'failed'
}

export const shouldSearchWeb = (message: string) => WEB_SEARCH_TRIGGER.test(message)

export async function searchWeb(message: string): Promise<WebSearchResult> {
  const query = `Owoade Habeeb Temitope (owoadehabeeb04) ${message}`
  const base = { query, domains: SEARCH_DOMAINS }
  const apiKey = process.env.TAVILY_API_KEY
  if (!apiKey) return { ...base, sources: [], skipped: 'no API key' }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        query,
        search_depth: 'basic',
        max_results: 4,
        include_domains: SEARCH_DOMAINS,
      }),
      signal: AbortSignal.timeout(6000),
    })
    if (!response.ok) return { ...base, sources: [], skipped: 'failed' }

    const data = await response.json()
    const sources: WebSource[] = (data.results ?? [])
      .filter((r: { url?: string; content?: string }) => r.url && r.content)
      .map((r: { title?: string; url: string; content: string }) => ({
        title: r.title || r.url,
        url: r.url,
        content: r.content.slice(0, 700),
      }))
    return { ...base, sources }
  } catch {
    // Search is best-effort: the bot still answers from the portfolio data
    return { ...base, sources: [], skipped: 'failed' }
  }
}
