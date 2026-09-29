import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { analysisSchema } from "../../lib/schema";

export function Extract() {
  const [text, setText] = useState("");
  const { object, submit, isLoading, error } = useObject({
    api: "/api/extract",
    schema: analysisSchema,
  });

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "left" }}>
      <h2>Analyze text</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste a paragraph, review, or email..."
        rows={5}
        style={{ width: "100%" }}
      />
      <button onClick={() => submit(text)} disabled={isLoading || !text.trim()}>
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p style={{ color: "red" }}>Something went wrong.</p>}

      {object && (
        <div style={{ border: "1px solid #888", padding: 12, marginTop: 12 }}>
          <h3>{object.title}</h3>
          <p>{object.summary}</p>
          <p>Tags: {object.tags?.filter(Boolean).join(", ")}</p>
          <p>Sentiment: {object.sentiment}</p>
        </div>
      )}
    </div>
  );
}
