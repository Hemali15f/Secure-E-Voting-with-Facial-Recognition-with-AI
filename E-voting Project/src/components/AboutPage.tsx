import React from 'react';
import { Shield, Lock, UserCheck, BarChart3 } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">About SecureVote</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          SecureVote is a cutting-edge e-voting platform that combines facial recognition
          technology with blockchain security to ensure fair and transparent elections.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Shield className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To provide a secure, accessible, and transparent voting platform that ensures
            the integrity of every election while making the voting process convenient for
            all participants.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Lock className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Security First</h2>
          <p className="text-gray-600">
            Our platform employs state-of-the-art facial recognition and blockchain
            technology to prevent fraud and ensure that each vote is properly counted.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <UserCheck className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Easy to Use</h2>
          <p className="text-gray-600">
            We've designed our platform to be intuitive and accessible, ensuring that
            every voter can cast their vote with confidence and ease.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Real-time Results</h2>
          <p className="text-gray-600">
            Administrators can monitor voting progress in real-time while maintaining
            the anonymity and security of individual votes.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;