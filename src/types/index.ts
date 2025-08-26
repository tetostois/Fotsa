export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  birthDate: string;
  birthPlace: string;
  city: string;
  country: string;
  profession: string;
  role: 'admin' | 'examiner' | 'candidate';
  isActive: boolean;
  createdAt: string;
  hasPaid?: boolean;
  examTaken?: boolean;
  score?: number;
  certificate?: string;
  level?: 'debutant' | 'intermediaire' | 'expert';
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
  isActive: boolean;
  price: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text';
  options?: string[];
  correctAnswer?: string | number;
  points: number;
}

export interface ExamSubmission {
  id: string;
  candidateId: string;
  examId: string;
  answers: Answer[];
  submittedAt: string;
  score?: number;
  feedback?: string;
  correctedBy?: string;
  correctedAt?: string;
  status: 'pending' | 'corrected' | 'rejected';
}

export interface Answer {
  questionId: string;
  value: string | number;
}

export interface Payment {
  id: string;
  candidateId: string;
  amount: number;
  method: 'stripe' | 'cinetpay';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  createdAt: string;
}

export interface Certificate {
  id: string;
  candidateId: string;
  examId: string;
  score: number;
  issuedAt: string;
  certificateUrl: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  isLoading: boolean;
}