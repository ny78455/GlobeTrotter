import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SuggestionsCarousel = () => {
  const { userId } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/itineraries/${userId}`)
      .then(res => res.json())
      .then(setPlaces);
  }, [userId]);

  return (
    <div>
      {places.slice(0, 10).map((place, idx) => (
        <div key={idx} className="card">
          <img src={place.image_url} alt={place.place_name} />
          <h3>{place.place_name}</h3>
          <p>{place.description}</p>
          <button onClick={() => navigate(`/itinerary/${userId}/${idx}`)}>
            View Itinerary
          </button>
        </div>
      ))}
    </div>
  );
};
