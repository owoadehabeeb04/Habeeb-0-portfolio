import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY not configured' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    )

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Failed to fetch models: ${response.status}`, details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Filter models that support generateContent
    const generateContentModels = data.models?.filter((model: any) =>
      model.supportedGenerationMethods?.includes('generateContent')
    ) || []

    return NextResponse.json({
      success: true,
      totalModels: data.models?.length || 0,
      generateContentModels: generateContentModels.map((model: any) => ({
        name: model.name,
        displayName: model.displayName,
        description: model.description,
        supportedMethods: model.supportedGenerationMethods,
      })),
      allModels: data.models?.map((model: any) => ({
        name: model.name,
        displayName: model.displayName,
        supportedMethods: model.supportedGenerationMethods,
      })) || [],
    })
  } catch (error: any) {
    console.error('Error fetching models:', error)
    return NextResponse.json(
      { error: 'Failed to fetch models', details: error.message },
      { status: 500 }
    )
  }
}


