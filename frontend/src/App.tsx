import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import AgentDashboard from './pages/AgentDashboard';
import ProfileSetupPage from './pages/ProfileSetupPage';
import BusinessOpportunitiesPage from './pages/BusinessOpportunitiesPage';
import BusinessValidationPage from './pages/BusinessValidationPage';
import BusinessValidationPendingPage from './pages/BusinessValidationPendingPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import InvestorDashboard from './pages/InvestorDashboard';
import BusinessOwnerDashboard from './pages/BusinessOwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BusinessDiscovery from './pages/BusinessDiscovery';
import LegalCenter from './pages/LegalCenter';


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/verify-otp" element={<OTPVerificationPage />} />
              
              <Route path="/profile-setup" element={<ProfileSetupPage />} />
              <Route path="/business-opportunities" element={<BusinessOpportunitiesPage />} />
              <Route path="/business-validation" element={<BusinessValidationPage />} />
              <Route path="/business-validation-pending" element={<BusinessValidationPendingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/investor-dashboard" element={<InvestorDashboard />} />
              <Route path="/business-owner-dashboard" element={
                <ProtectedRoute requiresValidation={true}>
                  <BusinessOwnerDashboard />
                </ProtectedRoute>
              } />


              <Route path="/agent-dashboard" element={<AgentDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/business-discovery" element={<BusinessDiscovery />} />
              <Route path="/legal-center" element={<LegalCenter />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;