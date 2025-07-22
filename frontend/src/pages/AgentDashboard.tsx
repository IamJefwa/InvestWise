import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { 
  MessageCircle, 
  Users, 
  TrendingUp, 
  FileText, 
  Bell,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Phone,
  Video
} from 'lucide-react';

const AgentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('matches');

  const activeMatches = [
    {
      id: 1,
      investor: 'Sarah Chen',
      business: 'EcoTextiles Manufacturing',
      stage: 'negotiating',
      amount: '$500,000',
      lastActivity: '2 hours ago',
      priority: 'high',
      nextAction: 'Schedule due diligence meeting'
    },
    {
      id: 2,
      investor: 'Michael Rodriguez',
      business: 'Agro Processing Ltd',
      stage: 'initial_contact',
      amount: '$750,000',
      lastActivity: '1 day ago',
      priority: 'medium',
      nextAction: 'Send business documentation'
    },
    {
      id: 3,
      investor: 'Emma Thompson',
      business: 'Solar Panel Assembly',
      stage: 'due_diligence',
      amount: '$300,000',
      lastActivity: '3 hours ago',
      priority: 'high',
      nextAction: 'Review financial statements'
    }
  ];

  const agentStats = [
    { label: 'Active Matches', value: '12', change: '+3', positive: true },
    { label: 'Completed Deals', value: '8', change: '+2', positive: true },
    { label: 'Total Commission', value: '$45K', change: '+12%', positive: true },
    { label: 'Success Rate', value: '78%', change: '+5%', positive: true }
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: 'Due Diligence Review',
      participants: 'Sarah Chen, EcoTextiles Manufacturing',
      time: '2:00 PM',
      date: 'Today',
      type: 'video'
    },
    {
      id: 2,
      title: 'Initial Investment Discussion',
      participants: 'Michael Rodriguez, Agro Processing',
      time: '10:00 AM',
      date: 'Tomorrow',
      type: 'phone'
    },
    {
      id: 3,
      title: 'Contract Finalization',
      participants: 'Emma Thompson, Solar Panel Assembly',
      time: '3:30 PM',
      date: 'Jan 18',
      type: 'video'
    }
  ];

  const recentMessages = [
    {
      id: 1,
      from: 'Sarah Chen',
      subject: 'Questions about financial projections',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      from: 'EcoTextiles Manufacturing',
      subject: 'Updated business documentation',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      from: 'Michael Rodriguez',
      subject: 'Meeting reschedule request',
      time: '2 hours ago',
      unread: false
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
                  Agent Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage investor-business matches and facilitate successful deals.
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Schedule Meeting</span>
                </button>
                <button className="relative p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
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
            {agentStats.map((stat, index) => (
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
              { id: 'matches', label: 'Active Matches', icon: Users },
              { id: 'messages', label: 'Messages', icon: MessageCircle },
              { id: 'meetings', label: 'Meetings', icon: Calendar },
              { id: 'performance', label: 'Performance', icon: TrendingUp }
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
          {activeTab === 'matches' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Active Matches */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Active Matches
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Manage ongoing investor-business connections
                    </p>
                  </div>
                  
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {activeMatches.map((match) => (
                      <motion.div
                        key={match.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: match.id * 0.1 }}
                        className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              match.priority === 'high' ? 'bg-red-500' :
                              match.priority === 'medium' ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}></div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {match.investor} → {match.business}
                            </h4>
                          </div>
                          
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            match.stage === 'negotiating' ? 'bg-yellow-100 text-yellow-800' :
                            match.stage === 'initial_contact' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {match.stage.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                          <div>
                            <span className="font-medium">Investment Amount:</span> {match.amount}
                          </div>
                          <div>
                            <span className="font-medium">Last Activity:</span> {match.lastActivity}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Next Action:</span> {match.nextAction}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors">
                              <MessageCircle className="h-4 w-4" />
                            </button>
                            <button className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors">
                              <Phone className="h-4 w-4" />
                            </button>
                            <button className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg transition-colors">
                              <Video className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upcoming Meetings */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Upcoming Meetings
                </h3>
                
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {meeting.title}
                        </h4>
                        {meeting.type === 'video' ? (
                          <Video className="h-4 w-4 text-purple-600" />
                        ) : (
                          <Phone className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {meeting.participants}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {meeting.date} at {meeting.time}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors">
                  Schedule New Meeting
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Messages
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Stay connected with investors and business owners
                </p>
              </div>
              
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {recentMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: message.id * 0.1 }}
                    className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                      message.unread ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {message.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {message.from}
                        </h4>
                      </div>
                      
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {message.time}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300">
                      {message.subject}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-6 bg-gray-50 dark:bg-gray-700">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors">
                  View All Messages
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'performance' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Performance Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Performance Overview
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  [Performance Chart Placeholder]
                </div>
              </div>
              
              {/* Achievement Badges */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Achievements
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Top Performer</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Highest success rate this quarter</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Revenue Champion</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Generated $45K in commissions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Users className="h-8 w-8 text-purple-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Master Matchmaker</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Successfully matched 50+ connections</p>
                    </div>
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

export default AgentDashboard;