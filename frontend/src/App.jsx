import { useEffect } from "react";
import About from "./pages/About.jsx";
import Book from "./pages/Book.jsx";
import CostumNavbar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomFooter from "./components/Footer.jsx";
import styles from './styles/globals.module.css';

function App() {
  useEffect(() => {
    // Skapa och lägg till GA-skriptet
    const gaScript = document.createElement("script");
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-WDRB1SGLTV";
    gaScript.async = true;
    document.head.appendChild(gaScript);

    // Skapa och lägg till inline GA-skriptet
    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", "G-WDRB1SGLTV");
    `;
    document.head.appendChild(inlineScript);

    // Städa upp när komponenten unmountas
    return () => {
      document.head.removeChild(gaScript);
      document.head.removeChild(inlineScript);
    };
  }, []);

  return (
    <Router>
      <div className={styles.wrapper}>
        <CostumNavbar />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Book />} />
            <Route path="/About" element={<About />} />
          </Routes>
        </main>
        <CustomFooter />
      </div>
    </Router>
  );
}

export default App;
