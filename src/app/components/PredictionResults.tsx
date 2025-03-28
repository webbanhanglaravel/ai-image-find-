import React from "react";
import { Prediction } from "../types";
import { formatClassName } from "../utils/helpers";

interface PredictionResultsProps {
  predictions: Prediction[];
  isLoading: boolean;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({
  predictions,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-center mt-2">Đang phân tích...</p>
      </div>
    );
  }

  if (predictions.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Kết quả nhận diện:</h3>
      <div className="space-y-2">
        {predictions.map((prediction, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex justify-between">
              <span>{formatClassName(prediction.className)}</span>
              <span className="font-medium">
                {(prediction.probability * 100).toFixed(2)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${prediction.probability * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionResults;
