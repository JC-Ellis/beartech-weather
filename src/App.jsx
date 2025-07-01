import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Header from "./components/Header";
import NotFound from "./components/PageNotFound";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Header darkMode={darkMode} handleToggle={handleToggle} />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
