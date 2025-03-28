import React from "react";
import { formatClassName } from "../utils/helpers";
import { HistoryItem } from "../types";

interface HistoryListProps {
  history: HistoryItem[];
  onClearHistory: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onClearHistory,
}) => {
  if (!history || history.length === 0) {
    return (
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lịch sử nhận diện</h2>
        </div>
        <p className="text-gray-500">Chưa có lịch sử nhận diện</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Lịch sử nhận diện</h2>
        <button
          className="text-sm text-red-500 hover:text-red-600"
          onClick={onClearHistory}
        >
          Xóa lịch sử
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((item) => {
          if (!item) return null;

          const className = item.topPrediction?.className || "Không xác định";
          const probability = item.topPrediction?.probability || 0;

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={item.imageSrc}
                  alt="Ảnh đã nhận diện"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">
                  {formatClassName(className)}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
                <p className="text-sm mt-1">
                  Độ tin cậy: {(probability * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryList;
