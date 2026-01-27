import { AnalyzeResponse } from "../types";
import "./ScoreDisplay.css";

interface ScoreDisplayProps {
  result: AnalyzeResponse | null;
}

export const ScoreDisplay = ({ result }: ScoreDisplayProps) => {
  if (!result) return null;

  const getScoreClass = (score: number): string => {
    if (score >= 70) return "scoreHigh";
    if (score >= 40) return "scoreMedium";
    return "scoreLow";
  };

  return (
    <div className="container">
      <h2 className="title">Score de conformité</h2>
      <div className={`score ${getScoreClass(result.score)}`}>
        {result.score}/100
      </div>
      <p className="status">Statut: {result.status}</p>
    </div>
  );
};

