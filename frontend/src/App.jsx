import About from "./pages/About.jsx";
import Book from "./pages/Book.jsx";
import CostumNavbar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomFooter from "./components/Footer.jsx";
import styles from './styles/globals.module.css';

function App() {
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
