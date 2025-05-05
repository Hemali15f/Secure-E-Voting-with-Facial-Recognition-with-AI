import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import FaceRecognition from '../components/FaceRecognition';
import { User, KeyRound, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [faceCaptured, setFaceCaptured] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address', 'error');
      return;
    }
    
    setStep(2);
  };

  const handleFaceCapture = (imageSrc: string) => {
    setFaceCaptured(imageSrc);
    setVerifying(true);
    
    // Simulate face verification
    setTimeout(() => {
      setVerifying(false);
    }, 3000);
  };

  const handleLoginSubmit = async () => {
    if (!faceCaptured) {
      showToast('Face Not Captured', 'Please capture your face to continue', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // For demo, we're allowing login with admin@example.com or user@example.com
      const success = await login(email, faceCaptured);
      
      if (success) {
        showToast('Login Successful', 'Welcome back!', 'success');
        navigate('/dashboard');
      } else {
        showToast('Login Failed', 'Invalid credentials or face not recognized', 'error');
      }
    } catch (error) {
      showToast('Login Error', 'Something went wrong. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Login to Vote</h1>
          <p className="text-gray-600 mt-1">Access your secure voting account</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${
              step >= 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-1 text-sm text-gray-600">
            <span>Email</span>
            <span>Face Recognition</span>
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-input pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">For demo, use: admin@example.com or user@example.com</p>
            </div>
            
            <div className="mt-6">
              <button type="submit" className="btn btn-primary w-full flex items-center justify-center">
                Continue to Face Recognition
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div>
            <div className="mb-4 text-center">
              <p className="text-gray-800">Verify your identity with face recognition</p>
              <div className="text-sm text-gray-600 mt-1 mb-4">
                Look directly at the camera and ensure your face is clearly visible
              </div>
            </div>
            
            <FaceRecognition onCapture={handleFaceCapture} />
            
            {faceCaptured && (
              <div className="mt-4">
                {verifying ? (
                  <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
                    <div className="authentication-animation authenticating"></div>
                    <p className="text-blue-800 mb-2">Verifying your identity...</p>
                    <div className="w-full max-w-xs progress-bar">
                      <div className="progress-value" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleLoginSubmit}
                    disabled={isLoading}
                    className="btn btn-primary w-full flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Logging in...
                      </>
                    ) : (
                      <>
                        <KeyRound className="mr-2 h-5 w-5" />
                        Login
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
            
            <div className="mt-4 text-center">
              <button 
                onClick={() => setStep(1)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Back to email
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;