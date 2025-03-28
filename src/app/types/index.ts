export interface Prediction {
  className: string;
  probability: number;
}

export interface HistoryItem {
  id: number | string;
  timestamp: string | number;
  imageSrc: string;
  topPrediction: Prediction;
}
