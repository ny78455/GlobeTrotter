import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DollarSign, TrendingUp, AlertTriangle, PiggyBank } from 'lucide-react';

const BudgetBreakdown: React.FC = () => {
  const budgetData = [
    { name: 'Transportation', value: 1200, color: '#3B82F6' },
    { name: 'Accommodation', value: 1800, color: '#10B981' },
    { name: 'Food & Dining', value: 800, color: '#F59E0B' },
    { name: 'Activities', value: 600, color: '#8B5CF6' },
    { name: 'Shopping', value: 400, color: '#EF4444' },
    { name: 'Other', value: 200, color: '#6B7280' }
  ];

  const monthlySpending = [
    { month: 'Jan', planned: 2000, actual: 1850 },
    { month: 'Feb', planned: 1500, actual: 1720 },
    { month: 'Mar', planned: 2200, actual: 2100 },
    { month: 'Apr', planned: 1800, actual: 1950 },
    { month: 'May', planned: 2500, actual: 2680 },
    { month: 'Jun', planned: 1200, actual: 1100 }
  ];

  const totalBudget = 5000;
  const totalSpent = budgetData.reduce((sum, item) => sum + item.value, 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetUsagePercentage = (totalSpent / totalBudget) * 100;

  const isOverBudget = totalSpent > totalBudget;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Trip Budget Overview</h1>
        <p className="text-gray-600">Track your expenses and stay within budget</p>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Budget</p>
              <p className="text-2xl font-bold text-gray-800">${totalBudget.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <PiggyBank className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-gray-800">${totalSpent.toLocaleString()}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Remaining</p>
              <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(remainingBudget).toLocaleString()}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${remainingBudget >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <TrendingUp className={`h-6 w-6 ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Budget Used</p>
              <p className={`text-2xl font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-800'}`}>
                {budgetUsagePercentage.toFixed(1)}%
              </p>
            </div>
            <div className={`p-3 rounded-lg ${isOverBudget ? 'bg-red-100' : 'bg-purple-100'}`}>
              <AlertTriangle className={`h-6 w-6 ${isOverBudget ? 'text-red-600' : 'text-purple-600'}`} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Over Budget Alert */}
      {isOverBudget && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Budget Exceeded</h3>
              <p className="text-red-600">
                You're ${Math.abs(remainingBudget).toLocaleString()} over your planned budget. 
                Consider adjusting your expenses or increasing your budget.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Expense Breakdown</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: $${value}`}
                >
                  {budgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Spending Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySpending}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, '']} />
                <Legend />
                <Bar dataKey="planned" fill="#3B82F6" name="Planned" />
                <Bar dataKey="actual" fill="#F59E0B" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Detailed Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">Category Details</h3>
        <div className="space-y-4">
          {budgetData.map((category, index) => {
            const percentage = (category.value / totalSpent) * 100;
            return (
              <div key={category.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{category.name}</p>
                    <p className="text-sm text-gray-600">{percentage.toFixed(1)}% of total</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">${category.value.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">spent</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default BudgetBreakdown;