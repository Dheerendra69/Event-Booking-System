const db = require("../config/dbConnection");

const createUser = ({ name, email, password, role }, callback) => {
  const query =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, password, role], callback);
};

const findUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], callback);
};

const findUserById = (id, callback) => {
  const query = "SELECT id, name, email, role FROM users WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
