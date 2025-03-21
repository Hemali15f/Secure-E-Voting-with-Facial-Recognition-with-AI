import React from 'react';
import { Shield, Lock, UserCheck, Award } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900">
          Secure E-Voting with <span className="text-blue-600">Facial Recognition</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experience the future of voting with our cutting-edge facial recognition technology,
          ensuring secure and transparent elections.
        </p>
        <button
          onClick={onGetStarted}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all"
        >
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <Shield className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure Voting</h3>
          <p className="text-gray-600">
            Advanced encryption and blockchain technology ensure your vote remains secure and tamper-proof.
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <Lock className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Facial Recognition</h3>
          <p className="text-gray-600">
            State-of-the-art facial recognition ensures one person, one vote with maximum security.
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <UserCheck className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Verification</h3>
          <p className="text-gray-600">
            Quick and simple verification process with real-time results and transparency.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-blue-600 text-white rounded-xl p-8">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">99.9%</div>
            <div className="text-blue-100">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">1M+</div>
            <div className="text-blue-100">Votes Processed</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-blue-100">Security</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;