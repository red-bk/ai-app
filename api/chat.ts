// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();

//   const result = streamText({
//     model: openai("gpt-4o-mini"),
//     messages: await convertToModelMessages(messages),
//   });

//   return result.toUIMessageStreamResponse();
// }
import {
  streamText,
  tool,
  stepCountIs,
  convertToModelMessages,
  type UIMessage,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      getTime: tool({
        description: "Get the current date and time in a given IANA timezone",
        inputSchema: z.object({
          timeZone: z
            .string()
            .describe(
              "IANA timezone name, e.g. Asia/Tokyo, Europe/London, Asia/Riyadh",
            ),
        }),
        execute: async ({ timeZone }) =>
          new Date().toLocaleString("en-US", { timeZone }),
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
