'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// Minimal typings for the (prefixed) Web Speech recognition API
interface SpeechRecognitionLike {
  lang: string
  interimResults: boolean
  continuous: boolean
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike

// Speech only needs readable text: drop markdown, links, markers and code
export function toSpeakableText(markdown: string): string {
  return markdown
    .replace(/\[(SHOW_PROJECTS(:\w+)?|SHOW_SKILLS|FIT_SCORE:\d+)\]/g, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s*\|?[-:| ]+\|?\s*$/gm, '')
    .replace(/\|/g, ', ')
    .replace(/[#*_`>~]/g, '')
    .replace(/^\s*[-•]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function useVoice() {
  const [canListen, setCanListen] = useState(false)
  const [canSpeak, setCanSpeak] = useState(false)
  const [listening, setListening] = useState(false)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)

  // Feature detection after mount so server and client markup match
  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor }
    setCanListen(Boolean(w.SpeechRecognition || w.webkitSpeechRecognition))
    setCanSpeak('speechSynthesis' in window)
  }, [])

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setSpeakingId(null)
  }, [])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setListening(false)
  }, [])

  // Calls onTranscript with the full transcript so far (interim results included)
  const startListening = useCallback(
    (onTranscript: (text: string) => void) => {
      const w = window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor }
      const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition
      if (!Ctor) return

      stopSpeaking()
      const recognition = new Ctor()
      recognition.lang = navigator.language || 'en-US'
      recognition.interimResults = true
      recognition.continuous = false
      recognition.onresult = event => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('')
        onTranscript(transcript)
      }
      recognition.onend = () => setListening(false)
      recognition.onerror = () => setListening(false)
      recognitionRef.current = recognition
      recognition.start()
      setListening(true)
    },
    [stopSpeaking]
  )

  const speak = useCallback(
    (id: string, markdown: string) => {
      if (!('speechSynthesis' in window)) return
      // Speech is a nice-to-have: a browser failure must never break the chat
      try {
        window.speechSynthesis.cancel()
        const text = toSpeakableText(markdown)
        if (!text) return
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = navigator.language || 'en-US'
        utterance.onend = () => setSpeakingId(null)
        utterance.onerror = () => setSpeakingId(null)
        setSpeakingId(id)
        window.speechSynthesis.speak(utterance)
      } catch {
        setSpeakingId(null)
      }
    },
    []
  )

  // Never keep talking after the page is closed
  useEffect(() => () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
    recognitionRef.current?.stop()
  }, [])

  return { canListen, canSpeak, listening, speakingId, startListening, stopListening, speak, stopSpeaking }
}
