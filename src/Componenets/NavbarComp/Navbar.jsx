import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme") || "dark";
    setTheme(current);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleNavClick = (to) => (e) => {
    e.preventDefault();
    setIsMenuOpen(false); // close mobile menu on navigation
    navigate(to);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const handleTradeClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false); // close mobile menu
    const hero = document.getElementById("hero-section");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    } else {
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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo" onClick={handleNavClick("/")}>
          <span className="navbar__logo-main">DOMORE</span>
          <span className="navbar__logo-accent">EXCHANGE</span>
        </div>

        {/* Desktop nav links */}
        <nav className="navbar__links navbar__links--desktop">
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

        {/* Right side: theme, chatbot, CTA, hamburger */}
        <div className="navbar__right">
          {/* Theme toggle always visible */}
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

          {/* Chatbot button always visible */}
          <NavLink
            to="/chatbot"
            className="navbar__icon-btn"
            aria-label="Chatbot"
            onClick={handleNavClick("/chatbot")}
          >
            <span className="navbar__icon">💬</span>
          </NavLink>

          {/* CTA only on desktop */}
          <a
            href="#hero-section"
            className="navbar__cta navbar__cta--desktop"
            onClick={handleTradeClick}
          >
            Trade / Redeem now
          </a>

          {/* Hamburger (mobile only via CSS) */}
          <button
            type="button"
            className={`navbar__hamburger ${isMenuOpen ? "is-open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>
        </div>
      </div>

      {/* Mobile menu panel (right side) */}
      <nav
        ref={mobileMenuRef}
        className={`navbar__links navbar__links--mobile ${
          isMenuOpen ? "navbar__links--mobile-open" : ""
        }`}
      >
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

        <button
          type="button"
          className="navbar__link navbar__link--button"
          onClick={handleTradeClick}
        >
          Trade / Redeem now
        </button>

        <div className="navbar__mobile-contact">
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
      </nav>
    </header>
  );
};

export default Navbar;
