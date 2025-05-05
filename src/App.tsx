import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManageCandidates from './pages/ManageCandidates';
import ElectionResults from './pages/ElectionResults';
import Vote from './pages/Vote';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              
              {/* Protected User Routes */}
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="vote" element={
                <ProtectedRoute>
                  <Vote />
                </ProtectedRoute>
              } />
              
              {/* Protected Admin Routes */}
              <Route path="admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="admin/candidates" element={
                <AdminRoute>
                  <ManageCandidates />
                </AdminRoute>
              } />
              <Route path="admin/results" element={
                <AdminRoute>
                  <ElectionResults />
                </AdminRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;