const db = require("../config/dbConnection");

const publishReview = (req, res) => {
  const { event_id, rating, comment } = req.body;
  const user_id = req.user.id;

  const query = `
    INSERT INTO reviews (user_id, event_id, rating, comment)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [user_id, event_id, rating, comment], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Review submitted successfully" });
  });
};

const getReviewsByEvent = (req, res) => {
  const { eventId } = req.params;

  const query = `
    SELECT r.rating, r.comment, r.created_at, u.name AS user_name
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.event_id = ?
    ORDER BY r.created_at DESC
  `;

  db.query(query, [eventId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

module.exports = {
  publishReview,
  getReviewsByEvent,
};
