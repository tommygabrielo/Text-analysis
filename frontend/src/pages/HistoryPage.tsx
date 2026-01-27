import { useState, useEffect } from "react";
import { getHistory } from "../services/api";
import { HistoryItem } from "../types";
import "../components/HistoryList.css";

export const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="historyContainer">
        <h2 className="historyTitle">Historique des analyses</h2>
        <div className="loading">Chargement de l'historique...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="historyContainer">
        <h2 className="historyTitle">Historique des analyses</h2>
        <div className="error">{error}</div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="historyContainer">
        <h2 className="historyTitle">Historique des analyses</h2>
        <div className="empty">Aucun historique disponible</div>
      </div>
    );
  }

  return (
    <div className="historyContainer">
      <h2 className="historyTitle">Historique des analyses</h2>
      <div className="list">
        {history.map((item) => (
          <div key={item.id} className="item">
            <div className="itemHeader">
              <span className="score">Score: {item.score}/100</span>
              <span className="date">
                {new Date(item.createdAt).toLocaleString("fr-FR")}
              </span>
            </div>
            <p className="text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

