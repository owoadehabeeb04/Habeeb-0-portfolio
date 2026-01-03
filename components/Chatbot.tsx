'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true)
    }
    window.addEventListener('openChatbot', handleOpenChatbot)
    return () => window.removeEventListener('openChatbot', handleOpenChatbot)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

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

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! This is a placeholder response. The AI integration will be added soon.',
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
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

  // Full page chatbot view
  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-[var(--bg-primary)] flex flex-col">
        {/* Header with Navbar */}
        <div className="border-b border-[var(--border)]/20">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
              aria-label="Close chat"
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
                className="text-[var(--text-primary)]"
              >
                <line x1="19" y1="5" x2="5" y2="19"></line>
                <line x1="5" y1="5" x2="19" y2="19"></line>
              </svg>
            </button>
            {/* Inline Navbar */}
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-2 bg-gradient-to-r from-[var(--bg-secondary)] via-[var(--bg-tertiary)] to-[var(--bg-secondary)] backdrop-blur-md border border-[var(--border)]/40 rounded-full">
                <a
                  href="#projects"
                  className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 transition-all duration-300 rounded-lg"
                >
                  Projects
                </a>
                <span className="text-[var(--text-secondary)]/30">|</span>
                <a
                  href="https://www.dropbox.com/scl/fi/8pwzxju1g5a7z6k6iskgd/OWOADE_HABEEB_RESUME-4.pdf?rlkey=kqagoji9fa7yafe4v0tj5l4oe&st=iptearno&dl=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 transition-all duration-300 rounded-lg"
                >
                  Resume
                </a>
                <span className="text-[var(--text-secondary)]/30">|</span>
                <a
                  href="#aboutme"
                  className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 transition-all duration-300 rounded-lg"
                >
                  About
                </a>
                <span className="text-[var(--text-secondary)]/30">|</span>
                <a
                  href="#contact"
                  className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/20 transition-all duration-300 rounded-lg"
                >
                  Contact
                </a>
                <span className="text-[var(--text-secondary)]/30">|</span>
                <a
                  href="#ask-habeeb"
                  onClick={(e) => {
                    e.preventDefault()
                    // Already in chatbot, do nothing or scroll to top
                  }}
                  className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-primary)]/30 transition-all duration-300 rounded-lg"
                >
                  Ask Habeeb AI
                </a>
                <span className="text-[var(--text-secondary)]/30 mx-1 md:mx-2">|</span>
                <a
                  href="#contact"
                  className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 md:gap-2 whitespace-nowrap shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-110"
                >
                  Let&apos;s work
                </a>
              </div>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--text-primary)]"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--text-primary)]"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-8 text-center">
                What can I help with?
              </h2>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border)]/20'
                    }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[var(--bg-secondary)] border border-[var(--border)]/20 rounded-lg px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area - ChatGPT Style */}
        <div className="border-t border-[var(--border)]/20 bg-[var(--bg-primary)]">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Main Input Container */}
            <div className="relative">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border)]/20 rounded-2xl p-4 focus-within:border-[var(--text-primary)]/40 transition-all duration-300">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything"
                  rows={1}
                  className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)] resize-none focus:outline-none text-sm md:text-base min-h-[24px] max-h-[200px]"
                  style={{
                    height: 'auto',
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = 'auto'
                    target.style.height = `${Math.min(target.scrollHeight, 200)}px`
                  }}
                />
              </div>
            </div>

            {/* Send Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="px-6 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-lg font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                Send
              </button>
            </div>

            {/* Footer Text */}
            <p className="text-center text-xs text-[var(--text-secondary)] mt-6">
              By messaging Ask Habeeb, an AI chatbot, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-[var(--text-primary)]">
                Terms
              </Link>
              {' '}and have read our{' '}
              <Link href="/privacy" className="underline hover:text-[var(--text-primary)]">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Chatbot component is now a page, so this component is not used
  // Keeping it for backward compatibility but it won't render
  return null
}
