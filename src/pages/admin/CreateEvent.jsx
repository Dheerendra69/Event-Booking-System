import React, { useState } from "react";
import API from "../../api/eventAPI";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    venue_details: "",
    capacity: "",
    is_online: false,
    meeting_link: "",
    banner_image_url: "",
    thumbnail_url: "",
    organizer_name: "",
    organizer_email: "",
    category: "",
    price: "",
    tags: "",
    status: "upcoming",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/events", formData);
      alert("Event created successfully");
    } catch (err) {
      console.error(err);
      alert("Error creating event");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 space-y-4 bg-white rounded-xl shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>

      {/* Text Inputs */}
      {[
        "title",
        "description",
        "location",
        "venue_details",
        "organizer_name",
        "organizer_email",
        "category",
        "tags",
        "banner_image_url",
        "thumbnail_url",
        "meeting_link",
      ].map((field) => (
        <input
          key={field}
          name={field}
          type="text"
          placeholder={field.replaceAll("_", " ")}
          value={formData[field]}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      ))}

      {/* Date and Time */}
      <div className="flex gap-4">
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          name="start_time"
          type="time"
          value={formData.start_time}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          name="end_time"
          type="time"
          value={formData.end_time}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Capacity and Price */}
      <div className="flex gap-4">
        <input
          name="capacity"
          type="number"
          placeholder="capacity"
          value={formData.capacity}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          name="price"
          type="number"
          placeholder="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Online Toggle */}
      <div className="flex items-center space-x-2">
        <input
          name="is_online"
          type="checkbox"
          checked={formData.is_online}
          onChange={handleChange}
        />
        <label htmlFor="is_online" className="text-sm">
          Is this an online event?
        </label>
      </div>

      {/* Status Dropdown */}
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
      >
        <option value="upcoming">Upcoming</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Create Event
      </button>
    </form>
  );
};

export default CreateEvent;
