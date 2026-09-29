import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { analysisSchema } from "../lib/schema";

export async function POST(req: Request) {
  const text: string = await req.json();

  const result = streamObject({
    model: openai("gpt-4o-mini"),
    schema: analysisSchema,
    prompt: `Analyze the following text:\n\n${text}`,
  });

  return result.toTextStreamResponse();
}
