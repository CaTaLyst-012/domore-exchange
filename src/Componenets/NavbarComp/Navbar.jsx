import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme") || "dark";
    setTheme(current);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (to) => (e) => {
    e.preventDefault();
    navigate(to);
    // small timeout so route changes, then scroll to top of new page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const handleTradeClick = (e) => {
    e.preventDefault();
    const hero = document.getElementById("hero-section");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    } else {
      // if hero-section is on home page and we're on another route
      navigate("/");
      setTimeout(() => {
        const heroAfterNav = document.getElementById("hero-section");
        if (heroAfterNav) {
          heroAfterNav.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo" onClick={handleNavClick("/")}>
          <span className="navbar__logo-main">DOMORE</span>
          <span className="navbar__logo-accent">EXCHANGE</span>
        </div>

        {/* Links */}
        <nav className="navbar__links">
          <NavLink
            to="/"
            className="navbar__link"
            onClick={handleNavClick("/")}
          >
            Home
          </NavLink>

          <NavLink
            to="/prices"
            className="navbar__link"
            onClick={handleNavClick("/prices")}
          >
            Prices
          </NavLink>

          <NavLink
            to="/about"
            className="navbar__link"
            onClick={handleNavClick("/about")}
          >
            About Us
          </NavLink>

          <div
            className="navbar__link navbar__contact"
            onMouseEnter={() => setIsContactOpen(true)}
            onMouseLeave={() => setIsContactOpen(false)}
          >
            <span>Contact</span>

            {isContactOpen && (
              <div
                className="navbar__contact-dropdown"
                onMouseEnter={() => setIsContactOpen(true)}
                onMouseLeave={() => setIsContactOpen(false)}
              >
                <a
                  href="https://www.instagram.com/domoreexchange?igsh=d3I1c21uYWh0czY3&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="navbar__contact-item"
                >
                  <FaInstagram className="navbar__contact-icon instagram" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://t.me/Domoreexchange"
                  target="_blank"
                  rel="noreferrer"
                  className="navbar__contact-item"
                >
                  <FaTelegramPlane className="navbar__contact-icon telegram" />
                  <span>Telegram</span>
                </a>

                <a
                  href="https://wa.me/2347065811245"
                  target="_blank"
                  rel="noreferrer"
                  className="navbar__contact-item"
                >
                  <FaWhatsapp className="navbar__contact-icon whatsapp" />
                  <span>WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Right side: theme, chatbot, CTA */}
        <div className="navbar__right">
          <button
            type="button"
            className="navbar__icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="navbar__icon">
              {theme === "dark" ? "☀️" : "🌙"}
            </span>
          </button>

          <NavLink
            to="/chatbot"
            className="navbar__icon-btn"
            aria-label="Chatbot"
            onClick={handleNavClick("/chatbot")}
          >
            <span className="navbar__icon">💬</span>
          </NavLink>

          <a
            href="#hero-section"
            className="navbar__cta"
            onClick={handleTradeClick}
          >
            Trade / Redeem now
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
