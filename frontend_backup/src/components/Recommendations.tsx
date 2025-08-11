import React from 'react';
import { ArrowLeft, Star, Clock, DollarSign, MapPin } from 'lucide-react';
import type { TravelPreferences, TripRecommendation } from '../types';

interface RecommendationsProps {
  preferences: TravelPreferences;
  onBack: () => void;
  onSelectItinerary: () => void;
}

export const Recommendations: React.FC<RecommendationsProps> = ({ 
  preferences, 
  onBack, 
  onSelectItinerary 
}) => {
  // Mock recommendations based on preferences
  const recommendations: TripRecommendation[] = [
    {
      id: '1',
      destination: 'Varanasi Cultural Experience',
      duration: '4 Days, 3 Nights',
      budget: '₹25,000',
      highlights: ['All major temples', 'Ganga Aarti ceremony', 'Traditional cuisine', 'Heritage walks'],
      image: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      destination: 'Rajasthan Royal Heritage',
      duration: '6 Days, 5 Nights',
      budget: '₹45,000',
      highlights: ['Majestic palaces', 'Desert safari', 'Royal dining', 'Cultural shows'],
      image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      destination: 'Kerala Backwaters',
      duration: '5 Days, 4 Nights',
      budget: '₹35,000',
      highlights: ['Houseboat cruise', 'Spice plantations', 'Ayurvedic treatments', 'Local cuisine'],
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-colors duration-500 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Planner
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Perfect Trips for You</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Based on your preferences: {preferences.destinations.join(', ')} • {preferences.groupSize} {preferences.groupSize === 1 ? 'person' : 'people'} • {preferences.budget} budget
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recommendation, index) => (
            <div
              key={recommendation.id}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={recommendation.image}
                  alt={recommendation.destination}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">4.8</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                  {recommendation.destination}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{recommendation.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">{recommendation.budget}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gradient-to-r from-teal-500/10 to-blue-600/10 text-teal-700 dark:text-teal-300 text-xs rounded-full border border-teal-200 dark:border-teal-700"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onSelectItinerary}
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <MapPin className="h-4 w-4" />
                  View Detailed Itinerary
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};