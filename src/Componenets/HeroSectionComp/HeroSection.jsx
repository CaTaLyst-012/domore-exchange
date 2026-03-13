import { useState, useEffect } from "react";
import "./heroSection.css";

const WHATSAPP_NUMBER = "2347065811245";

const CRYPTO_OPTIONS = ["USDT", "BTC", "ETH", "BNB", "SOL", "LTC", "Others"];

const CARD_TYPES = [
  "Google Play",
  "Apple",
  "Steam",
  "Amazon",
  "iTunes",
  "Netflix",
  "Spotify",
  "PlayStation",
  "Xbox",
  "Vanilla Visa",
  "Others"
];

const Hero = () => {
  const [activeMainTab, setActiveMainTab] = useState("trade"); // 'trade' | 'card'
  const [activeTradeTab, setActiveTradeTab] = useState("buy"); // 'buy' | 'sell'

  const [tradeForm, setTradeForm] = useState({
    amount: "",
    crypto: "USDT"
  });

  const [cardForm, setCardForm] = useState({
    cardType: "",
    amount: "",
    note: ""
  });

  // Listen for events from Prices page to open correct tab + coin
  useEffect(() => {
    const handler = (event) => {
      const detail = event.detail || {};
      if (detail.type === "trade") {
        setActiveMainTab("trade");
        setActiveTradeTab(detail.mode === "sell" ? "sell" : "buy");
        if (detail.crypto) {
          setTradeForm((prev) => ({ ...prev, crypto: detail.crypto }));
        }
        const hero = document.getElementById("hero-section");
        if (hero) {
          hero.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("domore-trade", handler);
    return () => window.removeEventListener("domore-trade", handler);
  }, []);

  const handleTradeChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      // allow only digits and at most one dot
      const numeric = value.replace(/[^0-9.]/g, "");
      const parts = numeric.split(".");
      const cleaned =
        parts.length <= 2 ? numeric : parts[0] + "." + parts.slice(1).join("");

      setTradeForm((prev) => ({ ...prev, amount: cleaned }));
      return;
    }

    setTradeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      // allow only digits and at most one dot
      const numeric = value.replace(/[^0-9.]/g, "");
      const parts = numeric.split(".");
      const cleaned =
        parts.length <= 2 ? numeric : parts[0] + "." + parts.slice(1).join("");

      setCardForm((prev) => ({ ...prev, amount: cleaned }));
      return;
    }

    setCardForm((prev) => ({ ...prev, [name]: value }));
  };

  const openWhatsApp = (message) => {
    const encoded = encodeURIComponent(message.trim());
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, "_blank");
  };

  const handleTradeSubmit = (e) => {
    e.preventDefault();

    const direction =
      activeTradeTab === "buy" ? "BUY CRYPTOCURRENCY" : "SELL CRYPTOCURRENCY";

    const message = `
DOMORE EXCHANGE - ${direction}

Coin: ${tradeForm.crypto}
Amount: ${tradeForm.amount || "N/A"}

Please confirm the current rate and total amount in Naira for this trade.
    `;

    openWhatsApp(message);
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();

    const message = `
DOMORE EXCHANGE - REDEEM CARD

Card Type: ${cardForm.cardType}
Card Amount: ${cardForm.amount}

Note: ${cardForm.note || "N/A"}

After this message, I will attach a clear screenshot/photo of the card here on WhatsApp.
    `;

    openWhatsApp(message);
  };

  return (
    <section id="hero-section" className="hero">
      <div className="hero__inner">
        {/* Left side: text */}
        <div className="hero__left">
          <p className="hero__eyebrow">Trusted digital exchange for Nigerians</p>
          <h1 className="hero__title">
            <span>DOMORE</span>
            <span className="hero__title-accent"> EXCHANGE</span>
          </h1>
          <p className="hero__subtitle">
            Trade crypto and redeem gift cards at high rates with fast payouts in
            Naira, handled directly on WhatsApp for your convenience.
          </p>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">24/7</span>
              <span className="hero__stat-label">Support on WhatsApp</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">15+</span>
              <span className="hero__stat-label">Top coins available</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">All</span>
              <span className="hero__stat-label">Major gift cards</span>
            </div>
          </div>
        </div>

        {/* Right side: forms card */}
        <div className="hero__right">
          <div className="hero__card">
            {/* Main tabs */}
            <div className="hero__tabs">
              <button
                type="button"
                className={
                  activeMainTab === "trade"
                    ? "hero__tab hero__tab--active"
                    : "hero__tab"
                }
                onClick={() => setActiveMainTab("trade")}
              >
                Trade Coin
              </button>
              <button
                type="button"
                className={
                  activeMainTab === "card"
                    ? "hero__tab hero__tab--active"
                    : "hero__tab"
                }
                onClick={() => setActiveMainTab("card")}
              >
                Redeem Card
              </button>
            </div>

            {/* Trade Coin content */}
            {activeMainTab === "trade" && (
              <div className="hero__panel">
                {/* Sub tabs: Buy / Sell */}
                <div className="hero__subtabs">
                  <button
                    type="button"
                    className={
                      activeTradeTab === "buy"
                        ? "hero__subtab hero__subtab--active"
                        : "hero__subtab"
                    }
                    onClick={() => setActiveTradeTab("buy")}
                  >
                    Buy Cryptocurrency
                  </button>
                  <button
                    type="button"
                    className={
                      activeTradeTab === "sell"
                        ? "hero__subtab hero__subtab--active"
                        : "hero__subtab"
                    }
                    onClick={() => setActiveTradeTab("sell")}
                  >
                    Sell Cryptocurrency
                  </button>
                </div>

                <form className="hero__form" onSubmit={handleTradeSubmit}>
                  <label className="hero__label">
                    Amount (coin)
                    <div className="hero__row">
                      <input
                        type="text"
                        name="amount"
                        value={tradeForm.amount}
                        onChange={handleTradeChange}
                        placeholder="Amount"
                        inputMode="decimal"
                        required
                      />
                      <select
                        name="crypto"
                        value={tradeForm.crypto}
                        onChange={handleTradeChange}
                      >
                        {CRYPTO_OPTIONS.map((coin) => (
                          <option key={coin} value={coin}>
                            {coin}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>

                  <p className="hero__hint">
                    Enter how much coin you want to {activeTradeTab === "buy" ? "buy" : "sell"}.
                    We will share the live rate and Naira amount with you directly on WhatsApp.
                  </p>

                  <button type="submit" className="hero__submit">
                    Continue on WhatsApp
                  </button>
                </form>
              </div>
            )}

            {/* Redeem Card content */}
            {activeMainTab === "card" && (
              <div className="hero__panel">
                <form className="hero__form" onSubmit={handleCardSubmit}>
                  <label className="hero__label">
                    Card type
                    <select
                      name="cardType"
                      value={cardForm.cardType}
                      onChange={handleCardChange}
                      required
                    >
                      <option value="">Select card type</option>
                      {CARD_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="hero__label">
                    Amount on card
                    <input
                      type="text"
                      name="amount"
                      value={cardForm.amount}
                      onChange={handleCardChange}
                      placeholder="e.g. 100"
                      inputMode="decimal"
                      required
                    />
                  </label>

                  <label className="hero__label">
                    Extra note (optional)
                    <textarea
                      name="note"
                      value={cardForm.note}
                      onChange={handleCardChange}
                      placeholder="e.g. USA card, physical or e-code, etc."
                    />
                  </label>

                  <p className="hero__hint">
                    Once you click Redeem card, WhatsApp will open. Please attach
                    a clear screenshot/photo of the card before you send the
                    message.
                  </p>

                  <button type="submit" className="hero__submit">
                    Redeem card on WhatsApp
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
