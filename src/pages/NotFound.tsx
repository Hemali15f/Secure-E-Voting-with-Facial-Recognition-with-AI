import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="card p-8 max-w-md mx-auto text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary inline-flex items-center">
          <Home className="h-5 w-5 mr-2" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;