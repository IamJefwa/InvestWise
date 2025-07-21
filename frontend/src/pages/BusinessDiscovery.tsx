import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  TrendingUp,
  Building2,
  Users,
  Heart,
  Star,
  Eye,
  Calendar,
  Briefcase,
  Map
} from 'lucide-react';

const BusinessDiscovery: React.FC = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedSector, setSelectedSector] = useState('all');

  const businessOpportunities = [
    {
      id: 1,
      title: 'EcoTextiles Manufacturing',
      description: 'Sustainable textile production facility with export capabilities to European markets.',
      sector: 'Textile',
      location: 'Nairobi Industrial Area',
      investmentRange: '$500K - $2M',
      expectedROI: '18-22%',
      riskLevel: 'Medium',
      businessAge: '3 years',
      employees: 45,
      revenue: '$1.2M annually',
      image: 'https://images.pexels.com/photos/5463459/pexels-photo-5463459.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['Export Ready', 'Eco-Friendly', 'Growing Market'],
      matchScore: 95,
      verified: true
    },
    {
      id: 2,
      title: 'AgriTech Processing Hub',
      description: 'Modern food processing facility specializing in value-added agricultural products.',
      sector: 'Agriculture',
      location: 'Eldoret',
      investmentRange: '$300K - $1.5M',
      expectedROI: '15-20%',
      riskLevel: 'Low',
      businessAge: '5 years',
      employees: 32,
      revenue: '$800K annually',
      image: 'https://images.pexels.com/photos/5490965/pexels-photo-5490965.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['Stable Market', 'Local Sourcing', 'Government Support'],
      matchScore: 88,
      verified: true
    },
    {
      id: 3,
      title: 'Solar Panel Assembly Plant',
      description: 'High-tech facility for assembling solar panels and renewable energy components.',
      sector: 'Energy',
      location: 'Konza Technopolis',
      investmentRange: '$1M - $5M',
      expectedROI: '25-30%',
      riskLevel: 'High',
      businessAge: '2 years',
      employees: 28,
      revenue: '$600K annually',
      image: 'https://images.pexels.com/photos/9875456/pexels-photo-9875456.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['High Growth', 'Tech Innovation', 'Green Energy'],
      matchScore: 92,
      verified: true
    },
    {
      id: 4,
      title: 'Automotive Parts Manufacturing',
      description: 'Precision manufacturing of automotive components for local and regional markets.',
      sector: 'Automotive',
      location: 'Mombasa',
      investmentRange: '$750K - $3M',
      expectedROI: '20-25%',
      riskLevel: 'Medium',
      businessAge: '4 years',
      employees: 67,
      revenue: '$1.8M annually',
      image: 'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['Regional Market', 'Skilled Workforce', 'Quality Standards'],
      matchScore: 85,
      verified: true
    },
    {
      id: 5,
      title: 'Pharmaceutical Manufacturing',
      description: 'FDA-approved facility producing generic medications for African markets.',
      sector: 'Healthcare',
      location: 'Nairobi',
      investmentRange: '$2M - $8M',
      expectedROI: '22-28%',
      riskLevel: 'Medium',
      businessAge: '6 years',
      employees: 89,
      revenue: '$3.2M annually',
      image: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['FDA Approved', 'Growing Demand', 'Regional Expansion'],
      matchScore: 90,
      verified: true
    },
    {
      id: 6,
      title: 'Furniture Manufacturing Co.',
      description: 'Contemporary furniture design and manufacturing with focus on sustainable materials.',
      sector: 'Furniture',
      location: 'Kisumu',
      investmentRange: '$200K - $800K',
      expectedROI: '16-20%',
      riskLevel: 'Low',
      businessAge: '7 years',
      employees: 23,
      revenue: '$450K annually',
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
      highlights: ['Sustainable Materials', 'Design Innovation', 'Export Potential'],
      matchScore: 82,
      verified: true
    }
  ];

  const sectors = [
    { id: 'all', label: 'All Sectors', count: businessOpportunities.length },
    { id: 'Textile', label: 'Textile', count: 1 },
    { id: 'Agriculture', label: 'Agriculture', count: 1 },
    { id: 'Energy', label: 'Energy', count: 1 },
    { id: 'Automotive', label: 'Automotive', count: 1 },
    { id: 'Healthcare', label: 'Healthcare', count: 1 },
    { id: 'Furniture', label: 'Furniture', count: 1 }
  ];

  const filteredOpportunities = selectedSector === 'all' 
    ? businessOpportunities 
    : businessOpportunities.filter(opp => opp.sector === selectedSector);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Discover Your Next
              <span className="block text-green-600">Investment Opportunity</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore vetted manufacturing businesses across Kenya, with detailed insights, financial data, and investment potential analysis.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by business name, location, or sector..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <select className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Investment Range</option>
                  <option>$100K - $500K</option>
                  <option>$500K - $1M</option>
                  <option>$1M - $5M</option>
                  <option>$5M+</option>
                </select>
                
                <select className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Risk Level</option>
                  <option>Low Risk</option>
                  <option>Medium Risk</option>
                  <option>High Risk</option>
                </select>
                
                <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  <Filter className="h-5 w-5" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Sector Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onClick={() => setSelectedSector(sector.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSector === sector.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span>{sector.label}</span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {sector.count}
                </span>
              </button>
            ))}
          </motion.div>

          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-300">
                {filteredOpportunities.length} opportunities found
              </span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Building2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'map' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Map className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Business Opportunities Grid */}
          {viewMode === 'grid' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredOpportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative">
                    <img
                      src={opportunity.image}
                      alt={opportunity.title}
                      className="w-full h-48 object-cover"
                    />
                    
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {opportunity.verified && (
                        <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          ✓ Verified
                        </span>
                      )}
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {opportunity.matchScore}% Match
                      </span>
                    </div>
                    
                    <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {opportunity.title}
                      </h3>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                        {opportunity.sector}
                      </span>
                    </div>
                    
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
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        ROI: {opportunity.expectedROI}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {opportunity.highlights.map((highlight, idx) => (
                        <span key={idx} className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {opportunity.employees}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Employees
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {opportunity.businessAge}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Years Old
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {opportunity.revenue.split(' ')[0]}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Revenue
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-green-600">
                        {opportunity.expectedROI} Expected ROI
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        opportunity.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                        opportunity.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {opportunity.riskLevel} Risk
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </button>
                      
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">
                        Express Interest
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Map View */}
          {viewMode === 'map' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <Map className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Interactive Map View</h3>
                  <p>Explore investment opportunities across Kenya on an interactive map</p>
                  <p className="text-sm mt-2 text-gray-400">[Map integration would be implemented here]</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDiscovery;