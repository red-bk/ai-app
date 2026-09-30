import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import fs from "node:fs";

const chunks = fs
  .readFileSync("docs/knowledge.md", "utf8")
  .split("\n\n")
  .map((c) => c.trim())
  .filter(Boolean);

const { embeddings } = await embedMany({
  model: openai.embedding("text-embedding-3-small"),
  values: chunks,
});

fs.mkdirSync("lib", { recursive: true });
fs.writeFileSync(
  "lib/index.json",
  JSON.stringify(chunks.map((text, i) => ({ text, embedding: embeddings[i] }))),
);

console.log(
  `Indexed ${chunks.length} chunks, ${embeddings[0].length} numbers each`,
);
