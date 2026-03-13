import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Componenets/NavbarComp/Navbar.jsx";
import Footer from "./Componenets/FooterComp/Footer.jsx";
import Home from "./Pages/HomePage/HomePage.jsx";
import Prices from "./Pages/PricesPage/PricesPage.jsx";
import About from "./Pages/AboutUsPage/AboutUsPage.jsx";
import ChatbotPage from "./Pages/ChatBotPage/ChatBotPage.jsx";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/about" element={<About />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
