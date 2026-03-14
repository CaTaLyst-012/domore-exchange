import { useState, useRef, useEffect } from "react";
import "./chatBot.css";

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "bot",
    text: "Hi, I’m DOMORE Assistant 👋",
  },
  {
    id: 2,
    sender: "bot",
    text: "You can ask me about crypto rates, how trading works, or how to redeem your gift cards.",
  },
];

const Chatbot = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // auto-scroll to bottom on new messages (inside the messages container)
  useEffect(() => {
    const container = messagesEndRef.current?.parentElement;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reach chat API");
      }

      const data = await response.json();
      const botText =
        data.reply ||
        "Sorry, I couldn't process that right now. Please try again or start a trade directly on WhatsApp from the home page.";

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: botText,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        id: Date.now() + 2,
        sender: "bot",
        text:
          "There was a problem talking to DOMORE Assistant. Please try again later or use WhatsApp on the home page for help.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <main className="chatbot">
      <section className="chatbot__intro">
        <h1 className="chatbot__title">DOMORE Assistant</h1>
        <p className="chatbot__subtitle">
          Ask quick questions about crypto trading, gift card redemption, and
          how DOMORE EXCHANGE works.
        </p>
        <ul className="chatbot__list">
          <li className="chatbot__list-item">
            Understand how to buy or sell crypto in Naira.
          </li>
          <li className="chatbot__list-item">
            Learn how to redeem different gift cards on DOMORE.
          </li>
          <li className="chatbot__list-item">
            Get guidance before you start a trade on WhatsApp.
          </li>
        </ul>
        <p className="chatbot__note">
          For live rates and real trades, please use the forms on the home page
          and continue on WhatsApp.
        </p>
      </section>

      <section className="chatbot__panel">
        <div className="chatbot__card">
          <header className="chatbot__header">
            <div className="chatbot__avatar">D</div>
            <div>
              <div className="chatbot__name">DOMORE Assistant</div>
              <div className="chatbot__status">
                Usually replies in a few minutes
              </div>
            </div>
          </header>

          {/* Confined, scrollable messages area */}
          <div className="chatbot__messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.sender === "user"
                    ? "chatbot__message chatbot__message--user"
                    : "chatbot__message chatbot__message--bot"
                }
              >
                <p className="chatbot__message-text">{msg.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot__form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chatbot__input"
              placeholder="Type your question here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="chatbot__send">
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Chatbot;
