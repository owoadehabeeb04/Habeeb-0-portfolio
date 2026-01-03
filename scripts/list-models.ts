/**
 * Script to list available Gemini models
 * Run with: npx tsx scripts/list-models.ts
 */

import { GoogleGenerativeAI } from '@google/generative-ai'

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in environment variables')
    console.log('Please set GEMINI_API_KEY in your .env.local file')
    process.exit(1)
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    
    console.log('🔍 Fetching available Gemini models...\n')
    
    // List models using the REST API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.models && data.models.length > 0) {
      console.log(`✅ Found ${data.models.length} available models:\n`)
      
      // Filter and display models that support generateContent
      const generateContentModels = data.models.filter((model: any) => 
        model.supportedGenerationMethods?.includes('generateContent')
      )

      console.log('📝 Models supporting generateContent:\n')
      generateContentModels.forEach((model: any) => {
        console.log(`  • ${model.name}`)
        if (model.displayName) {
          console.log(`    Display Name: ${model.displayName}`)
        }
        if (model.description) {
          console.log(`    Description: ${model.description}`)
        }
        console.log('')
      })

      // Show all models for reference
      console.log('\n📋 All available models:\n')
      data.models.forEach((model: any) => {
        console.log(`  • ${model.name}`)
        if (model.supportedGenerationMethods) {
          console.log(`    Methods: ${model.supportedGenerationMethods.join(', ')}`)
        }
        console.log('')
      })
    } else {
      console.log('❌ No models found')
    }
  } catch (error: any) {
    console.error('❌ Error fetching models:', error.message)
    if (error.stack) {
      console.error(error.stack)
    }
    process.exit(1)
  }
}

listModels()


