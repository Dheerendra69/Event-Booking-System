const express = require("express");
const { getEvents, getEvent, createEvent } = require("../controllers/eventController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEvent);
router.post("/", protect, isAdmin, createEvent); 

module.exports = router;
