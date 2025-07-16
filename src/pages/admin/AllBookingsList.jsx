import React, { useEffect, useState } from "react";
import { fetchAllBookings } from "../../api/eventAPI";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const AllBookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBookings().then((res) => {
      setBookings(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;
  if (!bookings.length) {
    return <p className="text-center text-gray-500">No bookings found.</p>;
  }
  console.log("events");
  console.log(bookings);

  const handleClick = async (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Bookings</h1>
      <ul className="space-y-3">
        {bookings.map((b) => (
          <li
            onClick={() => handleClick(b.eventID)}
            key={b.booking_id}
            className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-100 transition"
          >
            <p>
              <strong>User:</strong> {b.user_name}
            </p>
            <p>
              <strong>Event:</strong> {b.event_title}
            </p>
            <p>
              <strong>Date:</strong> {new Date(b.date).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBookingsList;
