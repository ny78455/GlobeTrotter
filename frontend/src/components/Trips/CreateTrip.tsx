import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Calendar, MapPin, FileText, DollarSign, IndianRupeeIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Types
interface Trip {
  id: string;
  name: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  image: string;
  cities: number;
  status: string;
}

// Local storage helpers
const getTrips = (): Trip[] => {
  const trips = localStorage.getItem('trips');
  return trips ? JSON.parse(trips) : [];
};

const saveTrip = (trip: Trip) => {
  const trips = getTrips();
  trips.push(trip); // Keep older trips
  localStorage.setItem('trips', JSON.stringify(trips));
};

const CreateTrip: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    coverImage: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newTrip: Trip = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      destination: formData.name, // You can add a separate destination field if needed
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: parseFloat(formData.budget || '0'),
      image: formData.coverImage || 'https://via.placeholder.com/400',
      cities: 1,
      status: 'planning',
    };

    saveTrip(newTrip);
    setIsLoading(false);

    navigate('/trips');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/trips">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="p-2 bg-white rounded-lg shadow-lg text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Create New Trip</h1>
          <p className="text-gray-600">Start planning your next adventure</p>
        </div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Name *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your trip name (e.g., Tokyo Adventure)"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe your trip plans, goals, or theme..."
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget (Rupee)
            </label>
            <div className="relative">
              <IndianRupeeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                min="0"
                step="50"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your total budget"
              />
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors relative">
              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt="Cover Preview"
                  className="mx-auto mb-4 max-h-48 object-contain rounded"
                />
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">PNG, JPG, GIF up to 10MB</p>
                </>
              )}

              <label
                htmlFor="coverImageInput"
                className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
              >
                {formData.coverImage ? 'Change Cover Image' : 'Upload a cover image'}
              </label>
              <input
                id="coverImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Link to="/trips" className="text-gray-600 hover:text-gray-800 font-medium">
              Cancel
            </Link>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create Trip'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateTrip;
