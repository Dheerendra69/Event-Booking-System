const express = require("express");
const { bookEvent, getMyBookings, getAllBookings } = require("../controllers/bookingController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, bookEvent);               
router.get("/me", protect, getMyBookings);          
router.get("/admin", protect, isAdmin, getAllBookings); 

module.exports = router;
