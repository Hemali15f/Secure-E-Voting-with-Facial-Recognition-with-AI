import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  hasVoted: boolean;
  profileImage?: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, faceData: string) => Promise<boolean>;
  register: (name: string, email: string, faceData: string) => Promise<boolean>;
  logout: () => void;
  verifyOtp: (otp: string) => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock data - in a real app this would come from a backend
const MOCK_ADMIN = {
  id: 'admin-123',
  name: 'Admin User',
  email: 'admin@example.com',
  isVerified: true,
  hasVoted: false,
  profileImage: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600'
};

const MOCK_USER = {
  id: 'user-456',
  name: 'Test User',
  email: 'user@example.com',
  isVerified: true,
  hasVoted: false,
  profileImage: 'https://images.pexels.com/photos/2698657/pexels-photo-2698657.jpeg?auto=compress&cs=tinysrgb&w=600'
};

// Create the provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for existing user session on load
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('secure_vote_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAdmin(parsedUser.email === MOCK_ADMIN.email);
      }
      setLoading(false);
    };

    // Simulate network delay
    setTimeout(checkAuth, 1000);
  }, []);

  // Login function - in a real app would call an API
  const login = async (email: string, faceData: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulated authentication logic
        if (email === MOCK_ADMIN.email) {
          setUser(MOCK_ADMIN);
          setIsAdmin(true);
          localStorage.setItem('secure_vote_user', JSON.stringify(MOCK_ADMIN));
          setLoading(false);
          resolve(true);
        } else if (email === MOCK_USER.email) {
          setUser(MOCK_USER);
          setIsAdmin(false);
          localStorage.setItem('secure_vote_user', JSON.stringify(MOCK_USER));
          setLoading(false);
          resolve(true);
        } else {
          setLoading(false);
          resolve(false);
        }
      }, 2000);
    });
  };

  // Register function - in a real app would call an API
  const register = async (name: string, email: string, faceData: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create a new user (unverified)
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          isVerified: false,
          hasVoted: false,
          profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600'
        };
        
        setUser(newUser);
        setIsAdmin(false);
        localStorage.setItem('secure_vote_user', JSON.stringify(newUser));
        setLoading(false);
        resolve(true);
      }, 2000);
    });
  };

  // Verify OTP function - in a real app would call an API
  const verifyOtp = async (otp: string): Promise<boolean> => {
    if (!user) return false;
    
    // Simulate API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock OTP verification (any 6-digit code works)
        if (otp.length === 6 && /^\d+$/.test(otp)) {
          const updatedUser = { ...user, isVerified: true };
          setUser(updatedUser);
          localStorage.setItem('secure_vote_user', JSON.stringify(updatedUser));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1500);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('secure_vote_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        login,
        register,
        logout,
        verifyOtp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};