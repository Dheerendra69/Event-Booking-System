const eventModel = require("../models/Event");

const createEvent = (req, res) => {
  const { title, description, date, location, capacity } = req.body;

  if (!title || !date || !location || !capacity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  eventModel.createEvent(
    { title, description, date, location, capacity },
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

module.exports = {
  createEvent,
  getEvents,
  getEvent,
};
