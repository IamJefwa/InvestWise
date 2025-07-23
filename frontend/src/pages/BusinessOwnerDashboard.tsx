import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  FileText, 
  Upload,
  CheckCircle,
  Clock,
  MessageCircle,
  Settings,
  Bell,
  Eye,
  DollarSign
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const BusinessOwnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const investorInterests = [
    {
      id: 1,
      investorName: 'Sarah Chen',
      company: 'Global Investment Partners',
      amount: '$500,000',
      status: 'pending',
      date: '2025-01-15',
      interest: 'Full Acquisition'
    },
    {
      id: 2,
      investorName: 'Michael Rodriguez',
      company: 'African Growth Fund',
      amount: '$750,000',
      status: 'negotiating',
      date: '2025-01-14',
      interest: 'Expansion Capital'
    },
    {
      id: 3,
      investorName: 'Emma Thompson',
      company: 'Sustainable Ventures',
      amount: '$300,000',
      status: 'approved',
      date: '2025-01-12',
      interest: 'Strategic Partnership'
    }
  ];

  const businessStats = [
    { label: 'Business Valuation', value: '$2.5M', change: '+15%', positive: true },
    { label: 'Investor Views', value: '847', change: '+23', positive: true },
    { label: 'Active Interests', value: '12', change: '+4', positive: true },
    { label: 'Completion Rate', value: '92%', change: '+5%', positive: true }
  ];

  const documents = [
    { name: 'Business Registration Certificate', status: 'approved', date: '2025-01-10' },
    { name: 'Financial Statements (2024)', status: 'approved', date: '2025-01-08' },
    { name: 'Tax Compliance Certificate', status: 'pending', date: '2025-01-15' },
    { name: 'Environmental Impact Assessment', status: 'approved', date: '2025-01-05' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  EcoTextiles Manufacturing
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage your business profile and connect with potential investors.
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Update Profile
                </button>
                <button className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                  <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {businessStats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</span>
                  <span className={`text-sm font-medium ${
                    stat.positive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex space-x-1 mb-8 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-lg overflow-x-auto"
          >
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'interests', label: 'Investor Interests', icon: Users },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'messages', label: 'Messages', icon: MessageCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          {activeTab === 'interests' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Investor Interests
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Manage and respond to investor inquiries
                  </p>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {investorInterests.map((interest) => (
                    <motion.div
                      key={interest.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: interest.id * 0.1 }}
                      className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {interest.investorName}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              interest.status === 'approved' ? 'bg-green-100 text-green-800' :
                              interest.status === 'negotiating' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {interest.status.charAt(0).toUpperCase() + interest.status.slice(1)}
                            </span>
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 mb-1">
                            {interest.company}
                          </p>

                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {interest.amount}
                            </span>
                            <span>{interest.interest}</span>
                            <span>{interest.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 mt-4 md:mt-0">
                          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                          </button>

                          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span>Chat</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'documents' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Upload Section */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Upload Documents
                  </h3>

                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Drag and drop files here
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      or click to select files
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
                      Choose Files
                    </button>
                  </div>
                </div>

                {/* Document List */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Uploaded Documents
                    </h3>
                  </div>

                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {documents.map((doc, index) => (
                      <div key={index} className="p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <FileText className="h-8 w-8 text-gray-400" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {doc.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Uploaded on {doc.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {doc.status === 'approved' ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle className="h-5 w-5 mr-1" />
                              Approved
                            </span>
                          ) : (
                            <span className="flex items-center text-yellow-600">
                              <Clock className="h-5 w-5 mr-1" />
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Requirements Sidebar */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 h-fit">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Required Documents
                </h3>

                <div className="space-y-4">
                  {[
                    'Business Registration Certificate',
                    'Tax Compliance Certificate',
                    'Financial Statements (Last 3 Years)',
                    'Environmental Impact Assessment',
                    'Insurance Certificates',
                    'Operational Permits'
                  ].map((requirement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {requirement}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>Pro Tip:</strong> Complete your document verification to increase investor confidence and improve your matching score.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Business Performance */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Business Performance
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  [Business Analytics Chart Placeholder]
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <button 
                    onClick={() => navigate('/profile')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-left transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Settings className="h-6 w-6" />
                      <div>
                        <div className="font-medium">Update Profile</div>
                        <div className="text-sm opacity-90">Keep your information current</div>
                      </div>
                    </div>
                  </button>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-left transition-colors">
                    <div className="flex items-center space-x-3">
                      <Upload className="h-6 w-6" />
                      <div>
                        <div className="font-medium">Upload Documents</div>
                        <div className="text-sm opacity-90">Add required verification</div>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-left transition-colors">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-6 w-6" />
                      <div>
                        <div className="font-medium">Contact Support</div>
                        <div className="text-sm opacity-90">Get help with your profile</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessOwnerDashboard;