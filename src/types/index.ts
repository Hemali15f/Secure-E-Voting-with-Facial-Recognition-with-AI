// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  hasVoted: boolean;
  profileImage?: string;
}

// Election related types
export interface Election {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
}

// Candidate related types
export interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
  bio: string;
  active: boolean;
}

// Voting related types
export interface Vote {
  id: string;
  userId: string;
  candidateId: string;
  timestamp: string;
}

// Election result types
export interface CandidateResult extends Candidate {
  votes: number;
  percentage: number;
}

export interface ElectionResult {
  electionId: string;
  totalVotes: number;
  voterTurnout: number;
  candidates: CandidateResult[];
}

// Toast notification types
export type ToastType = 'success' | 'error' | 'info';

export interface ToastState {
  visible: boolean;
  title: string;
  message?: string;
  type: ToastType;
}