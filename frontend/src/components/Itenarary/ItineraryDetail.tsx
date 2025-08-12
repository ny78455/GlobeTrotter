import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

interface DayPlan {
  day: string;
  plan: string;
}

interface ItineraryData {
  place_name: string;
  budget: string;
  description: string;
  image_url: string;
  itinerary: DayPlan[] | string[];
}

const ItineraryDetails: React.FC = () => {
  const { userId, index } = useParams<{ userId: string; index: string }>();
  const location = useLocation();
  const assignedImage = location.state?.assignedImage as string | undefined;

  const [data, setData] = useState<ItineraryData | null>(null);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://127.0.0.1:5000/api/local-itinerary/${userId}`)
      .then((res) => res.json())
      .then((itineraries) => {
        const item = itineraries[Number(index)];

        // Convert string-based itinerary into structured format if needed
        if (Array.isArray(item.itinerary) && typeof item.itinerary[0] === "string") {
          item.itinerary = item.itinerary.map((str: string) => {
            const [day, ...rest] = str.split(":");
            return { day: day.trim(), plan: rest.join(":").trim() };
          });
        }

        setData(item);
      })
      .catch((err) => console.error(err));
  }, [userId, index]);

  if (!data) return <div className="p-4 text-gray-500">Loading itinerary...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{data.place_name}</h1>
      <p className="text-lg text-gray-700 mb-2">Budget: {data.budget}</p>
      <p className="mb-4">{data.description}</p>

      {/*
        Show the assignedImage passed from List page if available,
        else fallback to data.image_url
      */}
      {(assignedImage || data.image_url) && (
        <img
          src={assignedImage || data.image_url}
          alt={data.place_name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
      <div className="space-y-4">
        {(data.itinerary as DayPlan[]).map((dayPlan, idx) => (
          <div
            key={idx}
            className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            <h3 className="text-xl font-bold">{dayPlan.day}</h3>
            <p className="text-gray-700">{dayPlan.plan}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDetails;
