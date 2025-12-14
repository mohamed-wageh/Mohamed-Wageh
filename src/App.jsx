import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PortfolioProvider } from "./context/PortfolioContext";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
