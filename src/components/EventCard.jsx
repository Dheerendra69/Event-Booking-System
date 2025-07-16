
const EventCard = ({ event }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
      <h2 className="text-xl font-semibold mb-2">{event.title}</h2>

      <p className="text-sm text-gray-500 mb-1">
        📅 {new Date(event.date).toLocaleDateString()}
      </p>

      <p className="text-sm text-gray-500 mb-1">
        📍 {event.is_online ? "Online Event" : event.location}
      </p>

      <p className="text-sm text-gray-500 mb-1">
        👥 Capacity: {event.capacity}
      </p>

      {event.price !== undefined && (
        <p className="text-sm text-gray-500 mb-1">
          💰 {event.price === 0 ? "Free" : `₹${event.price}`}
        </p>
      )}

      {event.category && (
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
          {event.category}
        </span>
      )}
    </div>
  );
};

export default EventCard;
