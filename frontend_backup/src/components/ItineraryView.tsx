import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  Wifi, 
  Car, 
  Train,
  Plane,
  Hotel,
  UtensilsCrossed
} from 'lucide-react';
import type { Itinerary } from '../types';

interface ItineraryViewProps {
  onBack: () => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({ onBack }) => {
  const [activeDay, setActiveDay] = useState(1);

  // Mock itinerary data
  const itinerary: Itinerary = {
    id: '1',
    destination: 'Varanasi Cultural Experience',
    days: [
      {
        day: 1,
        activities: [
          {
            time: '08:00',
            title: 'Arrival & Check-in',
            description: 'Arrive at hotel and freshen up',
            category: 'accommodation'
          },
          {
            time: '10:00',
            title: 'Kashi Vishwanath Temple',
            description: 'Visit the golden temple of Lord Shiva',
            category: 'temple'
          },
          {
            time: '14:00',
            title: 'Traditional Lunch',
            description: 'Authentic Banarasi cuisine at local restaurant',
            category: 'food'
          },
          {
            time: '17:00',
            title: 'Dashashwamedh Ghat',
            description: 'Witness the famous Ganga Aarti ceremony',
            category: 'cultural'
          }
        ]
      },
      {
        day: 2,
        activities: [
          {
            time: '06:00',
            title: 'Morning Boat Ride',
            description: 'Sunrise boat ride on the Ganges',
            category: 'experience'
          },
          {
            time: '09:00',
            title: 'Sankat Mochan Temple',
            description: 'Temple dedicated to Lord Hanuman',
            category: 'temple'
          },
          {
            time: '12:00',
            title: 'BHU Campus Visit',
            description: 'Explore Banaras Hindu University',
            category: 'cultural'
          },
          {
            time: '15:00',
            title: 'Shopping at Godowlia',
            description: 'Buy silk sarees and local handicrafts',
            category: 'shopping'
          }
        ]
      }
    ],
    hotels: [
      {
        name: 'Heritage Hotel Varanasi',
        rating: 4.5,
        price: '₹3,500/night',
        image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    transportation: [
      {
        type: 'Flight',
        from: 'Delhi',
        to: 'Varanasi',
        price: '₹4,500'
      },
      {
        type: 'Cab',
        from: 'Airport',
        to: 'Hotel',
        price: '₹800'
      }
    ]
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'temple': return <MapPin className="h-4 w-4" />;
      case 'food': return <UtensilsCrossed className="h-4 w-4" />;
      case 'accommodation': return <Hotel className="h-4 w-4" />;
      case 'cultural': return <Calendar className="h-4 w-4" />;
      case 'experience': return <Star className="h-4 w-4" />;
      case 'shopping': return <MapPin className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'temple': return 'from-orange-400 to-red-500';
      case 'food': return 'from-green-400 to-emerald-500';
      case 'accommodation': return 'from-blue-400 to-cyan-500';
      case 'cultural': return 'from-purple-400 to-pink-500';
      case 'experience': return 'from-yellow-400 to-orange-500';
      case 'shopping': return 'from-teal-400 to-blue-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'Flight': return <Plane className="h-5 w-5" />;
      case 'Train': return <Train className="h-5 w-5" />;
      case 'Cab': return <Car className="h-5 w-5" />;
      default: return <Car className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-colors duration-500 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Recommendations
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            {itinerary.destination}
          </h1>
          <p className="text-slate-600 dark:text-slate-300">Your complete travel itinerary</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Itinerary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Day Navigation */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20 dark:border-slate-700/50">
              <div className="flex gap-2 overflow-x-auto">
                {itinerary.days.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setActiveDay(day.day)}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 ${
                      activeDay === day.day
                        ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Day Activities */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                Day {activeDay} Activities
              </h2>
              
              <div className="space-y-4">
                {itinerary.days.find(d => d.day === activeDay)?.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl border border-white/20 dark:border-slate-600/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(activity.category)} text-white`}>
                        {getCategoryIcon(activity.category)}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                          {activity.time}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hotel Information */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                Accommodation
              </h3>
              {itinerary.hotels.map((hotel, index) => (
                <div key={index} className="space-y-4">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-1">
                      {hotel.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {hotel.rating}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-white">
                        {hotel.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-slate-600 dark:text-slate-300">
                      <Wifi className="h-4 w-4" />
                      <span className="text-xs">Free WiFi</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Transportation */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                Transportation
              </h3>
              <div className="space-y-3">
                {itinerary.transportation.map((transport, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-700/50 rounded-xl"
                  >
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg text-white">
                      {getTransportIcon(transport.type)}
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">
                        {transport.from} → {transport.to}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {transport.type}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-white">
                      {transport.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Trip Button */}
            <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
              Book This Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};