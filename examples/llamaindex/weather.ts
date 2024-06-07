#!/usr/bin/env node
import 'dotenv/config'

import { WeatherClient } from '@agentic/stdlib'
import { createLlamaIndexTools } from '@agentic/stdlib/llamaindex'
import { OpenAI, OpenAIAgent } from 'llamaindex'

async function main() {
  const weather = new WeatherClient()

  const tools = createLlamaIndexTools(weather)
  const agent = new OpenAIAgent({
    llm: new OpenAI({ model: 'gpt-4o', temperature: 0 }),
    systemPrompt: 'You are a helpful assistant. Be as concise as possible.',
    tools
  })

  const response = await agent.chat({
    message: 'What is the weather in San Francisco?'
  })

  console.log(response.response.message.content)
}

await main()
