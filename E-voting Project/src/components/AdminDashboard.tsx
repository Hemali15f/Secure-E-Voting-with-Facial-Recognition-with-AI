import React, { useContext } from 'react';
import { BarChart3, Users, Clock, AlertTriangle } from 'lucide-react';
import { VotingContext } from '../App';

interface VoterInfo {
  name: string;
  voterId: string;
  email: string;
  party: string;
  timestamp: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const { isVotingActive, setVotingActive, setVotingEnded, votes } = useContext(VotingContext);

  // Mock voter data - in a real app this would come from your backend
  const [voterInfo] = React.useState<VoterInfo[]>([
    {
      name: "John Doe",
      voterId: "VOT123456",
      email: "john@example.com",
      party: "Party A",
      timestamp: "2024-03-15 14:30:22"
    },
    {
      name: "Jane Smith",
      voterId: "VOT789012",
      email: "jane@example.com",
      party: "Party B",
      timestamp: "2024-03-15 14:45:15"
    }
  ]);

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  const toggleVoting = () => {
    if (isVotingActive) {
      setVotingEnded(true);
    }
    setVotingActive(!isVotingActive);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">
          Voting Status: {isVotingActive ? (
            <span className="text-green-600 font-semibold">Active</span>
          ) : (
            <span className="text-red-600 font-semibold">Inactive</span>
          )}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Users className="h-8 w-8 text-blue-600 mb-2" />
          <div className="text-2xl font-bold">{voterInfo.length}</div>
          <div className="text-gray-600">Total Voters</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <BarChart3 className="h-8 w-8 text-green-600 mb-2" />
          <div className="text-2xl font-bold">{totalVotes}</div>
          <div className="text-gray-600">Total Votes Cast</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Clock className="h-8 w-8 text-orange-600 mb-2" />
          <div className="text-2xl font-bold">2:30:45</div>
          <div className="text-gray-600">Time Remaining</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <AlertTriangle className="h-8 w-8 text-red-600 mb-2" />
          <div className="text-2xl font-bold">0</div>
          <div className="text-gray-600">Security Alerts</div>
        </div>
      </div>

      {/* Voting Control */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Voting Control</h2>
        <button
          onClick={toggleVoting}
          className={`px-6 py-3 rounded-lg text-white font-semibold ${
            isVotingActive
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isVotingActive ? 'End Voting' : 'Start Voting'}
        </button>
      </div>

      {/* Live Results */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Live Results</h2>
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-600">{totalVotes}</div>
          <div className="text-gray-600">Total Votes Cast</div>
        </div>
        <div className="space-y-4">
          {Object.entries(votes).map(([party, count]) => (
            <div key={party}>
              <div className="flex justify-between mb-1">
                <span>{party}</span>
                <span>{count} votes ({totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : 0}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${totalVotes > 0 ? (count / totalVotes) * 100 : 0}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Voter Information */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Voter Information</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Voter ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Voted For
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {voterInfo.map((voter, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{voter.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{voter.voterId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{voter.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{voter.party}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{voter.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;