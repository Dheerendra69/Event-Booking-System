import React, { useEffect, useState } from "react";
import { fetchMyBookings } from "../api/eventAPI";
import Loader from "../components/Loader";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchMyBookings().then((res) => setBookings(res.data));
  }, []);

  if (!bookings.length) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">My Bookings</h1>
      <ul className="space-y-4">
        {bookings.map((b) => (
          <li key={b.booking_id} className="bg-white p-4 shadow rounded-xl">
            <p className="font-bold">{b.title}</p>
            <p>{new Date(b.date).toLocaleString()}</p>
            <p>{b.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
