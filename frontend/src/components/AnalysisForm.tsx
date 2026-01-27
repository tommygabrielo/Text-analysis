import { useState } from "react";
import { analyzeText } from "../services/api";
import { AnalyzeResponse } from "../types";
import "./AnalysisForm.css";

interface AnalysisFormProps {
  onAnalyze: (result: AnalyzeResponse) => void;
  onError: (error: string) => void;
}

export const AnalysisForm = ({ onAnalyze, onError }: AnalysisFormProps) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      const result = await analyzeText(text);
      onAnalyze(result);
      setText("");
    } catch (error) {
      onError(error instanceof Error ? error.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Entrez le texte à analyser..."
        rows={6}
        className="textarea"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !text.trim()}
        className={`button ${loading || !text.trim() ? "buttonDisabled" : ""}`}
      >
        {loading ? "Analyse en cours..." : "Analyser"}
      </button>
    </form>
  );
};

