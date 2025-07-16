const express = require("express");
const {
  publishReview,
  getReviewsByEvent,
} = require("../controllers/reviewController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/publishreview", protect, publishReview);
router.get("/:eventId", protect, getReviewsByEvent);

module.exports = router;
