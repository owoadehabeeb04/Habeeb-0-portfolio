import Groq from 'groq-sdk'
import { NextRequest } from 'next/server'
import { geminiRateLimiter } from '@/lib/rate-limiter'
import { retrieveRelevantChunks } from '@/lib/portfolio-data'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (!process.env.GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: 'GROQ_API_KEY is not configured' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Check rate limit before making request
    if (!geminiRateLimiter.canMakeRequest()) {
      const waitTime = geminiRateLimiter.getWaitTime()
      return new Response(JSON.stringify({ 
        error: `⏳ Please wait ${waitTime} seconds before sending another message.`,
        details: 'Rate limit protection active'
      }), { 
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Initialize Groq client
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })

    // RAG: Retrieve relevant context based on user query
    const relevantContext = retrieveRelevantChunks(message, 3)

    // Detect if user is using third person (he/his/Habeeb) or second person (you/your)
    const isThirdPerson = /\b(he|his|him|habeeb|habeeb'?s)\b/i.test(message)

    // Dynamic system prompt with retrieved context (only relevant chunks - saves tokens!)
    const systemPrompt = `You are Habeeb's AI assistant. Answer questions about Habeeb Owoade using ONLY the context below. Be conversational, detailed, and engaging.

CONTEXT:
${relevantContext}

CRITICAL RULES:
- Provide COMPREHENSIVE, DETAILED responses - go into depth!
- When discussing experience or projects, include specific achievements, metrics, technologies, and impact
- Use bullet points for lists and structure longer responses clearly
- Format ALL URLs as proper clickable markdown links in this EXACT format: [Link Text](full-url)
- For project links in context, use them EXACTLY as provided: [View Project](https://example.com/)
- NEVER create broken or partial links - always include the full URL from the context
- NEVER say "Unfortunately", "The context does not provide", or "Check his portfolio"
- You ARE the portfolio - provide direct, detailed answers
- When mentioning "see all skills" or "full list of technologies", ALWAYS link to: [see his full list of technologies](/#skills)
- When mentioning "view all projects" or "see his projects", link to: [view his projects](/#projects)

PERSPECTIVE RULES:
${isThirdPerson 
  ? '- User is asking about Habeeb in THIRD PERSON - respond using "he/his/him/Habeeb"\n- Example: "He built...", "His experience includes...", "Habeeb has worked on..."' 
  : '- User is addressing Habeeb directly in SECOND PERSON - respond using "I/my/me" as if you ARE Habeeb\n- Example: "I built...", "My experience includes...", "I\'ve worked on..."'
}

RESPONSE STYLE:
- For experience questions: Detail each role, responsibilities, achievements, tech stack, and impact
- For technical questions: Explain technologies used, how they were applied, and outcomes
- For project questions: Describe features, challenges solved, technologies, and results with proper markdown links from context
- Use concrete examples and specific details from the context
- Make responses informative and thorough - don't hold back on relevant details!
- When the context contains a link like "Live: https://example.com/", format it as: [View Project](https://example.com/)
- When the context contains "GitHub: github.com/username/repo", format it as: [GitHub](https://github.com/username/repo)
- ALWAYS include full URLs in links - never truncate or shorten them

SPECIAL UI TRIGGERS (USE VERY CAREFULLY):
- ONLY use [SHOW_PROJECTS] when user explicitly asks to SEE/VIEW/SHOW projects
- Examples that SHOULD trigger UI: "show me your projects", "display your work", "let me see what you've built"
- Examples that should NOT trigger UI: "can he build X based on his projects", "what's his experience", "has he worked on Y", "tell me about your experience"
- Questions ABOUT projects/experience = answer in DETAILED text with links
- Requests to SEE projects = use [SHOW_PROJECTS] marker
- For fullstack only: [SHOW_PROJECTS:fullstack]
- For frontend only: [SHOW_PROJECTS:frontend]
- For skills: Only use [SHOW_SKILLS] when user asks to SEE/VIEW skills, not when asking "what skills does he have"
- Default to DETAILED TEXT answers with markdown links unless user clearly wants a visual display`

    // Build message history (last 4 messages to save tokens)
    const messages = [
      {
        role: 'system' as const,
        content: systemPrompt,
      },
      ...conversationHistory.slice(-4).map((msg: { sender: string; text: string }) => ({
        role: msg.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.text,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ]

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', 
      messages,
      temperature: 0.7,
      max_tokens: 800, // Increased for detailed responses
      top_p: 1,
      stream: true,
    })

    // Create a readable stream for SSE
    const encoder = new TextEncoder()
    let fullResponse = '' // Collect full response to check for markers
    let streamedResponse = '' // What we've already sent to client
    
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              fullResponse += content
              
              // Check if we're in the middle of a potential marker
              const markers = ['[SHOW_PROJECTS:fullstack]', '[SHOW_PROJECTS:frontend]', '[SHOW_PROJECTS]', '[SHOW_SKILLS]']
              let isPartialMarker = false
              
              // Check if current fullResponse ends with a partial marker
              for (const marker of markers) {
                for (let i = 1; i < marker.length; i++) {
                  if (fullResponse.endsWith(marker.substring(0, i))) {
                    isPartialMarker = true
                    break
                  }
                }
                if (isPartialMarker) break
              }
              
              // Only stream if we're not potentially building a marker
              if (!isPartialMarker) {
                // Stream the new content (excluding any complete markers)
                let contentToStream = fullResponse.substring(streamedResponse.length)
                
                // Remove any complete markers from content to stream
                for (const marker of markers) {
                  contentToStream = contentToStream.replace(marker, '')
                }
                
                if (contentToStream) {
                  streamedResponse += contentToStream
                  const data = `data: ${JSON.stringify({ content: contentToStream })}\n\n`
                  controller.enqueue(encoder.encode(data))
                }
              }
            }
          }
          
          // After streaming is done, check for UI trigger markers and send final cleanup
          let action = undefined
          let filter = 'all'
          let cleanedMessage = fullResponse
          
          if (fullResponse.includes('[SHOW_PROJECTS:fullstack]')) {
            action = 'SHOW_PROJECTS'
            filter = 'fullstack'
            cleanedMessage = fullResponse.replace('[SHOW_PROJECTS:fullstack]', '').trim()
          } else if (fullResponse.includes('[SHOW_PROJECTS:frontend]')) {
            action = 'SHOW_PROJECTS'
            filter = 'frontend'
            cleanedMessage = fullResponse.replace('[SHOW_PROJECTS:frontend]', '').trim()
          } else if (fullResponse.includes('[SHOW_PROJECTS]')) {
            action = 'SHOW_PROJECTS'
            cleanedMessage = fullResponse.replace('[SHOW_PROJECTS]', '').trim()
          } else if (fullResponse.includes('[SHOW_SKILLS]')) {
            action = 'SHOW_SKILLS'
            cleanedMessage = fullResponse.replace('[SHOW_SKILLS]', '').trim()
          }
          
          // Send any remaining content that wasn't streamed (after removing markers)
          if (cleanedMessage.length > streamedResponse.length) {
            const remaining = cleanedMessage.substring(streamedResponse.length)
            if (remaining) {
              const data = `data: ${JSON.stringify({ content: remaining })}\n\n`
              controller.enqueue(encoder.encode(data))
            }
          }
          
          // Send action metadata if any marker was found
          if (action) {
            const metadata = `data: ${JSON.stringify({ action, filter })}\n\n`
            controller.enqueue(encoder.encode(metadata))
          }
          
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error: any) {
    console.error('Error calling Groq API:', error)
    
    // Handle quota exceeded errors with helpful message
    if (error.status === 429 || error.message?.includes('quota')) {
      return new Response(JSON.stringify({ 
        error: '⏳ API quota limit reached. Please try again in a few minutes.',
        details: 'Rate limit exceeded.'
      }), { 
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    return new Response(JSON.stringify({ 
      error: 'Failed to get response from AI', 
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

