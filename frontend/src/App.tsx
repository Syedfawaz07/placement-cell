import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Layout
import MainLayout from './components/layout/MainLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<div>Students Page</div>} />
            <Route path="/companies" element={<div>Companies Page</div>} />
            <Route path="/jobs" element={<div>Jobs Page</div>} />
            <Route path="/interviews" element={<div>Interviews Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Route>
          
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Catch all route */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Router>
      
      {/* Toast notifications */}
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;