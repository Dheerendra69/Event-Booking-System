import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchEventById,
  bookEvent,
  checkBooking,
  cancelBooking,
  getAvailableSeats,
} from "../api/eventAPI";
import Loader from "../components/Loader";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBooked, setIsBooked] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(null);
  const [canBook, setCanBook] = useState(true);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchEventById(id);
        setEvent(res.data);
        const seatRes = await getAvailableSeats(res.data.id);
        setSeatsLeft(seatRes.data.seatsLeft);
        setCanBook(seatRes.data.isPossibleToBook);
        if (user) {
          const bookingStatus = await checkBooking(user.id, res.data.id);
          setIsBooked(bookingStatus.data.isBooked);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user, isBooked]);

  const handleBook = async () => {
    if (numberOfPeople > seatsLeft) {
      alert(`Only ${seatsLeft} seats left!`);
      return;
    }

    try {
      await bookEvent(event.id, numberOfPeople);
      alert("Booking successful!");
      setIsBooked(true);
    } catch (err) {
      alert("You must be logged in to book.");
    }
  };

  const handleCancelBooking = async () => {
    try {
      await cancelBooking(user.id, event.id);
      alert("Booking cancelled.");
      setIsBooked(false);
    } catch (err) {
      alert("Could not cancel booking.");
    }
  };

  const handleEdit = () => {
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
      {/* Seats Left Section */}
      <div className="mt-4 text-lg font-medium">
        {seatsLeft > 0 ? (
          <p>🎫 Seats Left: {seatsLeft}</p>
        ) : (
          <p className="text-red-600 font-semibold">
            ❌ Event is fully booked!
          </p>
        )}
      </div>
      {!isAdmin && !isBooked && canBook && (
        <div className="mt-6 flex flex-col items-center gap-2">
          <label htmlFor="people" className="font-medium">
            👥 Number of People
          </label>
          <input
            id="people"
            type="number"
            min="1"
            max={seatsLeft}
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-4 py-2 w-32 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {numberOfPeople > seatsLeft && (
            <p className="text-red-500 text-sm">
              Only {seatsLeft} seats are available.
            </p>
          )}
        </div>
      )}

      {/* Book or Cancel or Edit Button */}
      {/* Action Button */}
      <div className="mt-6 text-center">
        {isAdmin ? (
          <button
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Edit Event
          </button>
        ) : isBooked ? (
          <button
            onClick={handleCancelBooking}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Cancel Booking
          </button>
        ) : canBook ? (
          <button
            onClick={handleBook}
            disabled={numberOfPeople < 1 || numberOfPeople > seatsLeft}
            className={`${
              numberOfPeople < 1 || numberOfPeople > seatsLeft
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-6 py-2 rounded-lg font-semibold`}
          >
            Book Now
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold cursor-not-allowed"
          >
            Event Full
          </button>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
