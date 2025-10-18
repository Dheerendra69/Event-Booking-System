const bookingModel = require("../models/Booking");
const db = require("../config/dbConnection");

const bookEvent = (req, res) => {
  const user_id = req.user.id;
  const { event_id, number_of_people = 1 } = req.body;

  if (!event_id)
    return res.status(400).json({ message: "Event ID is required" });

  bookingModel.createBooking(
    { user_id, event_id, number_of_people },
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Event booked successfully" });
    }
  );
};

const getMyBookings = (req, res) => {
  const user_id = req.user.id;
  bookingModel.getBookingsByUser(user_id, (err, bookings) => {
    if (err) return res.status(500).json({ error: err });
    res.json(bookings);
  });
};

const getAllBookings = (req, res) => {
  const { userId, role } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing user ID" });
  }

  bookingModel.getAllBookings(userId, (err, bookings) => {
    if (err) return res.status(500).json({ error: err });
    res.json(bookings);
  });
};

const checkBooking = (req, res) => {
  const { userId, eventId } = req.params;
  const query = "SELECT * FROM bookings WHERE user_id = ? AND event_id = ?";

  db.query(query, [userId, eventId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      return res.status(200).json({ isBooked: true });
    } else {
      return res.status(200).json({ isBooked: false });
    }
  });
};

const cancelBooking = (req, res) => {
  const { userId, eventId } = req.params;
  const query = "DELETE FROM bookings WHERE user_id = ? AND event_id = ?";
  db.query(query, [userId, eventId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json({ message: "Booking cancelled successfully" });
  });
};

const getAvailableSeats = (req, res) => {
  const { eventId } = req.params;

  const query = `
    SELECT 
      e.capacity,
       COALESCE(SUM(b.number_of_people), 0) AS total_booked
    FROM events e
    LEFT JOIN bookings b ON e.id = b.event_id
    WHERE e.id = ?
    GROUP BY e.capacity
  `;

  db.query(query, [eventId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    const { capacity, total_booked } = results[0];
    const seatsLeft = capacity - total_booked;

    res.status(200).json({
      capacity,
      totalBooked: total_booked,
      seatsLeft: seatsLeft > 0 ? seatsLeft : 0,
      isPossibleToBook: seatsLeft > 0,
    });
  });
};

module.exports = {
  bookEvent,
  getMyBookings,
  getAllBookings,
  checkBooking,
  cancelBooking,
  getAvailableSeats,
};
