import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchEventById, bookEvent } from "../api/eventAPI";
import Loader from "../components/Loader";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  useEffect(() => {
    fetchEventById(id).then((res) => {
      setEvent(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleBook = async () => {
    try {
      await bookEvent(event.id);
      alert("Booking successful!");
    } catch (err) {
      alert("You must be logged in to book.");
    }
  };
  const handleEdit = async () => {
    navigate(`/admin/editevent/${event.id}`);
  };

  if (loading || !event) return <Loader />;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-2xl">
      {/* Banner Image */}
      {event.banner_image_url && (
        <img
          src={event.banner_image_url}
          alt={event.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}

      {/* Title and Category */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        {event.category && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {event.category}
          </span>
        )}
      </div>

      {/* Date and Time */}
      <p className="text-gray-600 mb-2">
        📅 {new Date(event.date).toLocaleDateString()}{" "}
        {event.start_time && `⏰ ${event.start_time.slice(0, 5)}`}{" "}
        {event.end_time && ` - ${event.end_time.slice(0, 5)}`}
      </p>

      {/* Location */}
      <p className="mb-2">
        📍 {event.is_online ? "Online Event" : event.location}
      </p>

      {/* Meeting Link (if online) */}
      {event.is_online && event.meeting_link && (
        <p className="mb-2">
          🔗{" "}
          <a
            href={event.meeting_link}
            className="text-blue-600 underline"
            target="_blank"
            rel="noreferrer"
          >
            Join Meeting
          </a>
        </p>
      )}

      {/* Organizer */}
      {event.organizer_name && (
        <p className="mb-2">
          🎤 Hosted by:{" "}
          <span className="font-semibold">{event.organizer_name}</span>
        </p>
      )}
      {event.organizer_email && (
        <p className="mb-2">
          📧{" "}
          <a href={`mailto:${event.organizer_email}`} className="text-blue-600">
            {event.organizer_email}
          </a>
        </p>
      )}

      {/* Description */}
      <div className="mt-4">
        <p className="text-gray-700">{event.description}</p>
      </div>

      {/* Capacity and Price */}
      <div className="flex justify-between items-center mt-6">
        <p>👥 Capacity: {event.capacity || "Not specified"}</p>
        <p>💰 {event.price === 0 ? "Free" : `₹${event.price}`}</p>
      </div>

      {/* Tags */}
      {event.tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {event.tags.split(",").map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Book Now Button */}

      {isAdmin ? (
        <div className="mt-6 text-center">
          <button
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Edit Event
          </button>
        </div>
      ) : (
        <div className="mt-6 text-center">
          <button
            onClick={handleBook}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
