
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Building2, DollarSign, TrendingUp, Users, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface BusinessOpportunity {
  id: number;
  business_name: string;
  category: string;
  description: string;
  funding_needed: number;
  equity_offered: number;
  location: string;
  is_local: boolean;
  stage: string;
  employees: number;
  revenue: number;
  growth_rate: number;
  posted_date: string;
}

// Mock data - replace with actual API call
const mockOpportunities: BusinessOpportunity[] = [
  {
    id: 1,
    business_name: "TechStartup Inc.",
    category: "Technology",
    description: "AI-powered customer service platform that helps businesses automate their support operations.",
    funding_needed: 500000,
    equity_offered: 15,
    location: "Nairobi, Kenya",
    is_local: true,
    stage: "Series A",
    employees: 12,
    revenue: 150000,
    growth_rate: 120,
    posted_date: "2024-01-15"
  },
  {
    id: 2,
    business_name: "GreenAgro Solutions",
    category: "Agriculture",
    description: "Sustainable farming solutions using IoT and data analytics to optimize crop yields.",
    funding_needed: 750000,
    equity_offered: 20,
    location: "Nakuru, Kenya",
    is_local: true,
    stage: "Seed",
    employees: 8,
    revenue: 80000,
    growth_rate: 200,
    posted_date: "2024-01-12"
  },
  {
    id: 3,
    business_name: "HealthTech Africa",
    category: "Healthcare",
    description: "Telemedicine platform connecting rural patients with urban healthcare providers.",
    funding_needed: 1000000,
    equity_offered: 25,
    location: "Mombasa, Kenya",
    is_local: true,
    stage: "Series B",
    employees: 25,
    revenue: 300000,
    growth_rate: 85,
    posted_date: "2024-01-10"
  }
];

const BusinessOpportunitiesPage: React.FC = () => {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<BusinessOpportunity[]>(mockOpportunities);
  const [filteredOpportunities, setFilteredOpportunities] = useState<BusinessOpportunity[]>(mockOpportunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [fundingRange, setFundingRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Technology', 'Healthcare', 'Agriculture', 'Finance', 'Education', 'Energy'];
  const fundingRanges = [
    { label: 'Under $100K', value: '0-100000' },
    { label: '$100K - $500K', value: '100000-500000' },
    { label: '$500K - $1M', value: '500000-1000000' },
    { label: 'Over $1M', value: '1000000+' }
  ];

  useEffect(() => {
    let filtered = opportunities;

    if (searchTerm) {
      filtered = filtered.filter(opp => 
        opp.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(opp => opp.category === selectedCategory);
    }

    if (fundingRange) {
      const [min, max] = fundingRange.split('-').map(Number);
      filtered = filtered.filter(opp => {
        if (fundingRange === '1000000+') {
          return opp.funding_needed >= 1000000;
        }
        return opp.funding_needed >= min && opp.funding_needed <= max;
      });
    }

    setFilteredOpportunities(filtered);
  }, [searchTerm, selectedCategory, fundingRange, opportunities]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment Opportunities</h1>
          <p className="text-gray-600">Discover promising businesses looking for investment</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={fundingRange}
                onChange={(e) => setFundingRange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Funding Ranges</option>
                {fundingRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setFundingRange('');
                }}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredOpportunities.length} of {opportunities.length} opportunities
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {opportunity.business_name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Building2 className="h-4 w-4 mr-1" />
                    {opportunity.category}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  opportunity.is_local 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {opportunity.is_local ? 'Local' : 'International'}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {opportunity.description}
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center text-green-600 mb-1">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(opportunity.funding_needed)}
                  </div>
                  <div className="text-xs text-gray-600">Seeking</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-blue-600 mb-1">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {opportunity.equity_offered}%
                  </div>
                  <div className="text-xs text-gray-600">Equity</div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-medium">{formatCurrency(opportunity.revenue)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Growth Rate</span>
                  <span className="font-medium text-green-600">+{opportunity.growth_rate}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Employees</span>
                  <span className="font-medium">{opportunity.employees}</span>
                </div>
              </div>

              {/* Location and Date */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {opportunity.location}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatDate(opportunity.posted_date)}
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                View Details
              </button>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessOpportunitiesPage;
