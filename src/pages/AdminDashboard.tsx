import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, BarChart, Settings, Calendar, Clock } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock data
  const [stats] = useState({
    registeredVoters: 12458,
    votesSubmitted: 8973,
    voterTurnout: 72
  });
  
  const [activities] = useState([
    { id: 1, action: 'New voter registered', time: '10 minutes ago', user: 'Amit Patel' },
    { id: 2, action: 'New voter registered', time: '25 minutes ago', user: 'Sakshi Sharma' },
    { id: 3, action: 'Vote submitted', time: '1 hour ago', user: 'Rahul Kumar' },
    { id: 4, action: 'Vote submitted', time: '2 hours ago', user: 'Priya Singh' },
    { id: 5, action: 'Vote submitted', time: '3 hours ago', user: 'Vikram Mehta' }
  ]);
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-start">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Registered Voters</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.registeredVoters.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-start">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Votes Submitted</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.votesSubmitted.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-start">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <BarChart className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Voter Turnout</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.voterTurnout}%</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Current Election */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Current Election</h2>
          <Link to="/admin/results" className="btn btn-outline text-sm">View Results</Link>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">General Elections 2025</h3>
          <div className="flex flex-wrap gap-6 mt-3">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-gray-700">August 15, 2025</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-gray-700">In Progress</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-blue-800 font-medium">Election Status</p>
                <p className="text-sm text-blue-700">Polls are currently open for voting</p>
              </div>
              
              <div className="flex space-x-3">
                <Link to="/admin/candidates" className="btn btn-primary">
                  Manage Candidates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          
          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity.id} className="flex items-start border-b border-gray-100 pb-3 last:border-0">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <div className="flex flex-wrap text-sm text-gray-500 gap-x-4 mt-1">
                    <span>{activity.time}</span>
                    <span>by {activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-blue-600 hover:text-blue-800 text-sm">
              View All Activity
            </button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          
          <div className="space-y-3">
            <Link to="/admin/candidates" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Manage Candidates</h3>
                <p className="text-sm text-gray-600">Add, edit, or remove candidates</p>
              </div>
            </Link>
            
            <Link to="/admin/results" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <BarChart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">View Election Results</h3>
                <p className="text-sm text-gray-600">See real-time voting data</p>
              </div>
            </Link>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Settings className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">System Settings</h3>
                <p className="text-sm text-gray-600">Configure election parameters</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <Calendar className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium">Schedule New Election</h3>
                <p className="text-sm text-gray-600">Set up the next election event</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Verification Queue */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Verification Queue</h2>
        <p className="text-gray-600 mb-4">
          New voters waiting for verification approval
        </p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                      <img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Profile" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Neha Desai</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">August 1, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">neha.desai@example.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                  <button className="text-red-600 hover:text-red-900">Reject</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                      <img src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Profile" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Aryan Mehta</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">July 30, 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">aryan.mehta@example.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                  <button className="text-red-600 hover:text-red-900">Reject</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;