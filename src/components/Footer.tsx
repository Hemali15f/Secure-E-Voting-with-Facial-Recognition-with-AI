import React from 'react';
import { Shield, Heart, GithubIcon } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Left */}
          <div className="w-full md:w-4/12 mb-6 md:mb-0">
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              SecureVote
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              A secure e-voting platform leveraging facial recognition, deep learning, and modern web technologies to enhance the voting system.
            </p>
            <div className="flex">
              <a href="https://github.com/Hemali15f/Secure-E-Voting-with-Facial-Recognition-with-AI" className="bg-gray-700 text-white rounded-full p-2 mr-2 hover:bg-gray-600 transition-colors">
                <GithubIcon size={16} />
              </a>
            </div>
          </div>
          
          {/* Middle */}
          <div className="w-full md:w-4/12 mb-6 md:mb-0">
            <h4 className="text-xl font-bold mb-4">Features</h4>
            <ul className="list-none text-gray-400">
              <li className="py-1"><a href="#" className="hover:text-white transition-colors">Facial Recognition</a></li>
              <li className="py-1"><a href="#" className="hover:text-white transition-colors">Secure Authentication</a></li>
              <li className="py-1"><a href="#" className="hover:text-white transition-colors">Instant Results</a></li>
              <li className="py-1"><a href="#" className="hover:text-white transition-colors">Admin Dashboard</a></li>
            </ul>
          </div>
          
          {/* Right */}
          <div className="w-full md:w-4/12">
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <p className="text-gray-400 mb-2">Have questions about our platform?</p>
            <a href="mailto:info@securevote.app" className="text-blue-400 hover:text-blue-300 transition-colors">
              info@securevote.app
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {year} SecureVote. All rights reserved.</p>
          <p className="mt-1 flex items-center justify-center">
            Made with <Heart className="mx-1 h-4 w-4 text-red-500" /> for secure elections
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;