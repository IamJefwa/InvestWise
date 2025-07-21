import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import StatCard from '../components/StatCard';
import ROICalculator from '../components/ROICalculator';
import { motion } from 'framer-motion';
import { 
  Building2, 
  FileText, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe,
  MessageCircle,
  Award,
  Star,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Building2,
      title: 'Business Discovery',
      description: 'Find vetted manufacturing opportunities matched to your investment criteria and risk profile.'
    },
    {
      icon: FileText,
      title: 'Legal Compliance',
      description: 'Navigate Kenya\'s regulatory landscape with our comprehensive legal guidance and documentation.'
    },
    {
      icon: TrendingUp,
      title: 'Investment Incentives',
      description: 'Discover government incentives, tax benefits, and special economic zones available for investors.'
    },
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Connect with verified agents, legal experts, and successful business owners in your sector.'
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Complete transactions securely with integrated payment systems and escrow services.'
    },
    {
      icon: Globe,
      title: 'Multi-lingual Support',
      description: 'Access our platform in English, Swahili, and French with localized content and support.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'International Investor',
      content: 'InvestWise helped me identify the perfect manufacturing opportunity in Nairobi. The platform made the entire process transparent and secure.',
      rating: 5
    },
    {
      name: 'James Kimani',
      role: 'Business Owner',
      content: 'Finding investors for my textile business was challenging until I discovered InvestWise. The platform connected me with serious investors quickly.',
      rating: 5
    },
    {
      name: 'Maria Santos',
      role: 'Investment Agent',
      content: 'As an investment agent, InvestWise has streamlined my workflow and helped me close more deals with better matches.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="500+" label="Active Investors" delay={0.1} />
            <StatCard number="250+" label="Verified Businesses" delay={0.2} />
            <StatCard number="$50M+" label="Investments Facilitated" delay={0.3} />
            <StatCard number="15+" label="Sectors Covered" delay={0.4} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Everything You Need to 
              <span className="block text-green-600">Invest Smartly</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools, resources, and connections you need to make informed investment decisions in Kenya's manufacturing sector.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Calculate Your 
              <span className="text-green-600">Investment Returns</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Use our interactive calculator to estimate potential returns on your investment in Kenya's manufacturing sector.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from investors, business owners, and agents who have successfully used InvestWise to grow their portfolios and businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your 
              <span className="block">Investment Journey?</span>
            </h2>
            <p className="text-xl text-gray-100 mb-12 max-w-3xl mx-auto">
              Join thousands of investors who have successfully navigated Kenya's manufacturing sector with InvestWise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/business-discovery"
                className="group bg-white hover:bg-gray-100 text-green-600 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Start Exploring</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/investor-dashboard"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 border-2 border-white/30 hover:border-white/50"
              >
                Investor Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-8 w-8 text-green-500" />
                <span className="text-xl font-bold">InvestWise</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering smart investments in Kenya's manufacturing sector through technology and expertise.
              </p>
              <div className="flex space-x-4">
                <MessageCircle className="h-6 w-6 text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
                <Award className="h-6 w-6 text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/business-discovery" className="hover:text-green-500 transition-colors">Business Discovery</Link></li>
                <li><Link to="/legal-center" className="hover:text-green-500 transition-colors">Legal Center</Link></li>
                <li><Link to="/investor-dashboard" className="hover:text-green-500 transition-colors">Investor Dashboard</Link></li>
                <li><Link to="/business-dashboard" className="hover:text-green-500 transition-colors">Business Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-500 transition-colors">Investment Guide</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Legal Requirements</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Market Research</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 InvestWise. All rights reserved. Powered by innovation in Kenya.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;