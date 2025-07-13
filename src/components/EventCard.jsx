import React from "react";

const EventCard = ({ event, onBook }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold">{event.title}</h2>
        <p className="text-gray-600">{event.description}</p>
        <p className="text-sm text-gray-500">📅 {new Date(event.date).toLocaleString()}</p>
        <p className="text-sm text-gray-500">📍 {event.location}</p>
        <p className="text-sm text-gray-500">👥 Capacity: {event.capacity}</p>
      </div>
      <button
        onClick={() => onBook(event.id)}
        className="mt-4 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all"
      >
        Book Now
      </button>
    </div>
  );
};

export default EventCard;
