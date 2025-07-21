import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  FileText, 
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Shield,
  Settings,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const pendingBusinesses = [
    {
      id: 1,
      name: 'Green Energy Solutions',
      owner: 'David Mwangi',
      sector: 'Renewable Energy',
      location: 'Nakuru',
      submissionDate: '2025-01-15',
      documents: 8,
      completeness: 95
    },
    {
      id: 2,
      name: 'Agro Processing Ltd',
      owner: 'Grace Wanjiku',
      sector: 'Agriculture',
      location: 'Eldoret',
      submissionDate: '2025-01-14',
      documents: 6,
      completeness: 80
    },
    {
      id: 3,
      name: 'Tech Assembly Hub',
      owner: 'Samuel Ochieng',
      sector: 'Technology',
      location: 'Konza',
      submissionDate: '2025-01-13',
      documents: 10,
      completeness: 100
    }
  ];

  const systemStats = [
    { label: 'Total Users', value: '2,847', change: '+127', positive: true },
    { label: 'Active Businesses', value: '456', change: '+23', positive: true },
    { label: 'Completed Deals', value: '89', change: '+12', positive: true },
    { label: 'Platform Revenue', value: '$125K', change: '+18%', positive: true }
  ];

  const recentTransactions = [
    {
      id: 1,
      investor: 'Sarah Chen',
      business: 'EcoTextiles Manufacturing',
      amount: '$500,000',
      status: 'completed',
      date: '2025-01-15',
      fee: '$2,500'
    },
    {
      id: 2,
      investor: 'Michael Rodriguez',
      business: 'Food Processing Co.',
      amount: '$750,000',
      status: 'processing',
      date: '2025-01-14',
      fee: '$3,750'
    },
    {
      id: 3,
      investor: 'Emma Thompson',
      business: 'Solar Panel Assembly',
      amount: '$300,000',
      status: 'pending',
      date: '2025-01-13',
      fee: '$1,500'
    }
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
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage platform operations, users, and business approvals.
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  System Alerts (3)
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
            {systemStats.map((stat, index) => (
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
              { id: 'approvals', label: 'Business Approvals', icon: Building2 },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'transactions', label: 'Transactions', icon: DollarSign },
              { id: 'security', label: 'Security', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          {activeTab === 'approvals' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search pending businesses..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300">Filter</span>
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Pending Business Approvals
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Review and approve new business registrations
                  </p>
                </div>
                
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {pendingBusinesses.map((business) => (
                    <motion.div
                      key={business.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: business.id * 0.1 }}
                      className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {business.name}
                            </h4>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pending Review
                            </span>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                            <div>
                              <span className="font-medium">Owner:</span> {business.owner}
                            </div>
                            <div>
                              <span className="font-medium">Sector:</span> {business.sector}
                            </div>
                            <div>
                              <span className="font-medium">Location:</span> {business.location}
                            </div>
                            <div>
                              <span className="font-medium">Submitted:</span> {business.submissionDate}
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600 dark:text-gray-300">Document Completeness</span>
                              <span className="font-medium text-gray-900 dark:text-white">{business.completeness}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${business.completeness}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 mt-4 lg:mt-0 lg:ml-6">
                          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <FileText className="h-4 w-4" />
                            <span>Review ({business.documents})</span>
                          </button>
                          
                          <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                            <XCircle className="h-4 w-4" />
                            <span>Reject</span>
                          </button>
                          
                          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                            <CheckCircle className="h-4 w-4" />
                            <span>Approve</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'transactions' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Recent Transactions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Monitor platform transactions and fees
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Transaction
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Platform Fee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {transaction.investor}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                → {transaction.business}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {transaction.amount}
                          </td>
                          <td className="px-6 py-4 text-green-600 font-medium">
                            {transaction.fee}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                              transaction.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                            {transaction.date}
                          </td>
                          <td className="px-6 py-4">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                              <MoreVertical className="h-4 w-4 text-gray-500" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              {/* System Analytics */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Platform Analytics
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  [System Analytics Chart Placeholder]
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  System Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">API Status</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Database</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      Healthy
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Payment Gateway</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Email Service</span>
                    <span className="flex items-center text-yellow-600">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></div>
                      Delayed
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;