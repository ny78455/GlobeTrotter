import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, MapPin, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Trip type (make sure to keep this consistent with your TripList)
interface Trip {
  id: string;
  name: string;
  description?: string;
  destination: string;
  startDate: string;
  endDate: string;
  image: string;
  budget: number;
  spent?: number;
  status?: string;
}

const recommendedDestinations = [
  {
    id: "1",
    name: "Goa, Goa",
    image: "https://assets.serenity.co.uk/38000-38999/38650/720x480.jpg",
    price: "From ₹8000",
  },
  {
    id: "2",
    name: "New Delhi",
    image:
      "https://media.istockphoto.com/id/1206421561/photo/sunset-traffic-in-new-delhi-tuc-tuc-cars-on-the-road-to-the-presidential-residance.jpg?s=612x612&w=0&k=20&c=nkzqRzuGGumrisj4ovnq5nunC1zoWwtGtRztOGPE3ko=",
    price: "From ₹4000",
  },
  {
    id: "3",
    name: "Jaipur, Rajasthan",
    image:
      "https://media.istockphoto.com/id/903877840/photo/the-crowd-and-vehicles-in-front-of-hawa-mahal.jpg?s=612x612&w=0&k=20&c=OB7q3UQsf0vpcno_6-6WLFhp3Ugota3B5IH3WdFYhUY=",
    price: "From ₹5000",
  },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const storedTrips = localStorage.getItem("trips");
    if (storedTrips) {
      setTrips(JSON.parse(storedTrips));
    }
  }, []);

  const totalTrips = trips.length;
  const totalBudget = trips.reduce((acc, trip) => acc + trip.budget, 0);
  const countriesVisited = 1;

  // Show all trips in upcoming section regardless of status
  const upcomingTrips = trips;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}! ✈️
            </h1>
            <p className="text-blue-100">Ready to plan your next adventure?</p>
          </div>
          <Link to="/trips/create">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Plan New Trip</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Trips</p>
              <p className="text-2xl font-bold text-gray-800">{totalTrips}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Countries Visited</p>
              <p className="text-2xl font-bold text-gray-800">{countriesVisited}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-800">₹{totalBudget.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Trips */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Trips</h2>
          <Link to="/trips" className="text-blue-600 hover:text-blue-800 font-medium">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingTrips.length ? (
            upcomingTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all"
              >
                <div className="relative">
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                    {new Date(trip.startDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{trip.name}</h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {trip.destination}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Budget: ₹{trip.budget}</div>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      ₹{trip.spent ?? trip.budget} spent
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600">No trips planned yet.</p>
          )}
        </div>
      </div>

      {/* Recommended Destinations */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">{destination.name}</h3>
                  <p className="text-sm opacity-90">{destination.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
