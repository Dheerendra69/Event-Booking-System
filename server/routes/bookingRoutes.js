const express = require("express");
const {
  bookEvent,
  getMyBookings,
  getAllBookings,
  checkBooking,
  cancelBooking,
  getAvailableSeats,
} = require("../controllers/bookingController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, bookEvent);
router.get("/me", protect, getMyBookings);
router.get("/admin", protect, isAdmin, getAllBookings);
router.get("/check-booking/:userId/:eventId", checkBooking);
router.delete("/cancel-booking/:userId/:eventId", cancelBooking);
router.get("/available-seats/:eventId", getAvailableSeats);

module.exports = router;
