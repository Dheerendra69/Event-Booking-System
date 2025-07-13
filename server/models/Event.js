const db = require("../config/dbConnection");

const createEvent = ({ title, description, date, location, capacity }, callback) => {
    const query = "INSERT INTO events (title, description, date, location, capacity) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [title, description, date, location, capacity], callback);
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
    getEventById
};
