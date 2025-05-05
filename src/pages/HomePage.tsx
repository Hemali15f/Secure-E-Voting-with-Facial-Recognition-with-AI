import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, Shield, Users, BarChart } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg mb-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Secure E-Voting With Facial Recognition</h1>
            <p className="text-xl mb-8 opacity-90">
              A modern, secure voting platform enhanced with AI facial recognition and blockchain technology for transparent, accessible elections.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="btn bg-white text-blue-700 hover:bg-gray-100">
                Register Now
              </Link>
              <Link to="/login" className="btn bg-blue-700 text-white border border-white hover:bg-blue-800">
                Login to Vote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 mb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Secure, Transparent, Accessible</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-6 flex flex-col items-center text-center h-full">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Facial Recognition Security</h3>
              <p className="text-gray-600 flex-grow">
                Advanced AI facial recognition ensures only authenticated and authorized individuals can vote, preventing fraud and maintaining election integrity.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card p-6 flex flex-col items-center text-center h-full">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Vote From Anywhere</h3>
              <p className="text-gray-600 flex-grow">
                Cast your vote securely from any location with an internet connection, eliminating the need for physical polling stations and improving accessibility.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card p-6 flex flex-col items-center text-center h-full">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <BarChart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Results</h3>
              <p className="text-gray-600 flex-grow">
                Automatic vote counting provides immediate, accurate results as soon as the election closes, ensuring transparency and trust in the electoral process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50 rounded-lg mb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center mb-10">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-6">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Register with Facial Recognition</h3>
                <p className="text-gray-600">
                  Create an account with your email, then complete verification by scanning your face. Our system securely stores your facial biometrics for future authentication.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center mb-10">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-6">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Authenticate with Your Face</h3>
                <p className="text-gray-600">
                  When it's time to vote, simply login with your email and authenticate using your face. Our AI matching ensures only you can access your voting profile.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-6">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Cast Your Secure Vote</h3>
                <p className="text-gray-600">
                  Once authenticated, cast your vote securely. The system ensures one-person-one-vote, preventing duplicate voting while maintaining complete anonymity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-blue-600 text-white rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to experience the future of voting?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the secure voting revolution today and help shape a more accessible and transparent democratic process.
          </p>
          <Link to="/register" className="btn bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-3">
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;