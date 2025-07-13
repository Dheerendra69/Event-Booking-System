import React, { useState } from "react";
import API from "../api/eventAPI";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/events", formData);
      alert("Event created successfully");
    } catch (err) {
      alert("Error creating event");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 space-y-4 bg-white rounded-xl shadow"
    >
      <h2 className="text-xl font-bold">Create New Event</h2>
      {["title", "description", "date", "location", "capacity"].map((field) => (
        <input
          key={field}
          name={field}
          type={field === "date" ? "datetime-local" : "text"}
          placeholder={field}
          value={formData[field]}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      ))}
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Create
      </button>
    </form>
  );
};

export default CreateEvent;
