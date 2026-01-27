import { useState } from "react";
import { AnalysisPage } from "./pages/AnalysisPage";
import { HistoryPage } from "./pages/HistoryPage";
import logo from "./images/logo.png";
import "./App.css";

type Page = "analysis" | "history";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("analysis");

  const handleAnalyze = () => {
    // Optionnel : recharger l'historique après analyse
  };

  return (
    <div className="container">
      <header className="header">
        <div className="headerContent">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="title">Analyse de texte</h1>
          <nav className="nav">
            <button
              className={`navButton ${currentPage === "analysis" ? "active" : ""}`}
              onClick={() => setCurrentPage("analysis")}
            >
              Analyse
            </button>
            <button
              className={`navButton ${currentPage === "history" ? "active" : ""}`}
              onClick={() => setCurrentPage("history")}
            >
              Historique
            </button>
          </nav>
        </div>
        <nav className="bottomNav">
          <button
            className={`navButton ${currentPage === "analysis" ? "active" : ""}`}
            onClick={() => setCurrentPage("analysis")}
          >
            Analyse
          </button>
          <button
            className={`navButton ${currentPage === "history" ? "active" : ""}`}
            onClick={() => setCurrentPage("history")}
          >
            Historique
          </button>
        </nav>
      </header>
      <main className="main">
        {currentPage === "analysis" && <AnalysisPage onAnalyze={handleAnalyze} />}
        {currentPage === "history" && <HistoryPage />}
      </main>
    </div>
  );
}

export default App;

