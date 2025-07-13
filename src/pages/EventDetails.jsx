import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById } from "../api/eventAPI";
import Loader from "../components/Loader";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEventById(id).then((res) => setEvent(res.data));
  }, [id]);

  if (!event) return <Loader />;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <p>{event.description}</p>
      <p className="text-sm mt-2">📅 {new Date(event.date).toLocaleString()}</p>
      <p>📍 {event.location}</p>
      <p>👥 Capacity: {event.capacity}</p>
    </div>
  );
};

export default EventDetails;
