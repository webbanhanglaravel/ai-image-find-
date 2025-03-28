import React from "react";
import { useCamera } from "../hooks/useCamera";

interface CameraCaptureProps {
  onImageCaptured: (imageSrc: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onImageCaptured }) => {
  const { videoRef, isActive, startCamera, stopCamera, captureImage } =
    useCamera();
  const [error, setError] = React.useState<string | null>(null);

  const handleStartCamera = async () => {
    try {
      setError(null);
      await startCamera();
    } catch (err) {
      setError(
        "Không thể mở camera. Vui lòng kiểm tra quyền truy cập camera hoặc thử trên thiết bị khác."
      );
      console.error("Camera error:", err);
    }
  };

  const handleCapture = () => {
    const imageSrc = captureImage();
    if (imageSrc) {
      onImageCaptured(imageSrc);
      stopCamera();
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      {!isActive ? (
        <button className="btn" onClick={handleStartCamera}>
          Sử dụng camera
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative mb-4 overflow-hidden rounded-lg shadow-md">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full max-w-lg"
            />
          </div>
          <div className="flex space-x-2">
            <button className="btn" onClick={handleCapture}>
              Chụp ảnh
            </button>
            <button
              className="btn bg-red-500 hover:bg-red-600"
              onClick={stopCamera}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
