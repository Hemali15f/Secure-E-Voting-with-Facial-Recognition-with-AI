import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CandidateCard from '../components/CandidateCard';
import { ArrowLeft, BarChart, Download, Share2, RefreshCcw } from 'lucide-react';

// Mock candidates with results
const MOCK_RESULTS = [
  {
    id: 'candidate-1',
    name: 'Arun Sharma',
    party: 'Progressive Party',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    votes: 3842,
    percentage: 42.8
  },
  {
    id: 'candidate-2',
    name: 'Priya Patel',
    party: 'Democratic Alliance',
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600',
    votes: 2955,
    percentage: 32.9
  },
  {
    id: 'candidate-3',
    name: 'Rajesh Kumar',
    party: 'National Front',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    votes: 1358,
    percentage: 15.1
  },
  {
    id: 'candidate-4',
    name: 'Sunita Verma',
    party: "People's Reform",
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    votes: 818,
    percentage: 9.2
  }
];

interface ElectionStats {
  totalVotes: number;
  voterTurnout: number;
  remainingTime: string;
}

const ElectionResults: React.FC = () => {
  const [results, setResults] = useState(MOCK_RESULTS);
  const [stats, setStats] = useState<ElectionStats>({
    totalVotes: 8973,
    voterTurnout: 72,
    remainingTime: '8 hours 24 minutes'
  });
  const [showLiveIndicator, setShowLiveIndicator] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Sort results by votes (highest first)
  useEffect(() => {
    const sortedResults = [...results].sort((a, b) => b.votes - a.votes);
    setResults(sortedResults);
  }, []);
  
  // Live indicator blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLiveIndicator(prev => !prev);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refresh with a delay
    setTimeout(() => {
      // Randomly update some votes
      const updatedResults = results.map(candidate => {
        const randomChange = Math.floor(Math.random() * 10) - 2; // -2 to +7
        const newVotes = Math.max(0, candidate.votes + randomChange);
        return { ...candidate, votes: newVotes };
      });
      
      // Recalculate percentages
      const totalVotes = updatedResults.reduce((sum, candidate) => sum + candidate.votes, 0);
      const resultsWithPercentages = updatedResults.map(candidate => ({
        ...candidate,
        percentage: totalVotes > 0 ? parseFloat(((candidate.votes / totalVotes) * 100).toFixed(1)) : 0
      }));
      
      // Sort by votes
      const sortedResults = [...resultsWithPercentages].sort((a, b) => b.votes - a.votes);
      
      setResults(sortedResults);
      setStats({
        ...stats,
        totalVotes: totalVotes
      });
      setIsRefreshing(false);
    }, 1500);
  };
  
  const handleDownloadResults = () => {
    // In a real app, this would generate a CSV or PDF report
    alert('Downloading election results...');
  };
  
  const handleShareResults = () => {
    // In a real app, this would open a share dialog
    alert('Sharing election results...');
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <Link to="/admin" className="flex items-center text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">Election Results</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRefresh}
            className="btn btn-outline flex items-center"
            disabled={isRefreshing}
          >
            <RefreshCcw className={`h-5 w-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button 
            onClick={handleDownloadResults}
            className="btn btn-outline flex items-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Download
          </button>
          <button 
            onClick={handleShareResults}
            className="btn btn-outline flex items-center"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </button>
        </div>
      </div>
      
      {/* Results Overview */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">General Elections 2025</h2>
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${showLiveIndicator ? 'bg-red-500' : 'bg-red-300'} mr-2`}></div>
            <span className="text-sm font-medium text-gray-700">LIVE</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-800">Total Votes Cast</div>
            <div className="text-3xl font-bold text-blue-900 mt-1">{stats.totalVotes.toLocaleString()}</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-green-800">Voter Turnout</div>
            <div className="text-3xl font-bold text-green-900 mt-1">{stats.voterTurnout}%</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-purple-800">Time Remaining</div>
            <div className="text-3xl font-bold text-purple-900 mt-1">{stats.remainingTime}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold">Current Standing</h3>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
      
      {/* Candidates Results */}
      <h2 className="text-xl font-semibold mb-4">Candidate Results</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 fall-in">
        {results.map((candidate, index) => (
          <div key={candidate.id} className={`stagger-item`}>
            <CandidateCard
              id={candidate.id}
              name={candidate.name}
              party={candidate.party}
              image={candidate.image}
              votes={candidate.votes}
              percentage={candidate.percentage}
              showResults={true}
            />
          </div>
        ))}
      </div>
      
      {/* Vote Distribution Chart (simplified) */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Vote Distribution</h2>
        
        <div className="h-16 bg-gray-200 rounded-lg overflow-hidden flex">
          {results.map((candidate, index) => (
            <div 
              key={candidate.id}
              className={`h-full flex items-center justify-center text-white font-bold ${
                index === 0 ? 'bg-blue-600' :
                index === 1 ? 'bg-green-600' :
                index === 2 ? 'bg-purple-600' : 'bg-red-600'
              }`}
              style={{ width: `${candidate.percentage}%` }}
            >
              {candidate.percentage > 7 ? `${candidate.percentage}%` : ''}
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex flex-wrap gap-4">
          {results.map((candidate, index) => (
            <div key={candidate.id} className="flex items-center">
              <div className={`h-4 w-4 rounded-sm mr-2 ${
                index === 0 ? 'bg-blue-600' :
                index === 1 ? 'bg-green-600' :
                index === 2 ? 'bg-purple-600' : 'bg-red-600'
              }`}></div>
              <span className="text-sm">{candidate.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Geographic Distribution (placeholder) */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Geographic Distribution</h2>
        
        <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center text-gray-500">
          <p>Interactive map visualization would be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default ElectionResults;