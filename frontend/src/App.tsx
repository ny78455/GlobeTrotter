import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';

// Auth Components
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

// Dashboard Components
import Dashboard from './components/Dashboard/Dashboard';

// Trip Components
import TripList from './components/Trips/TripList';
import CreateTrip from './components/Trips/CreateTrip';
import ItineraryList from './components/Itenarary/ItineraryList';
import ItineraryDetails from './components/Itenarary/ItineraryDetail';

// Search Components
import CitySearch from './components/Search/CitySearch';

// Budget Components
import BudgetBreakdown from './components/Budget/BudgetBreakdown';
import QuestionsForm from './components/Itenarary/itenarary';

// Profile Components
import UserProfile from './components/Profile/UserProfile';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-center text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips" element={<TripList />} />
          <Route path="/trips/create" element={<CreateTrip />} />
          <Route path="/trips/:id/budget" element={<BudgetBreakdown />} />
          <Route path="/search" element={<CitySearch />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/itinerary" element={<QuestionsForm user={user} />} />
          <Route path="/itinerary/:userId" element={<ItineraryList />} />
          <Route path="/itinerary/:userId/:index" element={<ItineraryDetails />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;