import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const features = [
    { icon: TrendingUp, label: 'Investment Opportunities' },
    { icon: Shield, label: 'Legal Compliance' },
    { icon: Users, label: 'Expert Guidance' }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(34, 197, 94, 0.8), rgba(59, 130, 246, 0.6)), url('https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Explore Kenya's
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Manufacturing Future
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover vetted business opportunities, navigate legal requirements, and unlock investment incentives in Kenya's thriving manufacturing sector.
          </p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white"
              >
                <feature.icon className="h-5 w-5" />
                <span className="font-medium">{feature.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/business-discovery"
              className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Start Exploring Opportunities</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              to="/investor-dashboard"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 border-2 border-white/30 hover:border-white/50"
            >
              Investor Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;