import React, { useState, createContext, useContext } from 'react';
import { Shield, User, UserCog, Home, Info, UserCircle, Vote, BarChart3 } from 'lucide-react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import CandidateDashboard from './components/CandidateDashboard';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';

type UserRole = 'none' | 'admin' | 'candidate';

interface VotingContextType {
  isVotingActive: boolean;
  setVotingActive: (active: boolean) => void;
  isVotingEnded: boolean;
  setVotingEnded: (ended: boolean) => void;
  votes: { [key: string]: number };
  setVotes: (votes: { [key: string]: number }) => void;
}

export const VotingContext = createContext<VotingContextType>({
  isVotingActive: false,
  setVotingActive: () => {},
  isVotingEnded: false,
  setVotingEnded: () => {},
  votes: {},
  setVotes: () => {},
});

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'login' | 'dashboard'>('home');
  const [userRole, setUserRole] = useState<UserRole>('none');
  const [isVotingActive, setVotingActive] = useState(false);
  const [isVotingEnded, setVotingEnded] = useState(false);
  const [votes, setVotes] = useState({
    'Party A': 0,
    'Party B': 0,
    'Party C': 0,
  });

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUserRole('none');
    setCurrentPage('home');
  };

  return (
    <VotingContext.Provider value={{ 
      isVotingActive, 
      setVotingActive, 
      isVotingEnded, 
      setVotingEnded,
      votes,
      setVotes
    }}>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">SecureVote</span>
              </div>
              <div className="flex items-center space-x-4">
                {userRole === 'none' && (
                  <>
                    <button
                      onClick={() => setCurrentPage('home')}
                      className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                    >
                      <Home size={20} />
                      <span>Home</span>
                    </button>
                    <button
                      onClick={() => setCurrentPage('about')}
                      className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                    >
                      <Info size={20} />
                      <span>About</span>
                    </button>
                    <button
                      onClick={() => setCurrentPage('login')}
                      className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <UserCircle size={20} />
                      <span>Login</span>
                    </button>
                  </>
                )}
                {userRole !== 'none' && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <span>Logout</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {currentPage === 'home' && <HomePage onGetStarted={() => setCurrentPage('login')} />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'login' && <Login onLogin={handleLogin} />}
          {currentPage === 'dashboard' && userRole === 'admin' && (
            <AdminDashboard onLogout={handleLogout} />
          )}
          {currentPage === 'dashboard' && userRole === 'candidate' && (
            <CandidateDashboard onLogout={handleLogout} />
          )}
        </main>
      </div>
    </VotingContext.Provider>
  );
}

export default App;