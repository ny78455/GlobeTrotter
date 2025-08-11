import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  MapPin,
  Calendar,
  Edit3,
  Trash2,
  Eye,
  Grid,
  List,
} from "lucide-react";
import { Link } from "react-router-dom";

// Trip type
interface Trip {
  id: string;
  name: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  image: string;
  budget: number;
  cities: number;
  status: "upcoming" | "planning" | "completed" | string;
}

// ✅ Default trips for first load
const defaultTrips: Trip[] = [
  {
    id: "1",
    name: "Tokyo Adventure",
    description: "Exploring the vibrant culture and cuisine of Japan",
    destination: "Tokyo, Japan",
    startDate: "2024-12-15",
    endDate: "2024-12-22",
    image:
      "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400",
    budget: 3500,
    cities: 3,
    status: "upcoming",
  },
  {
    id: "2",
    name: "European Journey",
    description: "A grand tour through historic European cities",
    destination: "Paris, Rome, Barcelona",
    startDate: "2025-03-10",
    endDate: "2025-03-25",
    image:
      "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=400",
    budget: 5000,
    cities: 5,
    status: "planning",
  },
  {
    id: "3",
    name: "Southeast Asia Explorer",
    description: "Backpacking through Thailand, Vietnam, and Cambodia",
    destination: "Bangkok, Ho Chi Minh, Siem Reap",
    startDate: "2024-08-01",
    endDate: "2024-08-20",
    image:
      "https://images.pexels.com/photos/1659437/pexels-photo-1659437.jpeg?auto=compress&cs=tinysrgb&w=400",
    budget: 2800,
    cities: 6,
    status: "completed",
  },
];

const TripList: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [trips, setTrips] = useState<Trip[]>([]);

  // Load trips from localStorage or initialize defaults
  useEffect(() => {
    const storedTrips = localStorage.getItem("trips");
    if (storedTrips) {
      setTrips(JSON.parse(storedTrips));
    } else {
      localStorage.setItem("trips", JSON.stringify(defaultTrips));
      setTrips(defaultTrips);
    }
  }, []);

  // Delete Trip handler
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      const updatedTrips = trips.filter((trip) => trip.id !== id);
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      setTrips(updatedTrips);
    }
  };

  // Map status to color classes
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "planning":
        return "bg-orange-100 text-orange-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Trips</h1>
          <p className="text-gray-600">Manage and view all your travel plans</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Toggle */}
          <div className="flex items-center bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              aria-label="Grid view"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <Link to="/trips/create">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-orange-600 transition-all flex items-center space-x-2 shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>New Trip</span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Trips Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {trips.length > 0 ? (
          trips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all ${
                viewMode === "list" ? "flex items-center" : ""
              }`}
            >
              <div
                className={`relative ${viewMode === "list" ? "w-48 h-32" : ""}`}
              >
                <img
                  src={trip.image}
                  alt={trip.name}
                  className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                    viewMode === "list" ? "w-full h-full" : "w-full h-48"
                  }`}
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                      trip.status
                    )}`}
                  >
                    {trip.status}
                  </span>
                </div>
              </div>

              <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div
                  className={
                    viewMode === "list" ? "flex items-center justify-between" : ""
                  }
                >
                  <div className={viewMode === "list" ? "flex-1" : ""}>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {trip.name}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {trip.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {trip.destination}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(trip.startDate).toLocaleDateString()} -{" "}
                        {new Date(trip.endDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>{trip.cities} cities</span>
                      <span className="font-semibold">
                        ${trip.budget.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-center space-x-2 ${
                      viewMode === "list" ? "ml-6" : "justify-between"
                    }`}
                  >
                    <Link to={`/trips/${trip.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        aria-label={`View details of ${trip.name}`}
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                    </Link>

                    <Link to={`/trips/${trip.id}/edit`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                        aria-label={`Edit ${trip.name}`}
                      >
                        <Edit3 className="h-4 w-4" />
                      </motion.button>
                    </Link>

                    <motion.button
                      onClick={() => handleDelete(trip.id)}
                      whileHover={{ scale: 1.1 }}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      aria-label={`Delete ${trip.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No trips yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start planning your next adventure!
            </p>
            <Link to="/trips/create">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Create Your First Trip
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TripList;
