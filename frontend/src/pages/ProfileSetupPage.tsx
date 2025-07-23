
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Building2, MapPin, Phone, Mail, Save, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

interface Sector {
  id: number;
  name: string;
  description: string;
}

const ProfileSetupPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    contact_info: '',
    address_info: '',
    is_local: true,
    interests: [] as number[],
    business_name: '',
    category: 0
  });

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const sectorsData = await apiService.getSectors();
        setSectors(sectorsData);
      } catch (error) {
        console.error('Failed to fetch sectors:', error);
      }
    };

    fetchSectors();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleInterestToggle = (sectorId: number) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(sectorId)
        ? prev.interests.filter(id => id !== sectorId)
        : [...prev.interests, sectorId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
      
      if (user?.is_investor) {
        navigate('/investor-dashboard');
      } else {
        navigate('/business-validation-pending');
      }
    } catch (error) {
      console.error('Profile setup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              {user.is_investor ? <User className="h-8 w-8 text-blue-600" /> : <Building2 className="h-8 w-8 text-blue-600" />}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600">
              {user.is_investor ? 'Set up your investor profile to discover opportunities' : 'Set up your business profile to attract investors'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline h-4 w-4 mr-2" />
                Contact Information
              </label>
              <input
                type="text"
                name="contact_info"
                value={formData.contact_info}
                onChange={handleInputChange}
                placeholder="Phone number, email, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Address Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-2" />
                Address Information
              </label>
              <textarea
                name="address_info"
                value={formData.address_info}
                onChange={handleInputChange}
                placeholder="Your address details"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Local Business/Investor */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_local"
                checked={formData.is_local}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                {user.is_investor ? 'I am a local investor' : 'I am a local business'}
              </label>
            </div>

            {/* Business Name (for business owners) */}
            {!user.is_investor && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="inline h-4 w-4 mr-2" />
                  Business Name
                </label>
                <input
                  type="text"
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleInputChange}
                  placeholder="Your business name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {/* Sectors/Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                {user.is_investor ? 'Investment Interests' : 'Business Category'}
              </label>
              
              {user.is_investor ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sectors.map((sector) => (
                    <div
                      key={sector.id}
                      onClick={() => handleInterestToggle(sector.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.interests.includes(sector.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{sector.name}</div>
                      <div className="text-xs text-gray-600">{sector.description}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value={0}>Select a category</option>
                  {sectors.map((sector) => (
                    <option key={sector.id} value={sector.id}>
                      {sector.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Complete Setup</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
