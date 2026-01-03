import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  action?: 'SHOW_PROJECTS' | 'SHOW_SKILLS'
  filter?: 'fullstack' | 'frontend' | 'all'
}

interface ChatStore {
  messages: Message[]
  addMessage: (message: Message) => void
  updateMessage: (id: string, updates: Partial<Message>) => void
  clearMessages: () => void
  removeMessagesAfter: (id: string) => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      
      updateMessage: (id, updates) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, ...updates } : msg
          ),
        })),
      
      clearMessages: () => set({ messages: [] }),
      
      removeMessagesAfter: (id) =>
        set((state) => {
          const index = state.messages.findIndex((m) => m.id === id)
          return {
            messages: state.messages.slice(0, index + 1),
          }
        }),
    }),
    {
      name: 'habeeb-chat-storage',
      storage: createJSONStorage(() => localStorage),
      // Serialize dates properly
      partialize: (state) => ({ messages: state.messages }),
    }
  )
)
