import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { 
  Mail, 
  ArrowRight,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

const OTPVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';
  const userType = location.state?.userType || 'investor';

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      alert('Please enter the complete OTP');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to appropriate dashboard based on user type
      if (userType === 'investor') {
        navigate('/investor-dashboard');
      } else {
        navigate('/business-dashboard');
      }
    }, 1500);
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-600 mx-auto" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Verify Your Email
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  We've sent a 6-digit verification code to
                </p>
                <p className="text-green-600 font-medium">
                  {email}
                </p>
              </div>

              {/* OTP Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">
                    Enter verification code
                  </label>
                  <div className="flex justify-center space-x-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-xl font-bold rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        maxLength={1}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.join('').length !== 6}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Verify & Continue</span>
                    </>
                  )}
                </button>
              </form>

              {/* Resend OTP */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Didn't receive the code?
                </p>
                
                {canResend ? (
                  <button
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className="text-green-600 hover:text-green-700 font-medium flex items-center justify-center space-x-2 mx-auto"
                  >
                    {isResending ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    <span>Resend Code</span>
                  </button>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    Resend code in {timeLeft}s
                  </p>
                )}
              </div>

              {/* Help Text */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> The verification code will expire in 10 minutes. 
                  If you don't see the email, please check your spam folder.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;