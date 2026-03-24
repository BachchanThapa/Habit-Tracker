import "./styles/global.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import HomePage from "./pages/HomePage/HomePage";
import ProgressPage from "./pages/ProgressPage/ProgressPage";
import StatsPage from "./pages/StatsPage/StatsPage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;