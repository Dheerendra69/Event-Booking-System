const db = require("../config/dbConnection");
const createBooking = (
  { user_id, event_id, number_of_people = 1 },
  callback
) => {
  const query =
    "INSERT INTO bookings (user_id, event_id, number_of_people) VALUES (?, ?, ?)";
  db.query(query, [user_id, event_id, number_of_people], (err, result) => {
    if (err) {
      console.error("Error inserting booking:", err.message);
      console.error("Full error object:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

const getBookingsByUser = (user_id, callback) => {
  const query = `
        SELECT b.id AS booking_id, e.title, e.date, e.location
        FROM bookings b
        JOIN events e ON b.event_id = e.id
        WHERE b.user_id = ?
        ORDER BY e.date DESC
    `;
  db.query(query, [user_id], callback);
};

const getAllBookings = (creatorId, callback) => {
  const query = `
    SELECT 
      b.id AS booking_id,
      u.name AS user_name,
      e.title AS event_title,
      e.location AS event_location,
      e.date
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN events e ON b.event_id = e.id
    WHERE e.created_by = ?
    ORDER BY e.date DESC
  `;
  db.query(query, [creatorId], callback);
};

module.exports = {
  createBooking,
  getBookingsByUser,
  getAllBookings,
};
