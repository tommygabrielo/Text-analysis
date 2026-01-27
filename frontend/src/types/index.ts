export interface AnalyzeResponse {
  score: number;
  status: string;
}

export interface HistoryItem {
  id: string;
  text: string;
  score: number;
  createdAt: string;
}

