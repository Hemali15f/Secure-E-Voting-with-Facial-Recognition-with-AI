import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit2, Trash2, ArrowLeft, User, Flag, Image } from 'lucide-react';

// Mock candidates data
const INITIAL_CANDIDATES = [
  {
    id: 'candidate-1',
    name: 'Arun Sharma',
    party: 'Progressive Party',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Former state minister with 15 years of public service experience.',
    active: true
  },
  {
    id: 'candidate-2',
    name: 'Priya Patel',
    party: 'Democratic Alliance',
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Business leader focused on economic growth and job creation.',
    active: true
  },
  {
    id: 'candidate-3',
    name: 'Rajesh Kumar',
    party: 'National Front',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Community organizer and advocate for rural development.',
    active: true
  },
  {
    id: 'candidate-4',
    name: 'Sunita Verma',
    party: "People's Reform",
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Education reformer and champion for women\'s rights.',
    active: true
  }
];

interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
  bio: string;
  active: boolean;
}

const ManageCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    id: '',
    name: '',
    party: '',
    image: '',
    bio: '',
    active: true
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentCandidate({
      ...currentCandidate,
      [name]: value
    });
  };
  
  const handleAddCandidate = () => {
    setFormMode('add');
    setCurrentCandidate({
      id: `candidate-${Date.now()}`,
      name: '',
      party: '',
      image: '',
      bio: '',
      active: true
    });
    setShowForm(true);
  };
  
  const handleEditCandidate = (id: string) => {
    const candidateToEdit = candidates.find(c => c.id === id);
    if (candidateToEdit) {
      setCurrentCandidate(candidateToEdit);
      setFormMode('edit');
      setShowForm(true);
    }
  };
  
  const handleDeleteCandidate = (id: string) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      setCandidates(candidates.filter(c => c.id !== id));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formMode === 'add') {
      setCandidates([...candidates, currentCandidate]);
    } else {
      setCandidates(candidates.map(c => 
        c.id === currentCandidate.id ? currentCandidate : c
      ));
    }
    
    setShowForm(false);
  };
  
  const handleCancel = () => {
    setShowForm(false);
  };
  
  const toggleActiveStatus = (id: string) => {
    setCandidates(candidates.map(c => 
      c.id === id ? { ...c, active: !c.active } : c
    ));
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link to="/admin" className="flex items-center text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">Manage Candidates</h1>
        </div>
        
        <button 
          onClick={handleAddCandidate}
          className="btn btn-primary flex items-center"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Candidate
        </button>
      </div>
      
      {showForm ? (
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {formMode === 'add' ? 'Add New Candidate' : 'Edit Candidate'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="form-label">Candidate Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full name"
                    className="form-input pl-10"
                    value={currentCandidate.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="party" className="form-label">Political Party</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Flag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="party"
                    name="party"
                    placeholder="Party name"
                    className="form-input pl-10"
                    value={currentCandidate.party}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="image" className="form-label">Image URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    className="form-input pl-10"
                    value={currentCandidate.image}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="bio" className="form-label">Candidate Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  placeholder="Brief description of the candidate"
                  className="form-input"
                  value={currentCandidate.bio}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button 
                type="button"
                onClick={handleCancel}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="btn btn-primary"
              >
                {formMode === 'add' ? 'Add Candidate' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="card p-6 mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Party
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bio
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
                {candidates.map(candidate => (
                  <tr key={candidate.id} className={!candidate.active ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                          <img src={candidate.image} alt={candidate.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{candidate.party}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 truncate max-w-xs">{candidate.bio}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={candidate.active}
                          onChange={() => toggleActiveStatus(candidate.id)} 
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          {candidate.active ? 'Active' : 'Inactive'}
                        </span>
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEditCandidate(candidate.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCandidate(candidate.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                
                {candidates.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No candidates found. Add a candidate to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCandidates;