import React, { useState } from 'react';
import { TripPlanner } from './TripPlanner';
import { Recommendations } from './Recommendations';
import { ItineraryView } from './ItineraryView';
import { 
  MapPin, 
  Mountain, 
  Waves, 
  Trees, 
  Sun, 
  UtensilsCrossed,
  Globe,
  Compass,
  Calendar,
  Users
} from 'lucide-react';
import type { User, TravelPreferences } from '../types';

interface DashboardProps {
  user: User;
}

type View = 'dashboard' | 'planner' | 'recommendations' | 'itinerary';

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [preferences, setPreferences] = useState<TravelPreferences | null>(null);

  const destinations = [
    { name: 'Mountains', icon: Mountain, color: 'from-green-400 to-blue-500' },
    { name: 'Beaches', icon: Waves, color: 'from-blue-400 to-cyan-300' },
    { name: 'Rainforest', icon: Trees, color: 'from-green-500 to-emerald-600' },
    { name: 'Deserts', icon: Sun, color: 'from-yellow-400 to-orange-500' },
  ];

  const cuisines = [
    { name: 'North Indian', flag: '🇮🇳', color: 'from-orange-400 to-red-500' },
    { name: 'South Indian', flag: '🇮🇳', color: 'from-green-400 to-yellow-500' },
    { name: 'Italian', flag: '🇮🇹', color: 'from-red-500 to-green-500' },
    { name: 'Chinese', flag: '🇨🇳', color: 'from-red-600 to-yellow-400' },
  ];

  const handlePlannerSubmit = (prefs: TravelPreferences) => {
    setPreferences(prefs);
    setCurrentView('recommendations');
  };

  if (currentView === 'planner') {
    return <TripPlanner onSubmit={handlePlannerSubmit} onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'recommendations' && preferences) {
    return (
      <Recommendations 
        preferences={preferences} 
        onBack={() => setCurrentView('planner')}
        onSelectItinerary={() => setCurrentView('itinerary')}
      />
    );
  }

  if (currentView === 'itinerary') {
    return <ItineraryView onBack={() => setCurrentView('recommendations')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                  Welcome back, {user.name}! 🌍
                </h1>
                <p className="text-slate-600 dark:text-slate-300">Ready to plan your next adventure?</p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Globe className="h-5 w-5" />
                  <span className="text-sm">Destinations: 1200+</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Happy Travelers: 50K+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setCurrentView('planner')}
            className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white p-6 rounded-3xl shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Compass className="h-8 w-8" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-1">Plan New Trip</h3>
                <p className="text-white/80">AI-powered trip recommendations</p>
              </div>
              <div className="ml-auto">
                <div className="p-2 bg-white/20 rounded-full group-hover:translate-x-1 transition-transform duration-300">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
            </div>
          </button>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white p-6 rounded-3xl shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <MapPin className="h-8 w-8" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-1">My Trips</h3>
                <p className="text-white/80">View and manage your journeys</p>
              </div>
              <div className="ml-auto">
                <div className="p-2 bg-white/20 rounded-full group-hover:translate-x-1 transition-transform duration-300">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Destination Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Explore Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destinations.map((dest, index) => (
              <div
                key={dest.name}
                className={`bg-gradient-to-br ${dest.color} p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  <div className="p-3 bg-white/20 rounded-2xl mb-3 mx-auto w-fit">
                    <dest.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold">{dest.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cuisine Preferences */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Culinary Adventures</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cuisines.map((cuisine, index) => (
              <div
                key={cuisine.name}
                className={`bg-gradient-to-br ${cuisine.color} p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{cuisine.flag}</div>
                  <h3 className="text-white font-semibold">{cuisine.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};