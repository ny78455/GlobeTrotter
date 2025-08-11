import { useEffect, useState } from "react";
import axios from "axios";
import ItineraryPopup from "./ItineraryPopup";

export default function ItineraryList({ user }: { user: any }) {
  const [places, setPlaces] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/itineraries/${user.id}`).then((res) => {
      setPlaces(res.data);
    });
  }, [user.id]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {places.map((place, idx) => (
        <div key={idx} className="border rounded-lg shadow-lg p-4">
          <img src={place.image_url} alt={place.place_name} className="w-full h-48 object-cover rounded" />
          <h3 className="text-xl font-bold mt-2">{place.place_name}</h3>
          <p>{place.description}</p>
          <button
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setSelected(place)}
          >
            View Itinerary
          </button>
        </div>
      ))}
      {selected && <ItineraryPopup place={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
