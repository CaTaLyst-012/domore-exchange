// src/components/Footer.jsx
import { NavLink } from "react-router-dom";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Brand + tagline */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-main">DOMORE</span>
            <span className="footer__logo-accent">EXCHANGE</span>
          </div>
          <p className="footer__tagline">
            Fast crypto trades and gift card redemption for Nigerians, handled securely on WhatsApp.
          </p>
        </div>

        {/* Links */}
        <div className="footer__grid">
          <div className="footer__column">
            <h4 className="footer__heading">Navigate</h4>
            <NavLink to="/" className="footer__link">
              Home
            </NavLink>
            <NavLink to="/prices" className="footer__link">
              Prices
            </NavLink>
            <NavLink to="/about" className="footer__link">
              About Us
            </NavLink>
            <NavLink to="/chatbot" className="footer__link">
              Chatbot
            </NavLink>
          </div>

          <div className="footer__column">
            <h4 className="footer__heading">Support</h4>
            <a
              href="https://wa.me/2347065811245"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Trade on WhatsApp
            </a>
            <span className="footer__meta">24/7 WhatsApp support</span>
          </div>

          <div className="footer__column">
            <h4 className="footer__heading">Connect</h4>
            <div className="footer__socials">
              <a
                href="https://www.instagram.com/domoreexchange?igsh=d3I1c21uYWh0czY3&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="footer__social"
              >
                <FaInstagram />
              </a>
              <a
                href="https://t.me/Domoreexchange"
                target="_blank"
                rel="noreferrer"
                className="footer__social"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="https://wa.me/2347065811245"
                target="_blank"
                rel="noreferrer"
                className="footer__social"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p className="footer__copy">
          © {year} DOMORE EXCHANGE. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
