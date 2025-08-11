import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Star, Plus, Filter } from 'lucide-react';

const CitySearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    maxCost: 5,
    minPopularity: 0
  });

  const cities = [
    {
      id: '1',
      name: 'Tokyo',
      country: 'Japan',
      description: 'A bustling metropolis blending tradition with modernity',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400',
      costIndex: 4,
      popularity: 9.2,
      highlights: ['Sushi', 'Temples', 'Shopping', 'Technology']
    },
    {
      id: '2',
      name: 'Paris',
      country: 'France',
      description: 'The city of love with iconic landmarks and rich culture',
      image: 'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=400',
      costIndex: 4,
      popularity: 9.5,
      highlights: ['Art', 'Fashion', 'Cuisine', 'Architecture']
    },
    {
      id: '3',
      name: 'Bangkok',
      country: 'Thailand',
      description: 'Vibrant street life, ornate shrines, and bustling markets',
      image: 'https://images.pexels.com/photos/1659437/pexels-photo-1659437.jpeg?auto=compress&cs=tinysrgb&w=400',
      costIndex: 2,
      popularity: 8.7,
      highlights: ['Street Food', 'Temples', 'Markets', 'Nightlife']
    },
    {
      id: '4',
      name: 'Reykjavik',
      country: 'Iceland',
      description: 'Gateway to natural wonders and Nordic culture',
      image: 'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=400',
      costIndex: 5,
      popularity: 8.1,
      highlights: ['Northern Lights', 'Geysers', 'Blue Lagoon', 'Culture']
    },
    {
      id: '5',
      name: 'Dubai',
      country: 'UAE',
      description: 'Luxury shopping, ultramodern architecture, and desert adventures',
      image: 'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=400',
      costIndex: 4,
      popularity: 8.9,
      highlights: ['Shopping', 'Architecture', 'Desert', 'Luxury']
    },
    {
      id: '6',
      name: 'Bali',
      country: 'Indonesia',
      description: 'Tropical paradise with beaches, temples, and rice terraces',
      image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=400',
      costIndex: 2,
      popularity: 9.0,
      highlights: ['Beaches', 'Temples', 'Rice Terraces', 'Culture']
    }
  ];

  const getCostLabel = (cost: number) => {
    const labels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
    return labels[cost - 1];
  };

  const getCostColor = (cost: number) => {
    const colors = ['text-green-600', 'text-green-500', 'text-yellow-500', 'text-orange-500', 'text-red-500'];
    return colors[cost - 1];
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Explore Cities</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover amazing destinations around the world and add them to your travel plans
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cities or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <select
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Countries</option>
              <option value="Japan">Japan</option>
              <option value="France">France</option>
              <option value="Thailand">Thailand</option>
              <option value="Iceland">Iceland</option>
              <option value="UAE">UAE</option>
              <option value="Indonesia">Indonesia</option>
            </select>

            <select
              value={filters.maxCost}
              onChange={(e) => setFilters({ ...filters, maxCost: parseInt(e.target.value) })}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={5}>Any Budget</option>
              <option value={2}>Budget Friendly</option>
              <option value={3}>Moderate</option>
              <option value={4}>Premium</option>
              <option value={5}>Luxury</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map((city, index) => (
          <motion.div
            key={city.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all"
          >
            <div className="relative">
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{city.popularity}</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{city.name}</h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {city.country}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${getCostColor(city.costIndex)}`}>
                    {getCostLabel(city.costIndex)}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <DollarSign className="h-3 w-3" />
                    {Array.from({ length: city.costIndex }, (_, i) => (
                      <DollarSign key={i} className="h-3 w-3" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {city.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {city.highlights.slice(0, 3).map((highlight) => (
                  <span
                    key={highlight}
                    className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
                {city.highlights.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    +{city.highlights.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-orange-500 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-orange-600 transition-all flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add to Trip</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCities.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No cities found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </motion.div>
      )}
    </div>
  );
};

export default CitySearch;