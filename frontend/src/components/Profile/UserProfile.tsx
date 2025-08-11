import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Camera, Save, Globe, Heart, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LOCAL_STORAGE_KEY = "userProfileData";

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(
    user?.avatar || 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  );

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    language: 'English',
    bio: 'Travel enthusiast exploring the world one city at a time.',
    location: 'San Francisco, CA',
    avatar: user?.avatar || ''
  });

  // Load from localStorage if available
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      if (parsedData.avatar) {
        setPreviewAvatar(parsedData.avatar);
      }
    }
  }, []);

  const savedDestinations = [
    { id: '1', name: 'Kyoto, Japan', image: 'https://images.pexels.com/photos/1822605/pexels-photo-1822605.jpeg?auto=compress&cs=tinysrgb&w=300', savedDate: '2024-01-15' },
    { id: '2', name: 'Santorini, Greece', image: 'https://images.pexels.com/photos/631522/pexels-photo-631522.jpeg?auto=compress&cs=tinysrgb&w=300', savedDate: '2024-02-01' },
    { id: '3', name: 'Patagonia, Chile', image: 'https://images.pexels.com/photos/1112186/pexels-photo-1112186.jpeg?auto=compress&cs=tinysrgb&w=300', savedDate: '2024-02-20' }
  ];

  const travelStats = [
    { label: 'Countries Visited', value: 12 },
    { label: 'Cities Explored', value: 48 },
    { label: 'Total Trips', value: 15 },
    { label: 'Miles Traveled', value: '87,500' }
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const avatarBase64 = reader.result as string;
        setPreviewAvatar(avatarBase64);
        setFormData((prev) => ({ ...prev, avatar: avatarBase64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Save to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    console.log('Profile saved locally:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-orange-500" />
        <div className="relative px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-20">
            <div className="relative">
              <img
                src={previewAvatar}
                alt={formData.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              {isEditing && (
                <>
                  <input
                    type="file"
                    id="avatarUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <label
                    htmlFor="avatarUpload"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 cursor-pointer"
                  >
                    <Camera className="h-4 w-4" />
                  </label>
                </>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-800">{formData.name}</h1>
              <p className="text-gray-600">{formData.bio}</p>
              <p className="text-sm text-gray-500 mt-1 flex items-center justify-center sm:justify-start">
                <MapPin className="h-4 w-4 mr-1" /> {formData.location}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-orange-600 transition-all"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Travel Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Travel Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {travelStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>
            </div>
            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>
            {isEditing && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-orange-600 transition-all flex items-center justify-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>Save Changes</span>
              </motion.button>
            )}
          </form>
        </motion.div>

        {/* Saved Destinations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Saved Destinations</h2>
            <Heart className="h-5 w-5 text-red-500 fill-current" />
          </div>
          <div className="space-y-4">
            {savedDestinations.map((destination) => (
              <div key={destination.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <img src={destination.image} alt={destination.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{destination.name}</p>
                  <p className="text-sm text-gray-600">Saved on {new Date(destination.savedDate).toLocaleDateString()}</p>
                </div>
                <motion.button whileHover={{ scale: 1.1 }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Heart className="h-4 w-4 fill-current" />
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
