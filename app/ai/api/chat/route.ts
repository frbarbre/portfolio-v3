import { createResource } from '@/lib/actions/resources';
import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText, tool } from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';

// Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: convertToCoreMessages(messages),
    system: `You are a helpful assistant with access to a knowledge base. 
ALWAYS use the getInformation tool to check your knowledge base before answering any questions.
If the user provides new information or asks to remember something, ALWAYS use the addResource tool to add it to the knowledge base.
Only respond to questions using information from the getInformation tool calls.
If no relevant information is found after using getInformation, respond, something you come up with.`,
    tools: {
      addResource: tool({
        description: `ALWAYS use this tool to add new information to your knowledge base.
      Use this tool whenever the user provides any new information or asks you to remember something.`,
        parameters: z.object({
          content: z
            .string()
            .describe('the content or resource to add to the knowledge base'),
        }),
        execute: async ({ content }) => createResource({ content }),
      }),
      getInformation: tool({
        description: `ALWAYS use this tool to get information from your knowledge base before answering any question.
      Use this tool for EVERY question, even if you think you know the answer.`,
        parameters: z.object({
          question: z
            .string()
            .describe("the user's question or topic to search for"),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
    },
  });

  return result.toDataStreamResponse();
}
