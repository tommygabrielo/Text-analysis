import { AnalyzeResponse, HistoryItem } from "../types";

const API_BASE_URL = "/api";

export const analyzeText = async (text: string): Promise<AnalyzeResponse> => {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Erreur inconnue" }));
    throw new Error(error.error || "Erreur lors de l'analyse");
  }

  return response.json();
};

export const getHistory = async (): Promise<HistoryItem[]> => {
  const response = await fetch(`${API_BASE_URL}/history`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de l'historique");
  }

  return response.json();
};

