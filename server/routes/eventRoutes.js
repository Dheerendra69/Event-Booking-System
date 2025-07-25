const express = require("express");
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  getAttendeesCount,
  deleteEvent,
} = require("../controllers/eventController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEvent);
router.put("/:id", updateEvent);
router.post("/", protect, isAdmin, createEvent);
router.get("/:id/attendees-count", protect, isAdmin, getAttendeesCount);
router.delete("/delete-event/:id", deleteEvent);

module.exports = router;
