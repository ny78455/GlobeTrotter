import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Wallet } from "lucide-react";

interface ItineraryItem {
  place_name: string;
  budget: number;
  description: string;
  image_url: string;
  itinerary: { day: string; plan: string }[];
}

const ItineraryList: React.FC = () => {
  const { userId } = useParams();
  const [itineraries, setItineraries] = useState<ItineraryItem[]>([]);
  const [assignedImages, setAssignedImages] = useState<string[]>([]);
  const [imagePool, setImagePool] = useState<string[]>([]);
  const navigate = useNavigate();

  // Fetch itinerary data
  useEffect(() => {
    if (!userId) return;
    fetch(`http://127.0.0.1:5000/api/local-itinerary/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Itinerary not found");
        return res.json();
      })
      .then((data: ItineraryItem[]) => setItineraries(data))
      .catch((err) => console.error(err));
  }, [userId]);

  // Fetch image URLs from backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/images")
      .then((res) => res.json())
      .then((images: string[]) => setImagePool(images))
      .catch((err) => console.error("Failed to load images:", err));
  }, []);

  // Assign unique random images to itineraries
  useEffect(() => {
    if (imagePool.length === 0 || itineraries.length === 0) return;

    // Shuffle imagePool
    const shuffled = [...imagePool].sort(() => 0.5 - Math.random());

    // Pick images without duplicates matching itineraries length
    const selected = shuffled.slice(0, itineraries.length);

    setAssignedImages(selected);
  }, [imagePool, itineraries]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50 px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-300">
          🌍 Travel Planner
        </h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </nav>

      {/* Itinerary Cards */}
      <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {itineraries.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition"
            onClick={() =>
              navigate(`/itinerary/${userId}/${index}`, {
                state: { assignedImage: assignedImages[index] || item.image_url },
              })
            }
          >
            <img
              src={assignedImages[index] || item.image_url}
              alt={item.place_name}
              className="h-48 w-full object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                {item.place_name}
              </h2>
              <p className="text-slate-500 dark:text-slate-300 text-sm">
                {item.description}
              </p>
              <div className="flex items-center gap-2 mt-2 text-blue-600 dark:text-blue-300">
                <Wallet className="h-4 w-4" /> ₹{item.budget}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryList;
