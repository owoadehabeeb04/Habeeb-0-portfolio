// Simple in-memory rate limiter for Gemini API
class RateLimiter {
  private requests: number[] = []
  private readonly maxRequests = 12 // Leave buffer (15/min limit)
  private readonly timeWindow = 60000 // 1 minute

  canMakeRequest(): boolean {
    const now = Date.now()
    // Remove requests older than time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow)
    
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now)
      return true
    }
    
    return false
  }

  getWaitTime(): number {
    if (this.requests.length === 0) return 0
    const oldestRequest = Math.min(...this.requests)
    const waitTime = this.timeWindow - (Date.now() - oldestRequest)
    return Math.max(0, Math.ceil(waitTime / 1000)) // seconds
  }
}

export const geminiRateLimiter = new RateLimiter()
