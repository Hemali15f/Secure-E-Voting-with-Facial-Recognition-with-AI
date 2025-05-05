import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Vote, UserCircle, Settings, LogOut, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Vote className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">SecureVote</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            
            {!user ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Admin
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    <UserCircle className="h-5 w-5" />
                    <span>{user.name}</span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-1">
                      <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <UserCircle className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link to="/vote" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Vote className="h-4 w-4 mr-2" />
                        Vote
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600 focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/vote" 
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Vote
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="text-left text-red-600 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;