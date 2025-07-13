require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("../config/dbConnection");

const userRoutes = require("../routes/userRoutes");
const eventRoutes = require("../routes/eventRoutes");
const bookingRoutes = require("../routes/bookingRoutes");
const adminRoutes = require("../routes/adminRoutes");
const errorHandler = require("../middlewares/errorHandler");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-frontend-domain.com"],
  })
);

app.use(errorHandler);
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
