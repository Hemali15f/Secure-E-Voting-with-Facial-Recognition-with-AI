import React from 'react';
import { CheckCircle as checkCircle } from 'lucide-react';

interface CandidateProps {
  id: string;
  name: string;
  party: string;
  image: string;
  selected?: boolean;
  votes?: number;
  percentage?: number;
  onClick?: (id: string) => void;
  showResults?: boolean;
}

const CandidateCard: React.FC<CandidateProps> = ({
  id,
  name,
  party,
  image,
  selected = false,
  votes,
  percentage,
  onClick,
  showResults = false
}) => {
  const handleClick = () => {
    if (onClick && !showResults) {
      onClick(id);
    }
  };

  return (
    <div 
      className={`
        card transition-all duration-300 hover:shadow-lg
        ${selected ? 'ring-2 ring-blue-500 shadow-md' : 'hover:scale-105'}
        ${showResults ? 'cursor-default' : 'cursor-pointer'}
        ${selected && !showResults ? 'vote-confirm' : ''}
      `}
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={`${name} - ${party}`} 
          className="w-full h-48 object-cover object-center"
        />
        {selected && !showResults && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="inline-block px-2 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded">
            {party}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        
        {showResults && (
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{votes} votes</span>
              <span className="font-bold text-blue-600">{percentage}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-value" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {!showResults && (
          <div className="mt-3">
            <button 
              className={`w-full ${selected ? 'btn-accent' : 'btn-outline'}`}
              onClick={handleClick}
            >
              {selected ? 'Selected' : 'Select Candidate'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;