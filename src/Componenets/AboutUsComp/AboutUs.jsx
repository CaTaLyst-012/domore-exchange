import "./aboutUs.css";

const About = () => {
  return (
    <main className="about">
      <section className="about__hero">
        <div className="about__hero-inner">
          <h1 className="about__title">About DOMORE EXCHANGE</h1>
          <p className="about__subtitle">
            A trusted Nigerian-owned platform for fast, secure crypto trades and gift card redemption, handled conveniently on WhatsApp.
          </p>
        </div>
      </section>

      <section className="about__section">
        <div className="about__content">
          <h2 className="about__heading">Who we are</h2>
          <p className="about__text">
            DOMORE EXCHANGE is a digital exchange built for Nigerians who want a simple, reliable way to trade cryptocurrency and redeem gift cards without stress.
          </p>
          <p className="about__text">
            Instead of confusing dashboards, we keep things personal: you place a request on our website and complete your trade directly with us on WhatsApp.
          </p>
        </div>
      </section>

      <section className="about__section about__section--grid">
        <div className="about__content">
          <h2 className="about__heading">What we do</h2>
          <ul className="about__list">
            <li className="about__list-item">
              Buy and sell top cryptocurrencies like USDT, BTC, ETH, BNB and more with payouts in Naira.
            </li>
            <li className="about__list-item">
              Redeem major gift cards such as Google Play, Apple, Steam, Amazon, Netflix, and others at competitive rates.
            </li>
            <li className="about__list-item">
              Provide one-on-one support on WhatsApp so you always know the exact rate and amount before you confirm.
            </li>
          </ul>
        </div>

        <div className="about__content">
          <h2 className="about__heading">Why people trust us</h2>
          <ul className="about__list">
            <li className="about__list-item">
              Fast payouts to Nigerian bank accounts after trade confirmation.
            </li>
            <li className="about__list-item">
              Transparent communication: we share rates upfront and confirm every detail with you.
            </li>
            <li className="about__list-item">
              24/7 availability on WhatsApp for trades, questions, and support.
            </li>
          </ul>
        </div>
      </section>

      <section className="about__section">
        <div className="about__content">
          <h2 className="about__heading">How it works</h2>
          <ol className="about__steps">
            <li className="about__step">
              Start from our home page: choose whether you want to trade crypto or redeem a gift card.
            </li>
            <li className="about__step">
              Fill in the basic details (coin, amount, or card type), then continue to WhatsApp.
            </li>
            <li className="about__step">
              On WhatsApp, we confirm the live rate, total amount in Naira, and complete your transaction.
            </li>
          </ol>
          <p className="about__text">
            Every trade is handled by a real person, not a bot, so you can ask questions and be sure you understand each step.
          </p>
        </div>
      </section>

      <section className="about__section about__section--highlight">
        <div className="about__content">
          <h2 className="about__heading">Our promise</h2>
          <p className="about__text">
            We are committed to giving you a smooth, secure, and straightforward experience every time you trade or redeem with DOMORE EXCHANGE.
          </p>
          <p className="about__text">
            Whether you are cashing out crypto or turning your gift cards into Naira, we want you to feel safe, informed, and satisfied with every transaction.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
