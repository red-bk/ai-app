import { useState } from "react";
import { useChat } from "@ai-sdk/react";

export function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "left" }}>
      {messages.map((m) => (
        <div key={m.id} style={{ marginBottom: 12 }}>
          <b>{m.role === "user" ? "You" : "AI"}: </b>
          {m.parts.map((part, i) =>
            part.type === "text" ? <span key={i}>{part.text}</span> : null,
          )}
        </div>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Say something..."
        style={{ width: "70%" }}
      />
      <button
        disabled={status !== "ready" || !input.trim()}
        onClick={() => {
          sendMessage({ text: input });
          setInput("");
        }}
      >
        Send
      </button>
    </div>
  );
}
