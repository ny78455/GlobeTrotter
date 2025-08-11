export default function ItineraryPopup({ place, onClose }: { place: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold">{place.place_name}</h2>
        <ul className="mt-3 list-disc pl-5">
          {place.itinerary.map((day: string, idx: number) => (
            <li key={idx} className="mb-2">{day}</li>
          ))}
        </ul>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
