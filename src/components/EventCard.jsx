const EventCard = ({ event }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition-all duration-300 w-full h-full flex flex-col">
      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">
          {event.title || "Untitled Event"}
        </h2>

        <p className="text-sm text-gray-500 mb-1">
          📅 {event.date ? new Date(event.date).toLocaleDateString() : "—"}
        </p>

        <p className="text-sm text-gray-500 mb-1">
          📍 {event.is_online ? "Online Event" : event.location || "—"}
        </p>

        <p className="text-sm text-gray-500 mb-1">
          👥 Capacity: {event.capacity || "—"}
        </p>

        <p className="text-sm text-gray-500 mb-1">
          💰{" "}
          {event.price !== undefined
            ? event.price === 0
              ? "Free"
              : `₹${event.price}`
            : "—"}
        </p>
      </div>

      {event.category && (
        <div className="mt-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {event.category}
          </span>
        </div>
      )}
    </div>
  );
};

export default EventCard;
