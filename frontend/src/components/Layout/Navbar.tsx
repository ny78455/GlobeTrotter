import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, User, Map,Book, Calendar, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: Map },
    { to: '/trips', label: 'My Trips', icon: Calendar },
    { to: '/search', label: 'Explore', icon: Plane },
    { to: '/itinerary', label: 'Itinerary', icon: Book },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-600 to-orange-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-white bg-opacity-20 p-2 rounded-lg"
            >
              <Plane className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-white">GlobeTrotter</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              
              return (
                <Link key={item.to} to={item.to}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-white bg-opacity-20 text-white' 
                        : 'text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
                alt={user?.name}
                className="h-8 w-8 rounded-full border-2 border-white border-opacity-30"
              />
              <span className="text-white font-medium">{user?.name}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link to="/profile">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-lg bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all"
                >
                  <Settings className="h-4 w-4" />
                </motion.div>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={logout}
                className="p-2 rounded-lg bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all"
              >
                <LogOut className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;