import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { 
  User, 
  TrendingUp, 
  Building2, 
  FileText, 
  MessageCircle,
  Settings,
  Bell,
  Search,
  Filter,
  Heart,
  Star,
  MapPin,
  DollarSign
} from 'lucide-react';

const InvestorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const opportunities = [
    {
      id: 1,
      title: 'Textile Manufacturing Plant',
      location: 'Nairobi Industrial Area',
      investmentRange: '$500K - $2M',
      sector: 'Textile',
      roi: '18-22%',
      riskLevel: 'Medium',
      image: 'https://images.pexels.com/photos/5463459/pexels-photo-5463459.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Modern textile manufacturing facility with export capabilities to East African markets.',
      featured: true
    },
    {
      id: 2,
      title: 'Food Processing Facility',
      location: 'Mombasa',
      investmentRange: '$300K - $1.5M',
      sector: 'Food Processing',
      roi: '15-20%',
      riskLevel: 'Low',
      image: 'https://images.pexels.com/photos/5490965/pexels-photo-5490965.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Established food processing business looking for expansion capital.',
      featured: false
    },
    {
      id: 3,
      title: 'Tech Hardware Assembly',
      location: 'Konza Technopolis',
      investmentRange: '$1M - $5M',
      sector: 'Technology',
      roi: '25-30%',
      riskLevel: 'High',
      image: 'https://images.pexels.com/photos/343457/pexels-photo-343457.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Cutting-edge electronics assembly plant in Kenya\'s Silicon Savannah.',
      featured: true
    }
  ];

  const stats = [
    { label: 'Portfolio Value', value: '$1.2M', change: '+12.5%', positive: true },
    { label: 'Active Investments', value: '8', change: '+2', positive: true },
    { label: 'Total ROI', value: '18.7%', change: '+2.3%', positive: true },
    { label: 'Pending Deals', value: '3', change: '0', positive: null }
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
                  Welcome back, Sarah
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Here's what's happening with your investments today.
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
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
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</span>
                  {stat.positive !== null && (
                    <span className={`text-sm font-medium ${
                      stat.positive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  )}
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
            className="flex space-x-1 mb-8 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-lg"
          >
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'opportunities', label: 'Opportunities', icon: Building2 },
              { id: 'portfolio', label: 'Portfolio', icon: FileText },
              { id: 'messages', label: 'Messages', icon: MessageCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
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
          {activeTab === 'opportunities' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300">Filter</span>
                </button>
              </div>

              {/* Opportunities Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunities.map((opportunity) => (
                  <motion.div
                    key={opportunity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: opportunity.id * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="relative">
                      <img
                        src={opportunity.image}
                        alt={opportunity.title}
                        className="w-full h-48 object-cover"
                      />
                      {opportunity.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                      <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <Heart className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {opportunity.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {opportunity.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <MapPin className="h-4 w-4 mr-2" />
                          {opportunity.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <DollarSign className="h-4 w-4 mr-2" />
                          {opportunity.investmentRange}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-green-600">
                          ROI: {opportunity.roi}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          opportunity.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                          opportunity.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {opportunity.riskLevel} Risk
                        </span>
                      </div>
                      
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                        Express Interest
                      </button>
                    </div>
                  </motion.div>
                ))}
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
              {/* Portfolio Performance */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Portfolio Performance
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  [Interactive Chart Placeholder]
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white font-medium">
                          New opportunity match
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;