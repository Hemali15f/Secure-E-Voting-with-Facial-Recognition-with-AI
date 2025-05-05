import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Vote, Clock, CheckCircle, AlertTriangle, User, Edit } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showEditProfile, setShowEditProfile] = useState(false);
  
  // Mock election data
  const currentElection = {
    id: 'election-2025',
    name: 'General Elections 2025',
    startDate: '2025-08-15',
    endDate: '2025-08-15',
    status: 'active'
  };

  // Format dates for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const daysRemaining = () => {
    const endDate = new Date(currentElection.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Welcome, {user.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* User Profile Card */}
        <div className="card p-6 md:col-span-1">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img 
                src={user.profileImage || 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600'} 
                alt={user.name}
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className={`absolute bottom-0 right-0 p-1 rounded-full ${user.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}>
                {user.isVerified ? (
                  <CheckCircle className="h-5 w-5 text-white" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-white" />
                )}
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            
            <div className="mt-4 text-center">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.isVerified 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
              }`}>
                {user.isVerified ? 'Verified Voter' : 'Verification Pending'}
              </span>
            </div>
            
            <button 
              onClick={() => setShowEditProfile(!showEditProfile)}
              className="mt-6 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit Profile
            </button>
          </div>
          
          {showEditProfile && (
            <div className="mt-6 border-t pt-6">
              <h3 className="font-medium mb-3">Update Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" defaultValue={user.name} />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" defaultValue={user.email} disabled />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                <button className="btn btn-primary w-full">Save Changes</button>
              </div>
            </div>
          )}
        </div>
        
        {/* Election Status */}
        <div className="card p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Vote className="h-5 w-5 mr-2 text-blue-600" />
            Current Election
          </h2>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-blue-800">{currentElection.name}</h3>
            <div className="flex flex-wrap gap-x-6 text-sm mt-2 text-gray-600">
              <span>Start: {formatDate(currentElection.startDate)}</span>
              <span>End: {formatDate(currentElection.endDate)}</span>
            </div>
            <div className="mt-3 flex items-center">
              <Clock className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-sm font-medium text-blue-800">{daysRemaining()} days remaining</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">Your Voting Status</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {user.hasVoted 
                    ? 'You have already cast your vote in this election' 
                    : 'You have not voted in this election yet'}
                </p>
              </div>
              
              {!user.hasVoted ? (
                <Link to="/vote" className="btn btn-primary">
                  Cast Your Vote
                </Link>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Vote Recorded
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Voting Instructions */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Voting Instructions</h2>
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-blue-600 font-medium">1</span>
            </div>
            <div>
              <h3 className="font-medium">Verify your identity</h3>
              <p className="text-sm text-gray-600 mt-1">
                Ensure your account is verified through email and facial recognition before voting day.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-blue-600 font-medium">2</span>
            </div>
            <div>
              <h3 className="font-medium">Review candidates</h3>
              <p className="text-sm text-gray-600 mt-1">
                Take time to review all candidates and their platforms before making your decision.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-blue-600 font-medium">3</span>
            </div>
            <div>
              <h3 className="font-medium">Cast your vote</h3>
              <p className="text-sm text-gray-600 mt-1">
                Select your preferred candidate and confirm your vote. Once submitted, your vote cannot be changed.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-blue-600 font-medium">4</span>
            </div>
            <div>
              <h3 className="font-medium">Verify confirmation</h3>
              <p className="text-sm text-gray-600 mt-1">
                A confirmation message will be displayed after your vote is successfully recorded.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Help & Support */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
        <p className="text-gray-600 mb-4">
          Having trouble with voting or encountering technical issues? Our support team is here to help.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h3 className="font-medium">Contact Support</h3>
              <p className="text-sm text-gray-600 mt-1">Available 24/7 during election periods</p>
            </div>
            <a 
              href="mailto:support@securevote.app" 
              className="btn btn-outline"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;