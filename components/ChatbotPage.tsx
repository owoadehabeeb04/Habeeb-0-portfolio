'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { fullstackProjects, frontendProjects, skills } from '@/constants'
import Image from 'next/image'
import { useChatStore } from '@/store/chatStore'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Message } from '@/types'
import ThemeToggle from '@/components/ThemeToggle'
import Navbar from '@/components/Navbar'

interface ChatbotPageProps {
  homeIcon?: 'home' | 'close'
  homeLink?: string
}

export default function ChatbotPage({ homeIcon = 'home', homeLink = '/portfolio' }: ChatbotPageProps) {
  const messages = useChatStore((state) => state.messages)
  const addMessage = useChatStore((state) => state.addMessage)
  const updateMessage = useChatStore((state) => state.updateMessage)
  const removeMessagesAfter = useChatStore((state) => state.removeMessagesAfter)
  const clearMessages = useChatStore((state) => state.clearMessages)
  
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editedText, setEditedText] = useState('')
  const [showClearDialog, setShowClearDialog] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [mounted, setMounted] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const handleEdit = (messageId: string, currentText: string) => {
    setEditingMessageId(messageId)
    setEditedText(currentText)
  }

  const saveEdit = async (messageId: string) => {
    if (!editedText.trim()) return

    // Update the message text using store
    updateMessage(messageId, { text: editedText })

    // If it's a user message, resend to get new bot response
    const editedMessage = messages.find(m => m.id === messageId)
    if (editedMessage?.sender === 'user') {
      // Remove all messages after the edited one using store
      removeMessagesAfter(messageId)
      
      setIsTyping(true)
      try {
        const messageIndex = messages.findIndex(m => m.id === messageId)
        const recentHistory = messages.slice(0, messageIndex).slice(-4).map(msg => ({
          sender: msg.sender,
          text: msg.text,
        }))

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: editedText,
            conversationHistory: recentHistory,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: data.message,
            sender: 'bot',
            timestamp: new Date(),
          }
          addMessage(botMessage)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsTyping(false)
      }
    }

    setEditingMessageId(null)
    setEditedText('')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    addMessage(userMessage)
    const currentInput = inputValue
    setInputValue('')
    setIsTyping(true)

    // Create placeholder for bot message
    const botMessageId = (Date.now() + 1).toString()
    const botMessage: Message = {
      id: botMessageId,
      text: '',
      sender: 'bot',
      timestamp: new Date(),
    }
    addMessage(botMessage)

    try {
      // Build conversation history (last 4 messages for context - saves tokens)
      const recentHistory = messages.slice(-4).map(msg => ({
        sender: msg.sender,
        text: msg.text,
      }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: recentHistory,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        // Show user-friendly error message for quota issues
        if (response.status === 429) {
          throw new Error('⏳ API quota limit reached. The chatbot will be back shortly. Please try again in a few minutes!')
        }
        throw new Error(errorData.error || 'Failed to get response')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let accumulatedText = ''
      let detectedAction: 'SHOW_PROJECTS' | 'SHOW_SKILLS' | undefined = undefined
      let detectedFilter: 'fullstack' | 'frontend' | 'all' = 'all'

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') {
                setIsTyping(false)
                break
              }
              try {
                const parsed = JSON.parse(data)
                
                // Check for action metadata (sent at the end)
                if (parsed.action) {
                  detectedAction = parsed.action
                  detectedFilter = parsed.filter || 'all'
                  
                  updateMessage(botMessageId, { 
                    action: detectedAction, 
                    filter: detectedFilter 
                  })
                } else if (parsed.content) {
                  // Regular streaming content (markers already stripped by backend)
                  accumulatedText += parsed.content
                  updateMessage(botMessageId, { text: accumulatedText })
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }

      setIsTyping(false)
    } catch (error: any) {
      console.error('Error:', error)
      updateMessage(botMessageId, { 
        text: error.message || 'Sorry, I encountered an error. Please try again.' 
      })
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col pb-48 sm:pb-52 md:pb-56">
      {/* Combined sticky container with Navbar and icons */}
      <div className="sticky top-0 z-50 bg-[var(--bg-primary)] border-b md:border-b-0 border-[var(--border)]/10">
        <div className="hidden md:flex items-center justify-between px-4 pt-4 pb-2 max-w-[95%] mx-auto">
          {/* Back Button - Clears conversation */}
          <button
            onClick={() => clearMessages()}
            className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors flex-shrink-0 text-[var(--text-primary)]"
            aria-label="Clear conversation"
            title="Clear conversation"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          {/* Navbar in the center */}
          <div className="lg:block hidden">
          <Navbar 
            navClassName="flex items-center" 
            navStyle={{}}
            showMobileNav={true}
            mobilePosition="top"
          />
          </div>
          
          {/* Theme Toggle and Clear Button */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {messages.length > 0 && (
              <button
                onClick={() => setShowClearDialog(true)}
                className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors flex-shrink-0 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                title="Clear chat"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Mobile: Full width layout */}
        <div className="md:hidden flex justify-between items-center  sm:p-3 p-1 ">
          <button
            onClick={() => clearMessages()}
            className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors flex-shrink-0 text-[var(--text-primary)]"
            aria-label="Clear conversation"
            title="Clear conversation"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <Navbar 
            navClassName="flex items-center" 
            navStyle={{}}
            showMobileNav={true}
            mobilePosition="top"
          />
          <div className=" flex items-center gap-2">
            <ThemeToggle />
            {messages.length > 0 && (
              <button
                onClick={() => setShowClearDialog(true)}
                className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors flex-shrink-0 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                title="Clear chat"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Clear Chat Confirmation Dialog */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Clear all messages?</DialogTitle>
            <DialogDescription>
              This will delete your entire conversation history. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowClearDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                clearMessages()
                setShowClearDialog(false)
              }}
            >
              Clear All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full px-4 py-8">
            {/* Hero Picture */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-4 sm:mb-6">
              <div className="absolute inset-0 rounded-full profile-glow"></div>
              <div className="absolute inset-0 border-2 sm:border-4 border-[var(--border)] rounded-full animate-pulse-slow"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-[var(--border)] shadow-2xl">
                <Image
                  src="/images/habeebportfolio.jpg"
                  alt="Habeeb Owoade"
                  fill
                  className="object-cover object-[center_0%]"
                  priority
                />
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--text-primary)] text-center mb-3">
              👋 Hi! I'm Habeeb's AI Assistant
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] text-center max-w-2xl">
              Ask me about Habeeb's projects, skills, experience, or contact information. 
              <br className="hidden sm:block" />
              Try: "Show me your projects" or "What technologies do you work with?"
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-3 sm:space-y-4 w-full">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                <div className={`max-w-[85%] sm:max-w-[80%] ${message.sender === 'user' ? 'flex flex-col items-end' : ''}`}>
                  {editingMessageId === message.id ? (
                    <div className="w-full">
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border)] rounded-2xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-[var(--text-primary)]"
                        rows={4}
                        autoFocus
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => saveEdit(message.id)}
                          className="px-4 py-1.5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full text-xs font-medium hover:opacity-90 transition-opacity"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingMessageId(null)
                            setEditedText('')
                          }}
                          className="px-4 py-1.5 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border)] rounded-full text-xs font-medium hover:opacity-90 transition-opacity"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`rounded-2xl px-3.5 py-2 ${
                          message.sender === 'user'
                            ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                            : 'text-[var(--text-primary)]'
                        }`}
                      >
                        {message.sender === 'bot' ? (
                          <div className="text-xs sm:text-sm leading-relaxed">
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeRaw]}
                              components={{
                                p: ({ children }) => (
                                  <p className="mb-2 last:mb-0 text-[var(--text-primary)]">{children}</p>
                                ),
                                a: ({ children, href, ...props }) => (
                                  <a 
                                    href={href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-400 underline hover:text-blue-300 transition-colors font-medium break-all"
                                    {...props}
                                  >
                                    {children}
                                  </a>
                                ),
                                ul: ({ children }) => (
                                  <ul className="list-disc pl-5 mb-3 space-y-1.5">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                  <ol className="list-decimal pl-5 mb-3 space-y-1.5">{children}</ol>
                                ),
                                li: ({ children }) => (
                                  <li className="text-[var(--text-primary)]">{children}</li>
                                ),
                                h1: ({ children }) => (
                                  <h1 className="text-base sm:text-lg font-bold mb-2 mt-3 text-[var(--text-primary)]">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                  <h2 className="text-sm sm:text-base font-semibold mb-2 mt-3 text-[var(--text-primary)]">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                  <h3 className="text-xs sm:text-sm font-semibold mb-1.5 mt-2 text-[var(--text-primary)]">{children}</h3>
                                ),
                                code: ({ children, className }) => {
                                  const isInline = !className;
                                  return isInline ? (
                                    <code className="bg-[var(--bg-secondary)] text-pink-400 px-1.5 py-0.5 rounded text-xs font-mono">
                                      {children}
                                    </code>
                                  ) : (
                                    <code className={className}>{children}</code>
                                  );
                                },
                                pre: ({ children }) => (
                                  <pre className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-3 overflow-x-auto mb-3">
                                    {children}
                                  </pre>
                                ),
                                blockquote: ({ children }) => (
                                  <blockquote className="border-l-4 border-[var(--border)] pl-4 italic text-[var(--text-secondary)] my-3">
                                    {children}
                                  </blockquote>
                                ),
                                table: ({ children }) => (
                                  <div className="overflow-x-auto my-4">
                                    <table className="w-full border-collapse border border-[var(--border)]">
                                      {children}
                                    </table>
                                  </div>
                                ),
                                thead: ({ children }) => (
                                  <thead className="bg-[var(--bg-secondary)]">{children}</thead>
                                ),
                                th: ({ children }) => (
                                  <th className="border border-[var(--border)] px-3 py-2 text-left font-semibold text-[var(--text-primary)]">
                                    {children}
                                  </th>
                                ),
                                td: ({ children }) => (
                                  <td className="border border-[var(--border)] px-3 py-2 text-[var(--text-primary)]">
                                    {children}
                                  </td>
                                ),
                                strong: ({ children }) => (
                                  <strong className="font-semibold text-[var(--text-primary)]">{children}</strong>
                                ),
                                em: ({ children }) => (
                                  <em className="italic">{children}</em>
                                ),
                                hr: ({ ...props }) => (
                                  <hr className="border-[var(--border)] my-4" {...props} />
                                ),
                              }}
                            >
                              {message.text}
                            </ReactMarkdown>
                            
                            {/* Show Projects UI when action is SHOW_PROJECTS */}
                            {message.action === 'SHOW_PROJECTS' && (
                              <div className="mt-4 space-y-3">
                                {[...fullstackProjects, ...frontendProjects]
                                  .filter(project => {
                                    if (message.filter === 'fullstack') return project.category === 'Fullstack'
                                    if (message.filter === 'frontend') return project.category === 'Frontend'
                                    return true
                                  })
                                  .map((project, index) => (
                                    <a
                                      key={project.title}
                                      href={project.liveUrl || '#'}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-3 hover:border-[var(--text-primary)] transition-all duration-300 hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4"
                                      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                                    >
                                      <div className="flex gap-3">
                                        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                                          <Image
                                            src={project.image}
                                            alt={project.alt}
                                            fill
                                            className="object-cover"
                                          />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-1 truncate">
                                            {project.title}
                                          </h3>
                                          {project.description && (
                                            <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-2">
                                              {project.description}
                                            </p>
                                          )}
                                          <div className="flex flex-wrap gap-1">
                                            {project.tags.slice(0, 3).map((tag) => (
                                              <span
                                                key={tag}
                                                className="px-2 py-0.5 bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded text-xs"
                                              >
                                                {tag}
                                              </span>
                                            ))}
                                            {project.tags.length > 3 && (
                                              <span className="px-2 py-0.5 text-[var(--text-secondary)] text-xs">
                                                +{project.tags.length - 3}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  ))}
                              </div>
                            )}
                            
                            {/* Show Skills UI when action is SHOW_SKILLS */}
                            {message.action === 'SHOW_SKILLS' && (
                              <div className="mt-4">
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                  {skills.map((skill) => (
                                    <div
                                      key={skill.name}
                                      className="flex flex-col items-center gap-2 p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg hover:border-[var(--text-primary)] transition-colors"
                                    >
                                      <div className="relative w-8 h-8">
                                        <Image
                                          src={skill.src}
                                          alt={skill.alt}
                                          fill
                                          className="object-contain"
                                        />
                                      </div>
                                      <span className="text-xs text-[var(--text-primary)] text-center">
                                        {skill.name}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 px-1">
                        <span className="text-[10px] text-[var(--text-secondary)]">
                          {formatTime(message.timestamp)}
                        </span>
                        <button
                          onClick={() => copyToClipboard(message.text)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[var(--bg-secondary)] rounded"
                          title="Copy"
                        >
                          <svg className="w-3 h-3 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        {message.sender === 'user' && (
                          <button
                            onClick={() => handleEdit(message.id, message.text)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[var(--bg-secondary)] rounded"
                            title="Edit"
                          >
                            <svg className="w-3 h-3 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-lg px-3 py-2 sm:px-4 sm:py-2.5">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-[var(--text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1.5 h-1.5 bg-[var(--text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-[var(--text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-primary)] border-t border-[var(--border)]/10">
        <div className="max-w-4xl w-full mx-auto px-4 py-3 sm:py-4">
          {/* Main Input Container with Send Button Inside */}
          <div className="relative">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)]/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 focus-within:border-[var(--text-primary)]/40 transition-all duration-300 flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything"
                rows={1}
                className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)] resize-none focus:outline-none text-sm sm:text-base min-h-[20px] sm:min-h-[24px] max-h-[100px] sm:max-h-[120px]"
                style={{
                  height: 'auto',
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = `${Math.min(target.scrollHeight, window.innerWidth < 640 ? 100 : 120)}px`
                }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                title="Send"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Persistent Suggestion Chips - Always visible below textarea */}
          <div className="mt-3 overflow-x-auto scrollbar-hide pb-1">
            <div className="flex gap-2 justify-start min-w-max">
              {[
                "Show me your projects",
                "What technologies do you work with?",
                "Tell me about your experience",
                "Can you build an e-commerce app?",
                "What's your contact information?",
                "Show me your fullstack projects",
                "What are your AI/ML skills?"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(suggestion)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border)] text-[var(--text-primary)] rounded-full text-xs sm:text-sm transition-all duration-300 hover:border-[var(--text-primary)] hover:scale-105 whitespace-nowrap flex-shrink-0"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
