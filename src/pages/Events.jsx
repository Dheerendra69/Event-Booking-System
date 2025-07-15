import React, { useEffect, useState } from "react";
import { fetchEvents } from "../api/eventAPI";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents().then((res) => {
      setEvents(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 grid md:grid-cols-3 sm:grid-cols-2 gap-6">
      {events.map((event) => (
        <div
          key={event.id}
          onClick={() => navigate(`/event/${event.id}`)}
          className="cursor-pointer"
        >
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
};

export default Events;
