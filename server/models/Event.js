const db = require("../config/dbConnection");

const createEvent = (data, callback) => {
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
  } = data;

  const query = `
    INSERT INTO events (
      title, description, date, location, capacity,
      banner_image_url, thumbnail_url, start_time, end_time,
      category, organizer_name, organizer_email, venue_details,
      is_online, meeting_link, price, tags, status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Replace empty strings or undefined with null
  const values = [
    title || null,
    description || null,
    date || null,
    location || null,
    capacity || null,
    banner_image_url || null,
    thumbnail_url || null,
    start_time || null,
    end_time || null,
    category || null,
    organizer_name || null,
    organizer_email || null,
    venue_details || null,
    typeof is_online === "boolean" ? is_online : null, // explicitly check boolean
    meeting_link || null,
    price ?? null, // allow 0 price
    tags || null,
    status || null,
  ];

  db.query(query, values, callback);
};

const getAllEvents = (callback) => {
  const query = "SELECT * FROM events ORDER BY date ASC";
  db.query(query, callback);
};

const getEventById = (id, callback) => {
  const query = "SELECT * FROM events WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
};
