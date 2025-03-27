import React, { useContext } from 'react';
import { Vote, CheckCircle, BarChart3 } from 'lucide-react';
import { VotingContext } from '../App';

interface CandidateDashboardProps {
  onLogout: () => void;
}

const CandidateDashboard: React.FC<CandidateDashboardProps> = () => {
  const { isVotingActive, isVotingEnded, votes, setVotes } = useContext(VotingContext);
  const [hasVoted, setHasVoted] = React.useState(false);
  const [selectedParty, setSelectedParty] = React.useState<string | null>(null);

  const handleVote = (party: string) => {
    setSelectedParty(party);
  };

  const confirmVote = () => {
    if (selectedParty) {
      setVotes({
        ...votes,
        [selectedParty]: votes[selectedParty] + 1
      });
      setHasVoted(true);
    }
  };

  if (isVotingEnded) {
    return (
      <div className="space-y-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Voting has ended</h2>
          <p className="text-gray-600 mb-8">Thank you for participating in the election.</p>
          
          <h3 className="text-xl font-semibold mb-4">Final Results</h3>
          <div className="space-y-4">
            {Object.entries(votes).map(([party, count]) => (
              <div key={party}>
                <div className="flex justify-between mb-1">
                  <span>{party}</span>
                  <span>{count} votes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${(count / Object.values(votes).reduce((a, b) => a + b, 0)) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isVotingActive) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Voting is not active</h2>
        <p className="text-gray-600">Please wait for the administrator to start the voting process.</p>
      </div>
    );
  }

  if (hasVoted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank you for voting!</h2>
        <p className="text-gray-600">Your vote has been securely recorded.</p>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Current Results</h3>
          <div className="space-y-4">
            {Object.entries(votes).map(([party, count]) => (
              <div key={party}>
                <div className="flex justify-between mb-1">
                  <span>{party}</span>
                  <span>{count} votes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${(count / Object.values(votes).reduce((a, b) => a + b, 0)) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Cast Your Vote</h1>
        <p className="text-gray-600">Select your preferred party below</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {Object.keys(votes).map((party) => (
          <button
            key={party}
            onClick={() => handleVote(party)}
            className={`p-6 rounded-xl border-2 transition-all ${
              selectedParty === party
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <Vote className={`h-12 w-12 mx-auto mb-4 ${
              selectedParty === party ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <h3 className="text-lg font-semibold mb-2">{party}</h3>
            <p className="text-sm text-gray-600">Click to select this party</p>
          </button>
        ))}
      </div>

      {selectedParty && (
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <p className="text-lg mb-4">
            You have selected: <strong>{selectedParty}</strong>
          </p>
          <button
            onClick={confirmVote}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Confirm Vote
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard