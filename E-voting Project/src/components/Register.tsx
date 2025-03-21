import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { ArrowLeft, Camera } from 'lucide-react';

interface RegisterProps {
  onBack: () => void;
  onRegisterComplete: () => void;
}

const Register: React.FC<RegisterProps> = ({ onBack, onRegisterComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    voterId: '',
    password: '',
    confirmPassword: '',
  });
  const [facialImage, setFacialImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setFacialImage(imageSrc);
      // In a real app, you would send this image to your backend
      setTimeout(() => {
        onRegisterComplete();
      }, 1500);
    }
  }, [onRegisterComplete]);

  const handleNext = () => {
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
    }
    setStep(step + 1);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 ml-4">Register as Candidate</h2>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Voter ID</label>
              <input
                type="text"
                name="voterId"
                value={formData.voterId}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <button
              onClick={handleNext}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next: Facial Recognition
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Please look directly at the camera and ensure good lighting
              </p>
              {!facialImage ? (
                <>
                  <div className="rounded-lg overflow-hidden mb-4">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="w-full"
                    />
                  </div>
                  <button
                    onClick={capture}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Capture Photo
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto border-4 border-blue-600 rounded-full animate-pulse flex items-center justify-center mb-4">
                    <div className="text-blue-600">Processing...</div>
                  </div>
                  <p className="text-gray-600">Verifying and registering...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;