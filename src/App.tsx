import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { StoreOwnerDashboard } from './components/dashboard/StoreOwnerDashboard';
import { Unauthorized } from './components/common/Unauthorized';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginForm />} />
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              {user?.role === 'SYSTEM_ADMIN' && <AdminDashboard />}
              {user?.role === 'NORMAL_USER' && <UserDashboard />}
              {user?.role === 'STORE_OWNER' && <StoreOwnerDashboard />}
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;