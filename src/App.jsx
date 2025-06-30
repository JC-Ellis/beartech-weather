import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Weather from "./pages/Weather";
import Header from "./components/Header";
import NotFound from "./components/PageNotFound";
import Footer from "./components/Footer";


function App() {
  return (
    <main>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/weather" element={<Weather />} /> */}
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Router>
      <Footer/>
    </main>
  );
}

export default App;