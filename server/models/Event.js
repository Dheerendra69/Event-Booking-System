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
    created_by,
  } = data;

  const query = `
    INSERT INTO events (
      title, description, date, location, capacity,
      banner_image_url, thumbnail_url, start_time, end_time,
      category, organizer_name, organizer_email, venue_details,
      is_online, meeting_link, price, tags, status, created_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

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
    typeof is_online === "boolean" ? is_online : null, 
    meeting_link || null,
    price ?? null, 
    tags || null,
    status || null,
    created_by || 1,
  ];

  db.query(query, values, callback);
};

const getAllEvents = (userId, role, callback) => {
  if (role === "user") {
    const query = "SELECT * FROM events ORDER BY date DESC";
    db.query(query, [userId], callback);
    return;
  }
  const query = "SELECT * FROM events WHERE created_by = ? ORDER BY date ASC";
  db.query(query, [userId], callback);
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
