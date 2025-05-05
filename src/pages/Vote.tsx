import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import CandidateCard from '../components/CandidateCard';
import { Vote as VoteIcon, Info, CheckCircle, XCircle } from 'lucide-react';

// Mock candidates data
const MOCK_CANDIDATES = [
  {
    id: 'candidate-1',
    name: 'Arun Sharma',
    party: 'Progressive Party',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'candidate-2',
    name: 'Priya Patel',
    party: 'Democratic Alliance',
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'candidate-3',
    name: 'Rajesh Kumar',
    party: 'National Front',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'candidate-4',
    name: 'Sunita Verma',
    party: "People's Reform",
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const Vote: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [votingComplete, setVotingComplete] = useState(false);
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    // Check if user has already voted
    if (user?.hasVoted) {
      showToast('Already Voted', 'You have already cast your vote in this election', 'info');
      navigate('/dashboard');
    }
  }, [user, navigate, showToast]);
  
  useEffect(() => {
    if (votingComplete && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (votingComplete && countdown === 0) {
      navigate('/dashboard');
    }
  }, [votingComplete, countdown, navigate]);
  
  const handleCandidateSelect = (id: string) => {
    setSelectedCandidate(id);
  };
  
  const handleSubmitVote = () => {
    if (!selectedCandidate) {
      showToast('No Selection', 'Please select a candidate before submitting your vote', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to cast vote
    setTimeout(() => {
      showToast('Vote Recorded', 'Your vote has been successfully recorded', 'success');
      setIsSubmitting(false);
      setVotingComplete(true);
      
      // In a real app, we would update the user's hasVoted status on the backend
    }, 2000);
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      {votingComplete ? (
        <div className="card p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Vote Successfully Cast!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for participating in the democratic process. Your vote has been recorded securely.
          </p>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg inline-block">
            <p className="text-blue-800">
              Redirecting to dashboard in <span className="font-bold">{countdown}</span> seconds...
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-primary"
          >
            Return to Dashboard
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
            <VoteIcon className="h-7 w-7 mr-2 text-blue-600" />
            Cast Your Vote
          </h1>
          <p className="text-gray-600 mb-6">
            Select your preferred candidate below and confirm your vote
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start mb-8">
            <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-800 font-medium">Important Information</p>
              <p className="text-sm text-blue-700 mt-1">
                Your vote is confidential and secure. Once submitted, it cannot be changed or retracted.
                Please review your selection carefully before confirming.
              </p>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Select Your Candidate</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {MOCK_CANDIDATES.map(candidate => (
              <CandidateCard
                key={candidate.id}
                id={candidate.id}
                name={candidate.name}
                party={candidate.party}
                image={candidate.image}
                selected={selectedCandidate === candidate.id}
                onClick={handleCandidateSelect}
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmitVote}
              disabled={!selectedCandidate || isSubmitting}
              className={`btn ${
                selectedCandidate ? 'btn-primary' : 'bg-gray-300 cursor-not-allowed'
              } min-w-[200px]`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : 'Confirm Vote'}
            </button>
          </div>
          
          <div className="mt-12">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
            >
              <XCircle className="h-4 w-4 mr-1" />
              Cancel and return to dashboard
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Vote;