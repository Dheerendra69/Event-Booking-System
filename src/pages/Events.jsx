import React, { useEffect, useState } from "react";
import { fetchEvents, bookEvent } from "../api/eventAPI";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents().then((res) => {
      setEvents(res.data);
      setLoading(false);
    });
  }, []);

  const handleBook = async (event_id) => {
    try {
      await bookEvent(event_id);
      alert("Booking successful!");
    } catch (err) {
      alert("You must be logged in to book.");
    }
  };

  if (loading) return <Loader />;

  return (
      <div className="p-6 grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onBook={handleBook} />
        ))}
      </div>
  );
};

export default Events;
