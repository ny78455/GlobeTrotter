import { Link } from "react-router-dom";

export default function Dashboard({ user }: { user: any }) {
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <Link to="/plan-trip" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Plan New Trip
        </Link>
      </div>
      <div className="mt-4">
        <Link to="/itineraries" className="text-blue-500 underline">View Saved Itineraries</Link>
      </div>
    </div>
  );
}
