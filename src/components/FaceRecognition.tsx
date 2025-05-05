import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, CameraOff } from 'lucide-react';

interface FaceRecognitionProps {
  onCapture: (imageSrc: string) => void;
  showGuide?: boolean;
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ onCapture, showGuide = true }) => {
  const webcamRef = useRef<Webcam>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  // Simulate face detection interval
  useEffect(() => {
    if (!hasPermission || !webcamRef.current) return;

    const simulateFaceDetection = () => {
      // In a real implementation, this would use actual face detection logic
      // This is just a simulation
      const randomValue = Math.random();
      
      // 80% chance of detecting a face when the webcam is on
      if (randomValue > 0.2) {
        setFaceDetected(true);
      } else {
        setFaceDetected(false);
      }
    };

    const interval = setInterval(simulateFaceDetection, 1000);
    return () => clearInterval(interval);
  }, [hasPermission]);

  // Handle capture with countdown
  useEffect(() => {
    if (capturing && faceDetected) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else if (countdown === 0) {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
          onCapture(imageSrc);
          setCapturing(false);
        }
      }
    }
  }, [capturing, countdown, faceDetected, onCapture]);

  const handleStartCapture = () => {
    setCapturing(true);
    setCountdown(3);
  };

  // Check for webcam permissions
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
      } catch (err) {
        setHasPermission(false);
        console.error("Error accessing webcam:", err);
      }
    };
    
    checkPermissions();
  }, []);

  if (hasPermission === null) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600 mb-4"></div>
        <p>Requesting camera permission...</p>
      </div>
    );
  }

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg text-center border border-red-200">
        <CameraOff className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-red-700 mb-2">Camera Access Denied</h3>
        <p className="text-gray-700 mb-4">Please allow camera access to use face recognition.</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
      <div className="webcam-container w-full aspect-video max-w-md">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 640,
            height: 480,
            facingMode: "user"
          }}
          className="w-full h-full rounded-lg"
        />
        
        <div className={`face-outline ${faceDetected ? 'detected' : ''}`}
             style={{
               left: '50%',
               top: '50%',
               width: '200px',
               height: '200px',
               transform: 'translate(-50%, -50%)'
             }}>
        </div>
        
        {countdown > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-blue-600 text-white text-5xl font-bold h-20 w-20 rounded-full flex items-center justify-center opacity-80">
              {countdown}
            </div>
          </div>
        )}
      </div>

      {showGuide && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md text-sm mb-4 w-full max-w-md">
          <h4 className="font-bold mb-1">For best results:</h4>
          <ul className="list-disc ml-5 space-y-1">
            <li>Ensure your face is clearly visible</li>
            <li>Make sure you have good lighting</li>
            <li>Remove glasses or items covering your face</li>
            <li>Look directly at the camera</li>
          </ul>
        </div>
      )}

      <div className="mt-2 flex justify-center w-full">
        <button 
          onClick={handleStartCapture}
          disabled={capturing || !faceDetected}
          className={`btn flex items-center ${
            capturing || !faceDetected ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'
          }`}
        >
          <Camera className="h-5 w-5 mr-2" />
          {capturing ? 'Capturing...' : 'Capture Face'}
        </button>
      </div>
      
      {!faceDetected && (
        <p className="text-red-500 text-sm mt-2">No face detected. Please center your face in the frame.</p>
      )}
    </div>
  );
};

export default FaceRecognition;