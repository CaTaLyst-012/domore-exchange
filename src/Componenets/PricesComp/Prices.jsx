import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./prices.css";

const API_BASE = "https://api.coingecko.com/api/v3";

const PricesPage = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchTopCoins = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${API_BASE}/coins/markets`, {
        params: {
          vs_currency: "usd", // prices in dollars
          order: "market_cap_desc",
          per_page: 15,
          page: 1,
          sparkline: false
        }
      });

      setCoins(res.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load prices right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopCoins();
  }, []);

  const filteredCoins = coins.filter((coin) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      coin.name.toLowerCase().includes(q) ||
      coin.symbol.toLowerCase().includes(q)
    );
  });

  const goToTrade = (mode, symbol) => {
    // mode: 'buy' | 'sell', symbol like 'BTC'
    const event = new CustomEvent("domore-trade", {
      detail: {
        type: "trade",
        mode,
        crypto: symbol.toUpperCase()
      }
    });
    window.dispatchEvent(event);
    navigate("/"); // go back to homepage via React Router
  };

  return (
    <section className="prices">
      <div className="prices__inner">
        <div className="prices__header">
          <div>
            <h1 className="prices__title">CRYPTOCURRENCY PRICES</h1>
            <p className="prices__subtitle">
              Live prices for the top 15 cryptocurrencies in USD. Search for a
              coin and jump straight into a trade with DOMORE EXCHANGE.
            </p>
          </div>

          <button
            type="button"
            className="prices__refresh"
            onClick={fetchTopCoins}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="prices__search-row">
          <input
            type="text"
            className="prices__search"
            placeholder="Search coin by name or symbol (e.g. Bitcoin, BTC, USDT)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error && <p className="prices__error">{error}</p>}

        <div className="prices__table">
          <div className="prices__row prices__row--head">
            <span>#</span>
            <span>Currency</span>
            <span>Price (USD)</span>
            <span>24h change</span>
            <span>Market cap</span>
            <span>Action</span>
          </div>

          {filteredCoins.map((coin, index) => (
            <div key={coin.id} className="prices__row">
              <span>{index + 1}</span>

              <span className="prices__currency-cell">
                {coin.image && (
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="prices__coin-icon"
                  />
                )}
                <div className="prices__currency-text">
                  <span className="prices__coin-name">{coin.name}</span>
                  <span className="prices__coin-symbol">
                    {coin.symbol.toUpperCase()}
                  </span>
                </div>
              </span>

              <span>
                $
                {coin.current_price.toLocaleString("en-US", {
                  maximumFractionDigits: 2
                })}
              </span>

              <span
                className={
                  coin.price_change_percentage_24h >= 0
                    ? "prices__change prices__change--up"
                    : "prices__change prices__change--down"
                }
              >
                {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>

              <span>
                $
                {coin.market_cap?.toLocaleString("en-US", {
                  maximumFractionDigits: 0
                })}
              </span>

              <span className="prices__actions">
                <button
                  type="button"
                  className="prices__btn prices__btn--buy"
                  onClick={() => goToTrade("buy", coin.symbol)}
                >
                  Buy
                </button>
                <button
                  type="button"
                  className="prices__btn prices__btn--sell"
                  onClick={() => goToTrade("sell", coin.symbol)}
                >
                  Sell
                </button>
              </span>
            </div>
          ))}

          {!loading && !error && filteredCoins.length === 0 && (
            <div className="prices__empty">
              No coins match that search. Try another name or symbol.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricesPage;
