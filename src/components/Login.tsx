import React, { useState } from 'react';
import { User, UserCog } from 'lucide-react';
import Register from './Register';

interface LoginProps {
  onLogin: (role: 'admin' | 'candidate') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'candidate'>('candidate');
  const [showRegister, setShowRegister] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = () => {
    // In a real app, validate credentials here
    onLogin(selectedRole);
  };

  if (showRegister) {
    return <Register onBack={() => setShowRegister(false)} onRegisterComplete={() => onLogin('candidate')} />;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Login to SecureVote</h2>
          <p className="text-gray-600 mt-2">Please select your role and enter credentials</p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setSelectedRole('candidate')}
              className={`flex-1 p-4 rounded-lg border-2 ${
                selectedRole === 'candidate'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <User className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-sm font-medium">Candidate</div>
            </button>
            <button
              onClick={() => setSelectedRole('admin')}
              className={`flex-1 p-4 rounded-lg border-2 ${
                selectedRole === 'admin'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <UserCog className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-sm font-medium">Admin</div>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>

          {selectedRole === 'candidate' && (
            <div className="text-center">
              <button
                onClick={() => setShowRegister(true)}
                className="text-blue-600 hover:text-blue-800"
              >
                New candidate? Register here
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;