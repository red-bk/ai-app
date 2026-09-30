import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { analysisSchema } from "../lib/schema";

const bodySchema = z.string().min(1).max(10_000);

export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json());

  if (!parsed.success) {
    return new Response("Body must be a non-empty string (max 10,000 chars)", {
      status: 400,
    });
  }

  const result = streamObject({
    model: openai("gpt-4o-mini"),
    schema: analysisSchema,
    prompt: `Analyze the following text:\n\n${parsed.data}`,
  });

  return result.toTextStreamResponse();
}
