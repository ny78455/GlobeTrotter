import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ItineraryDay {
  day: number;
  plan: string;
}

interface ItineraryItem {
  place_name: string;
  budget: number;
  description: string;
  image_url: string;
  itinerary: ItineraryDay[];
}

export const ItineraryPage: React.FC = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const [places, setPlaces] = useState<ItineraryItem[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/itineraries/${user_id}`)
      .then((res) => res.json())
      .then((data) => setPlaces(data))
      .catch((err) => console.error("Error fetching itineraries:", err));
  }, [user_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 p-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
        Your Travel Itinerary 🗺️
      </h1>

      {places.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-300">Loading...</p>
      ) : (
        <div className="space-y-6">
          {places.map((place, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={place.image_url}
                  alt={place.place_name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold dark:text-white">
                    {place.place_name}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300">
                    Budget: ₹{place.budget}
                  </p>
                  <p className="text-sm text-slate-500">{place.description}</p>
                </div>
              </div>

              <button
                onClick={() =>
                  setExpanded(expanded === index ? null : index)
                }
                className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 text-white"
              >
                {expanded === index ? "Hide Itinerary" : "Detailed Itinerary"}
              </button>

              {expanded === index && (
                <div className="mt-3 space-y-2 bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                  {place.itinerary.map((day) => (
                    <p
                      key={day.day}
                      className="text-slate-700 dark:text-slate-200"
                    >
                      <strong>Day {day.day}:</strong> {day.plan}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
