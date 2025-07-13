import React, { useEffect, useState } from "react";
import { fetchAllBookings } from "../api/eventAPI";
import Loader from "../components/Loader";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchAllBookings().then((res) => setBookings(res.data));
  }, []);

  if (!bookings.length) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Bookings</h1>
      <ul className="space-y-3">
        {bookings.map((b) => (
          <li key={b.booking_id} className="bg-white p-4 rounded-lg shadow">
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

export default AdminDashboard;
