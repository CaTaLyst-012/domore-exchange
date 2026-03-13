export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Vercel already parses JSON for Node functions, but be defensive:
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY missing");
      return res.status(500).json({ error: "GROQ_API_KEY not set on server" });
    }

    const groqMessages = [
      {
        role: "system",
        content:
          "You are DOMORE Assistant, a helpful assistant for DOMORE EXCHANGE, a Nigerian crypto and gift card exchange. Answer briefly and clearly. For exact live rates or real trades, always tell users to use the website home page forms and continue on WhatsApp.",
      },
      ...messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: groqMessages,
          temperature: 0.4,
        }),
      }
    );

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error:", errorText);
      return res
        .status(500)
        .json({ error: "Groq API error", details: errorText });
    }

    const data = await groqResponse.json();
    const content =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I could not generate a response right now.";

    return res.status(200).json({ reply: content });
  } catch (err) {
    console.error("Chat API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
