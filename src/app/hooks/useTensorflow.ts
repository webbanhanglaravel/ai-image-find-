"use client";

import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { Prediction } from "../types";

export const useTensorflow = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        setIsModelLoading(false);
      } catch (err) {
        setError("Không thể tải mô hình. Vui lòng thử lại sau.");
        setIsModelLoading(false);
        console.error("Error loading model:", err);
      }
    };

    loadModel();

    return () => {
      if (model) {
        tf.dispose();
      }
    };
  }, []);

  const classifyImage = async (
    imageElement: HTMLImageElement
  ): Promise<Prediction[]> => {
    if (!model) {
      throw new Error("Mô hình chưa được tải");
    }

    const predictions = await model.classify(imageElement);
    return predictions;
  };

  return {
    model,
    isModelLoading,
    error,
    classifyImage,
  };
};
