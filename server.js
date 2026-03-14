// server.js
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY missing");
      return res.status(500).json({ error: "GROQ_API_KEY not set on server" });
    }

    const lastMessage = messages[messages.length - 1]?.text || "";
    const lower = lastMessage.toLowerCase();

    // Simple coin symbol → CoinGecko id map
    const coinMap = {
      btc: "bitcoin",
      bitcoin: "bitcoin",
      eth: "ethereum",
      ethereum: "ethereum",
      usdt: "tether",
      sol: "solana",
      solana: "solana",
      bnb: "binancecoin",
      xrp: "ripple",
    };

    let priceContext = "";

    // Detect price-type question
    const isPriceQuestion =
      lower.includes("price") ||
      lower.includes("how much is") ||
      lower.includes("rate of") ||
      lower.includes("worth");

    if (isPriceQuestion) {
      // Find which coin they mentioned
      let coinId = null;
      for (const [symbol, id] of Object.entries(coinMap)) {
        if (lower.includes(symbol)) {
          coinId = id;
          break;
        }
      }

      if (coinId) {
        try {
          // Call CoinGecko simple price API (USD)
          const cgResp = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
          );

          if (cgResp.ok) {
            const cgData = await cgResp.json();
            const usd = cgData?.[coinId]?.usd;
            if (typeof usd === "number") {
              priceContext = `Current market data: 1 ${coinId} ≈ ${usd} USD. This is public market data, not DOMORE EXCHANGE's trading rate.`;
            }
          } else {
            console.error("CoinGecko error status:", cgResp.status);
          }
        } catch (cgErr) {
          console.error("CoinGecko fetch error:", cgErr);
        }
      }
    }

    const groqMessages = [
      {
        role: "system",
        content:
          "You are DOMORE Assistant, a helpful assistant for DOMORE EXCHANGE, a Nigerian crypto and gift card exchange. Answer briefly and clearly. " +
          "If the user asks for the price of a cryptocurrency (for example BTC, ETH, USDT, SOL, etc.), respond with the current price of that coin in US dollars (USD) using the market data provided to you by the server, and mention that rates change frequently. " +
          "If the user asks about trading with DOMORE EXCHANGE, trading rates, how much they will receive, how much they should send, or anything that requires an exact quote for a trade or a DOMORE rate, DO NOT give a rate. Instead, tell them to use the forms on the DOMORE EXCHANGE home page and continue the conversation on WhatsApp for exact live rates. " +
          "For any other general question where the answer is known from public information on the internet (for example what is Bitcoin, how does blockchain work, what is a gift card, etc.), answer normally and helpfully.",
      },
      // Inject live price context if we have it
      ...(priceContext
        ? [
            {
              role: "assistant",
              content: priceContext,
            },
          ]
        : []),
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
          model: "llama-3.1-8b-instant",
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
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Chat server listening on port ${PORT}`);
});
