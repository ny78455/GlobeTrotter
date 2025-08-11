import React, { useState } from 'react';
import { ArrowLeft, Users, DollarSign, MapPin, Calendar } from 'lucide-react';
import type { TravelPreferences } from '../types';

interface TripPlannerProps {
  onSubmit: (preferences: TravelPreferences) => void;
  onBack: () => void;
}

export const TripPlanner: React.FC<TripPlannerProps> = ({ onSubmit, onBack }) => {
  const [preferences, setPreferences] = useState<TravelPreferences>({
    destinations: [],
    cuisines: [],
    budget: '',
    groupSize: 1
  });

  const destinationOptions = ['Mountains', 'Beaches', 'Cities', 'Rainforest', 'Deserts', 'Cultural Sites'];
  const cuisineOptions = ['North Indian', 'South Indian', 'Italian', 'Chinese', 'Thai', 'Mexican'];
  const budgetOptions = [
    { value: 'budget', label: 'Budget (₹10K-25K)', color: 'from-green-400 to-emerald-500' },
    { value: 'moderate', label: 'Moderate (₹25K-50K)', color: 'from-blue-400 to-cyan-500' },
    { value: 'luxury', label: 'Luxury (₹50K+)', color: 'from-purple-400 to-pink-500' }
  ];

  const handleDestinationToggle = (destination: string) => {
    setPreferences(prev => ({
      ...prev,
      destinations: prev.destinations.includes(destination)
        ? prev.destinations.filter(d => d !== destination)
        : [...prev.destinations, destination]
    }));
  };

  const handleCuisineToggle = (cuisine: string) => {
    setPreferences(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter(c => c !== cuisine)
        : [...prev.cuisines, cuisine]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (preferences.destinations.length > 0 && preferences.budget) {
      onSubmit(preferences);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-colors duration-500 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Plan Your Perfect Trip</h1>
            <p className="text-slate-600 dark:text-slate-300">Tell us your preferences and we'll create the perfect itinerary</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Group Size */}
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white mb-4">
                <Users className="h-5 w-5" />
                How many people?
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setPreferences(prev => ({ ...prev, groupSize: Math.max(1, prev.groupSize - 1) }))}
                  className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300"
                >
                  -
                </button>
                <span className="text-2xl font-semibold text-slate-800 dark:text-white min-w-[3rem] text-center">
                  {preferences.groupSize}
                </span>
                <button
                  type="button"
                  onClick={() => setPreferences(prev => ({ ...prev, groupSize: prev.groupSize + 1 }))}
                  className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Budget Selection */}
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white mb-4">
                <DollarSign className="h-5 w-5" />
                What's your budget?
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {budgetOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPreferences(prev => ({ ...prev, budget: option.value }))}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      preferences.budget === option.value
                        ? `bg-gradient-to-r ${option.color} text-white border-transparent shadow-lg scale-105`
                        : 'bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Preferences */}
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white mb-4">
                <MapPin className="h-5 w-5" />
                What type of destinations interest you?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {destinationOptions.map((destination) => (
                  <button
                    key={destination}
                    type="button"
                    onClick={() => handleDestinationToggle(destination)}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      preferences.destinations.includes(destination)
                        ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white border-transparent shadow-lg'
                        : 'bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500'
                    }`}
                  >
                    {destination}
                  </button>
                ))}
              </div>
            </div>

            {/* Cuisine Preferences */}
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white mb-4">
                <Calendar className="h-5 w-5" />
                Preferred cuisines?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {cuisineOptions.map((cuisine) => (
                  <button
                    key={cuisine}
                    type="button"
                    onClick={() => handleCuisineToggle(cuisine)}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      preferences.cuisines.includes(cuisine)
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white border-transparent shadow-lg'
                        : 'bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={preferences.destinations.length === 0 || !preferences.budget}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed"
            >
              Get AI Recommendations
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};