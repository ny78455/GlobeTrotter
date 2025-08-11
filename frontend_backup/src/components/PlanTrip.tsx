import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PlanTrip({ user }: { user: any }) {
  const [form, setForm] = useState({
    budget: "",
    age: "",
    placeTypes: "",
    location: "",
    cuisines: "",
  });
  const navigate = useNavigate();

  const savePreferences = async () => {
    try {
      await axios.post("http://localhost:5000/api/preferences", {
        user_id: user.id,
        budget: form.budget,
        age: form.age,
        placeTypes: form.placeTypes.split(","),
        location: form.location,
        cuisines: form.cuisines.split(","),
      });
      navigate("/itineraries");
    } catch (err: any) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Plan Your Trip</h2>
      <input className="border p-2 w-full mb-3" placeholder="Budget" onChange={(e) => setForm({ ...form, budget: e.target.value })} />
      <input className="border p-2 w-full mb-3" placeholder="Age" onChange={(e) => setForm({ ...form, age: e.target.value })} />
      <input className="border p-2 w-full mb-3" placeholder="Place Types (comma separated)" onChange={(e) => setForm({ ...form, placeTypes: e.target.value })} />
      <input className="border p-2 w-full mb-3" placeholder="Location" onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <input className="border p-2 w-full mb-3" placeholder="Cuisines (comma separated)" onChange={(e) => setForm({ ...form, cuisines: e.target.value })} />
      <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={savePreferences}>
        Generate Itinerary
      </button>
    </div>
  );
}
