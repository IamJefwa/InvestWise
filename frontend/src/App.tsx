import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import InvestorDashboard from './pages/InvestorDashboard';
import BusinessOwnerDashboard from './pages/BusinessOwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AgentDashboard from './pages/AgentDashboard';
import LegalCenter from './pages/LegalCenter';
import BusinessDiscovery from './pages/BusinessDiscovery';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-otp" element={<OTPVerificationPage />} />
            <Route path="/investor-dashboard" element={<InvestorDashboard />} />
            <Route path="/business-dashboard" element={<BusinessOwnerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
            <Route path="/legal-center" element={<LegalCenter />} />
            <Route path="/business-discovery" element={<BusinessDiscovery />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;