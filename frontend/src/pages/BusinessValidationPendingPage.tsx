
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Mail, Phone, FileText, CheckCircle } from 'lucide-react';
import Navigation from '../components/Navigation';

const BusinessValidationPendingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="mx-auto w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-6">
              <Clock className="h-10 w-10 text-yellow-600 dark:text-yellow-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Validation Pending
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Thank you for registering your business! Your application is currently under review by our validation team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Current Status
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Profile submitted successfully</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-yellow-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Document validation in progress</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                  <span className="text-gray-400">Business profile activation</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  <strong>Estimated processing time:</strong> 2-5 business days
                </p>
              </div>
            </motion.div>

            {/* Next Steps Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                What Happens Next?
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Document Review</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Our team will verify your business registration and supporting documents
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Email Notification</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      You'll receive an email with the validation results and next steps
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Dashboard Access</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Once approved, you'll gain full access to your business dashboard
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Need Help? Contact Us
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Email Support</h4>
                <a
                  href="mailto:validation@investwise.com"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  validation@investwise.com
                </a>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-green-600 dark:text-green-500" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Phone Support</h4>
                <a
                  href="tel:+254700000000"
                  className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                >
                  +254 700 000 000
                </a>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-500" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Documentation</h4>
                <a
                  href="/help/validation"
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  View Help Guide
                </a>
              </div>
            </div>
          </motion.div>

          {/* Logout Option */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/';
              }}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
            >
              Sign out and return to homepage
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BusinessValidationPendingPage;
