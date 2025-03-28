"use client";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useTensorflow } from "../hooks/useTensorflow";
import { useHistory } from "../hooks/useHistory";
import { Prediction } from "../types";
import ImageUploader from "../components/ImageUploader";
import CameraCapture from "../components/CameraCapture";
import PredictionResults from "../components/PredictionResults";
import HistoryList from "../components/HistoryList";
import "../style/globals.css";
export default function Home() {
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const { isModelLoading, error, classifyImage } = useTensorflow();
  const { history, addToHistory, clearHistory } = useHistory();

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  console.log(isModelLoading, isAnalyzing, isImageLoaded);

  useEffect(() => {
    if (selectedImageSrc) {
      setIsImageLoaded(false);
      setPredictions([]);
    }
  }, [selectedImageSrc]);

  const handleImageLoaded = () => {
    setIsImageLoaded(true);
  };

  const handleDetect = async () => {
    if (
      !selectedImageSrc ||
      !imageRef.current ||
      isModelLoading ||
      isImageLoaded
    ) {
      return;
    }

    setIsAnalyzing(true);
    try {
      const results = await classifyImage(imageRef.current);
      setPredictions(results);
      addToHistory(selectedImageSrc, results);
    } catch (err) {
      console.error("Error classifying image:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageSelected = (src: string) => {
    setSelectedImageSrc(src);
  };

  return (
    <div>
      <Head>
        <title>Ứng dụng nhận diện đồ vật</title>
        <meta
          name="description"
          content="Ứng dụng nhận diện đồ vật sử dụng Next.js và TensorFlow.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1 className="text-3xl font-bold text-center my-6">
          Ứng dụng nhận diện đồ vật
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          <ImageUploader onImageSelected={handleImageSelected} />
          <div className="text-center md:text-left">hoặc</div>
          <CameraCapture onImageCaptured={handleImageSelected} />
        </div>

        {selectedImageSrc && (
          <div className="mt-6">
            <div className="flex flex-col items-center">
              <div className="max-w-lg w-full overflow-hidden rounded-lg shadow-md">
                <img
                  ref={imageRef}
                  src={selectedImageSrc}
                  alt="Ảnh được chọn"
                  className="w-full"
                  onLoad={handleImageLoaded}
                />
              </div>

              <button
                className="btn mt-4"
                onClick={handleDetect}
                disabled={isModelLoading || isAnalyzing || isImageLoaded}
              >
                {isModelLoading ? "Đang tải mô hình..." : "Nhận diện đồ vật"}
              </button>
            </div>

            <PredictionResults
              predictions={predictions}
              isLoading={isAnalyzing}
            />
          </div>
        )}

        <HistoryList history={history} onClearHistory={clearHistory} />
      </main>
    </div>
  );
}
