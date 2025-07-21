import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

const ROICalculator: React.FC = () => {
  const [investment, setInvestment] = useState(100000);
  const [period, setPeriod] = useState(5);
  const [sector, setSector] = useState('manufacturing');

  const sectorMultipliers = {
    manufacturing: 1.15,
    agriculture: 1.12,
    technology: 1.25,
    energy: 1.18
  };

  const calculateROI = () => {
    const baseReturn = investment * Math.pow(1.08, period);
    const sectorMultiplier = sectorMultipliers[sector as keyof typeof sectorMultipliers];
    const totalReturn = baseReturn * sectorMultiplier;
    const profit = totalReturn - investment;
    const roiPercentage = ((profit / investment) * 100).toFixed(1);
    
    return {
      totalReturn: totalReturn.toLocaleString(),
      profit: profit.toLocaleString(),
      roiPercentage
    };
  };

  const results = calculateROI();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="h-8 w-8 text-green-600" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          ROI Calculator
        </h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Investment Amount (USD)
            </label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Investment Period (Years)
            </label>
            <input
              type="number"
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sector
            </label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="manufacturing">Manufacturing</option>
              <option value="agriculture">Agriculture</option>
              <option value="technology">Technology</option>
              <option value="energy">Energy</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 dark:text-gray-300">Projected Return</span>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              ${results.totalReturn}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 dark:text-gray-300">Estimated Profit</span>
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              ${results.profit}
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">ROI</div>
            <div className="text-2xl font-bold text-green-600">
              {results.roiPercentage}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ROICalculator;