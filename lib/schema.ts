import { z } from "zod";

export const analysisSchema = z.object({
  title: z.string().describe("A short title for the text"),
  summary: z.string().describe("A one-sentence summary"),
  tags: z.array(z.string()).describe("3 to 5 topic tags"),
  sentiment: z.enum(["positive", "neutral", "negative"]),
});
