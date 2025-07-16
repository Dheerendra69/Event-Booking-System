const eventModel = require("../models/Event");
const db = require("../config/dbConnection");

const createEvent = (req, res) => {
  const {
    title,
    description,
    date,
    location,
    capacity,
    banner_image_url,
    thumbnail_url,
    start_time,
    end_time,
    category,
    organizer_name,
    organizer_email,
    venue_details,
    is_online,
    meeting_link,
    price,
    tags,
    status,
  } = req.body;

  if (
    !title ||
    !date ||
    !location ||
    !capacity ||
    !description ||
    !venue_details
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  eventModel.createEvent(
    {
      title,
      description,
      date,
      location,
      capacity,
      banner_image_url,
      thumbnail_url,
      start_time,
      end_time,
      category,
      organizer_name,
      organizer_email,
      venue_details,
      is_online,
      meeting_link,
      price,
      tags,
      status,
    },
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({
        message: "Event created successfully",
        eventId: result.insertId,
      });
    }
  );
};

const getEvents = (req, res) => {
  eventModel.getAllEvents((err, events) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
    if (events.length > 0) {
      res.json(events);
    } else {
      res.json([]);
    }
  });
};

const getEvent = (req, res) => {
  const { id } = req.params;

  eventModel.getEventById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Event not found" });
    res.json(result[0]);
  });
};
const updateEvent = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if ("date" in data) {
    data.date = new Date(data.date).toISOString().slice(0, 10);
  }

  const fields = [
    "title",
    "description",
    "date",
    "location",
    "capacity",
    "banner_image_url",
    "thumbnail_url",
    "start_time",
    "end_time",
    "category",
    "organizer_name",
    "organizer_email",
    "venue_details",
    "is_online",
    "meeting_link",
    "price",
    "tags",
    "status",
  ];

  const updates = fields
    .filter((field) => field in data)
    .map((field) => `${field} = ?`)
    .join(", ");

  const values = fields.filter((f) => f in data).map((f) => data[f]);

  const query = `UPDATE events SET ${updates} WHERE id = ?`;
  db.query(query, [...values, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "DB update error", details: err });
    }
    res.json({ message: "Event updated successfully" });
  });
};

const getAttendeesCount = (req, res) => {
  const eventId = req.params.id;
  const query = `
    SELECT COALESCE(SUM(number_of_people), 0) AS totalAttendees
    FROM bookings
    WHERE event_id = ?
  `;
  db.query(query, [eventId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  getAttendeesCount,
};
