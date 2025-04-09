// routes/seatRoutes.js
const express = require("express");
const router = express.Router();
const seatController = require("../controllers/seatController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, seatController.getSeats);
router.post("/book", verifyToken, seatController.bookSeats);
router.post("/cancel", verifyToken, seatController.cancelBooking);

module.exports = router;
