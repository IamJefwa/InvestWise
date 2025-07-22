import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { 
  FileText, 
  Download, 
  Search, 
  Filter,
  BookOpen,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
  Info,
  ExternalLink,
  Scale
} from 'lucide-react';

const LegalCenter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const legalDocuments = [
    {
      id: 1,
      title: 'Business Registration Guide',
      category: 'registration',
      description: 'Complete guide to registering a manufacturing business in Kenya',
      type: 'PDF',
      pages: 24,
      downloadUrl: '#',
      updated: '2025-01-10'
    },
    {
      id: 2,
      title: 'Tax Incentives for Manufacturers',
      category: 'taxation',
      description: 'Overview of available tax benefits and incentives for manufacturing sector',
      type: 'PDF',
      pages: 18,
      downloadUrl: '#',
      updated: '2025-01-08'
    },
    {
      id: 3,
      title: 'Environmental Compliance Checklist',
      category: 'environmental',
      description: 'Environmental requirements and compliance procedures for manufacturing',
      type: 'PDF',
      pages: 12,
      downloadUrl: '#',
      updated: '2025-01-05'
    },
    {
      id: 4,
      title: 'Foreign Investment Regulations',
      category: 'investment',
      description: 'Legal framework for foreign investors in Kenya\'s manufacturing sector',
      type: 'PDF',
      pages: 32,
      downloadUrl: '#',
      updated: '2025-01-03'
    },
    {
      id: 5,
      title: 'Labor Law Requirements',
      category: 'labor',
      description: 'Employment laws and worker rights in manufacturing operations',
      type: 'PDF',
      pages: 28,
      downloadUrl: '#',
      updated: '2024-12-28'
    },
    {
      id: 6,
      title: 'Intellectual Property Protection',
      category: 'ip',
      description: 'Guide to protecting intellectual property in manufacturing',
      type: 'PDF',
      pages: 16,
      downloadUrl: '#',
      updated: '2024-12-25'
    }
  ];

  const legalRequirements = [
    {
      title: 'Business Registration',
      status: 'required',
      description: 'Register your business with the Registrar of Companies',
      steps: 5,
      timeline: '2-3 weeks'
    },
    {
      title: 'Tax Registration',
      status: 'required',
      description: 'Obtain PIN and VAT registration from KRA',
      steps: 3,
      timeline: '1 week'
    },
    {
      title: 'Environmental Impact Assessment',
      status: 'conditional',
      description: 'Required for manufacturing operations above certain thresholds',
      steps: 7,
      timeline: '2-6 months'
    },
    {
      title: 'Investment License',
      status: 'required',
      description: 'Obtain investment license from KenInvest',
      steps: 4,
      timeline: '2-4 weeks'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Documents' },
    { id: 'registration', label: 'Business Registration' },
    { id: 'taxation', label: 'Taxation' },
    { id: 'environmental', label: 'Environmental' },
    { id: 'investment', label: 'Investment' },
    { id: 'labor', label: 'Labor Law' },
    { id: 'ip', label: 'Intellectual Property' }
  ];

  const filteredDocuments = activeCategory === 'all' 
    ? legalDocuments 
    : legalDocuments.filter(doc => doc.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Legal & Compliance 
              <span className="block text-green-600">Resource Center</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Navigate Kenya's legal framework with comprehensive guides, requirements checklists, and expert assistance for manufacturing investments.
            </p>
          </motion.div>

          {/* Quick Requirements Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Legal Requirements Overview
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {legalRequirements.map((requirement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {requirement.status === 'required' ? (
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    ) : (
                      <Info className="h-6 w-6 text-yellow-600" />
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      requirement.status === 'required' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {requirement.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {requirement.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {requirement.description}
                  </p>
                  
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{requirement.steps} steps</span>
                    <span>{requirement.timeline}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Document Library */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
                Document Library
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <button className="flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300">Filter</span>
                </button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Documents Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((document, index) => (
                <motion.div
                  key={document.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                      {document.type}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {document.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {document.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{document.pages} pages</span>
                    <span>Updated {document.updated}</span>
                  </div>
                  
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Legal Chatbot Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center"
          >
            <Scale className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Legal Assistance?
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Get instant answers to your legal questions with our AI-powered legal assistant, or connect with verified legal experts for personalized guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-green-600 font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Chat with Legal AI</span>
              </button>
              
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center space-x-2 border-2 border-white/30 hover:border-white/50">
                <ExternalLink className="h-5 w-5" />
                <span>Connect with Expert</span>
              </button>
            </div>
          </motion.div>

          {/* Footer Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Legal Guides
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Step-by-step guides for common legal procedures and requirements.
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Browse Guides →
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Compliance Tracker
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Track your compliance status and get reminders for renewals.
              </p>
              <button className="text-green-600 hover:text-green-700 font-medium">
                Start Tracking →
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <MessageCircle className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Expert Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Connect with verified legal professionals for personalized advice.
              </p>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Get Support →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LegalCenter;