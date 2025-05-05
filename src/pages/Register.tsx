import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import FaceRecognition from '../components/FaceRecognition';
import { User, Mail, ArrowRight } from 'lucide-react';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [faceCaptured, setFaceCaptured] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Invalid Name', 'Please enter your name', 'error');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address', 'error');
      return;
    }

    setStep(2);
  };

  const handleFaceCapture = async (imageSrc: string) => {
    setFaceCaptured(imageSrc);

    try {
      const uploadResponse = await fetch('http://localhost:3001/api/image/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: imageSrc, email, name })
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image and user data');
      }
    } catch (error) {
      showToast('Image Upload Error', 'Could not save face image to server', 'error');
      return;
    }

    try {
      const otpResponse = await fetch('http://localhost:3001/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (otpResponse.ok) {
        setOtpSent(true);
        setStep(3);
        showToast('OTP Sent', 'A verification code has been sent to your email', 'success');
      } else {
        showToast('Error', 'Failed to send OTP', 'error');
      }
    } catch (err) {
      showToast('Network Error', 'Unable to contact server', 'error');
    }
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!faceCaptured) {
      showToast('Face Not Captured', 'Please capture your face to continue', 'error');
      return;
    }

    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      showToast('Invalid OTP', 'Please enter a valid 6-digit OTP', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (data.verified) {
        showToast('Registration Successful', 'Your account has been created', 'success');
        navigate('/dashboard');
      } else {
        showToast('Invalid OTP', 'The verification code entered is incorrect', 'error');
      }
    } catch (error) {
      showToast('Registration Error', 'Something went wrong. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container" style={{ maxWidth: '500px', margin: 'auto', padding: '2rem' }}>
      {step === 1 && (
        <form onSubmit={handleBasicInfoSubmit}>
          <h2>Step 1: Enter Your Details</h2>
          <div>
            <label>
              <User size={16} /> Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <Mail size={16} /> Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">
            Continue <ArrowRight size={16} />
          </button>
        </form>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Capture Your Face</h2>
          <FaceRecognition onCapture={handleFaceCapture} />
        </div>
      )}

      {step === 3 && otpSent && (
        <form onSubmit={handleRegistrationSubmit}>
          <h2>Step 3: Enter OTP</h2>
          <div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;
