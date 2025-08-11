import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type User = { id: string; name: string; email?: string };

type City = {
  city: string;
  state_or_region?: string;
  why_popular?: string;
  image_url?: string;
};

type Trip = {
  id: number;
  title: string;
  destination: string;
  start_date: string;
  end_date?: string | null;
  notes?: string | null;
};

export default function Dashboard({ user }: { user: User }) {
  const [cities, setCities] = useState<City[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingTrips, setLoadingTrips] = useState(false);

  // form state for adding trip
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchPopularCities();
    fetchTrips();
    // eslint-disable-next-line
  }, []);

  async function fetchPopularCities() {
    setLoadingCities(true);
    try {
      const res = await fetch(`/api/dashboard/popular_cities?country=India`);
      if (!res.ok) throw new Error("Failed to load popular cities");
      const data = await res.json();
      setCities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCities(false);
    }
  }

  async function fetchTrips() {
    if (!user?.id) return;
    setLoadingTrips(true);
    try {
      const res = await fetch(`/api/trips/${user.id}`);
      if (!res.ok) throw new Error("Failed to fetch trips");
      const data = await res.json();
      setTrips(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTrips(false);
    }
  }

  async function handleAddTrip(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) return alert("User not set");
    const payload = {
      user_id: user.id,
      title,
      destination,
      start_date: startDate,
      end_date: endDate || undefined,
      notes
    };
    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json();
        console.error(err);
        throw new Error(err?.error ?? "Failed to create trip");
      }
      const data = await res.json();
      setTrips(prev => [...prev, data.trip]);
      // clear form
      setTitle("");
      setDestination("");
      setStartDate("");
      setEndDate("");
      setNotes("");
    } catch (err) {
      alert("Error creating trip");
      console.error(err);
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <Link to="/plan-trip" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Plan New Trip
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming Trips */}
        <div className="col-span-1 md:col-span-1 bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Upcoming Trips</h2>
          {loadingTrips ? (
            <div>Loading trips...</div>
          ) : trips.length === 0 ? (
            <div className="text-sm text-gray-500">No upcoming trips. Add one below.</div>
          ) : (
            <ul className="space-y-3">
              {trips.map((t) => (
                <li key={t.id} className="border p-3 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{t.title}</div>
                      <div className="text-sm text-gray-600">{t.destination}</div>
                      <div className="text-xs text-gray-500">
                        {t.start_date}{t.end_date ? ` — ${t.end_date}` : ""}
                      </div>
                    </div>
                    {/* simple action buttons placeholder */}
                    <div className="text-right">
                      <button className="text-sm text-blue-500">View</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleAddTrip} className="mt-4 space-y-2">
            <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Trip title" className="w-full p-2 border rounded" />
            <input required value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" className="w-full p-2 border rounded" />
            <div className="flex gap-2">
              <input required value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" className="p-2 border rounded flex-1" />
              <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" className="p-2 border rounded flex-1" />
            </div>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" className="w-full p-2 border rounded" />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Trip</button>
          </form>
        </div>

        {/* Popular Cities */}
        <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Popular Cities</h2>
          {loadingCities ? (
            <div>Loading popular cities...</div>
          ) : cities.length === 0 ? (
            <div className="text-sm text-gray-500">No cities found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cities.map((c, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <div className="h-40 w-full bg-gray-200">
                    {c.image_url ? (
                      <img src={c.image_url} alt={c.city} className="w-full h-40 object-cover" />
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center text-gray-400">No image</div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="font-semibold">{c.city}{c.state_or_region ? `, ${c.state_or_region}` : ""}</div>
                    <div className="text-sm text-gray-600 mt-1">{c.why_popular}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Link to="/itineraries" className="text-blue-500 underline">View Saved Itineraries</Link>
      </div>
    </div>
  );
}
