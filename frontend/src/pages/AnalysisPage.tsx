import { useState } from "react";
import { AnalysisForm } from "../components/AnalysisForm";
import { ScoreDisplay } from "../components/ScoreDisplay";
import { AnalyzeResponse } from "../types";

interface AnalysisPageProps {
  onAnalyze: () => void;
}

export const AnalysisPage = ({ onAnalyze }: AnalysisPageProps) => {
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = (analyzeResult: AnalyzeResponse) => {
    setResult(analyzeResult);
    setError(null);
    onAnalyze();
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setResult(null);
  };

  return (
    <>
      {error && (
        <div className="error">
          <strong>Erreur:</strong> {error}
        </div>
      )}
      <AnalysisForm onAnalyze={handleAnalyze} onError={handleError} />
      <ScoreDisplay result={result} />
    </>
  );
};

