import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ExamProvider, useExam } from './contexts/ExamContext';
import { Header } from './components/layout/Header';
import { LandingPage } from './pages/LandingPage';
import { CandidateDashboard } from './pages/CandidateDashboard';
import { ExaminerDashboard } from './pages/ExaminerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ExamInterface } from './components/exam/ExamInterface';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const { isExamActive } = useExam();

  // Show exam interface if exam is active
  if (isExamActive) {
    return <ExamInterface />;
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'examiner' && <ExaminerDashboard />}
      {user.role === 'candidate' && <CandidateDashboard />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ExamProvider>
        <AppContent />
      </ExamProvider>
    </AuthProvider>
  );
}

export default App;