"use client";

import { useState, useEffect } from "react";
import { Prediction } from "../types";

interface HistoryItem {
  id: string;
  imageSrc: string;
  topPrediction: Prediction;
  timestamp: number;
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("detectionHistory");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Không thể tải lịch sử:", error);
    }
  }, []);

  const addToHistory = (imageSrc: string, predictions: Prediction[]) => {
    const optimizedImageSrc = optimizeImageForStorage(imageSrc);
    const topPrediction =
      predictions.length > 0
        ? predictions[0]
        : {
            className: "unknown",
            probability: 0,
          };

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      imageSrc: optimizedImageSrc,
      topPrediction: topPrediction,
      timestamp: Date.now(),
    };

    try {
      const updatedHistory = [newItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("detectionHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Lỗi khi lưu vào localStorage:", error);
      try {
        const reducedHistory = [newItem].concat(history.slice(0, 5));
        setHistory(reducedHistory);
        localStorage.setItem(
          "detectionHistory",
          JSON.stringify(reducedHistory)
        );
      } catch (e) {
        console.error("Vẫn không thể lưu lịch sử giảm kích thước:", e);
      }
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("detectionHistory");
  };

  const optimizeImageForStorage = (imageSrc: string): string => {
    if (imageSrc.startsWith("data:image")) {
      try {
        const img = new Image();
        img.src = imageSrc;

        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 200; // Kích thước thumbnail
        const MAX_HEIGHT = 200;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        return canvas.toDataURL("image/jpeg", 0.7); // Giảm chất lượng xuống 70%
      } catch (e) {
        console.error("Không thể tối ưu hóa ảnh:", e);
        return imageSrc; // Trả về nguyên bản nếu không tối ưu được
      }
    }

    return imageSrc;
  };

  return { history, addToHistory, clearHistory };
}
