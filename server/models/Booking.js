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

const getAllBookings = (callback) => {
  const query = `
           SELECT 
      bookings.id AS booking_id,
      users.name AS user_name,
      events.title AS event_title,
      events.location AS event_location,
      bookings.created_at AS date
    FROM bookings
    JOIN users ON bookings.user_id = users.id
    JOIN events ON bookings.event_id = events.id
    ORDER BY bookings.created_at DESC
    `;
  db.query(query, callback);
};

module.exports = {
  createBooking,
  getBookingsByUser,
  getAllBookings,
};
