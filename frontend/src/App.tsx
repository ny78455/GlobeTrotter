import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import PlanTrip from "./components/PlanTrip";
import ItineraryList from "./components/ItineraryList";

function App() {
  const [user, setUser] = useState<any>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <AuthPage setUser={setUser} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
        <Route path="/plan-trip" element={user ? <PlanTrip user={user} /> : <Navigate to="/" />} />
        <Route path="/itineraries" element={user ? <ItineraryList user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
