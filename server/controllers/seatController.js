const pool = require("../db");

// GET /api/seats
exports.getSeats = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT seat_number, is_booked, booked_by FROM seats ORDER BY seat_number ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching seats:", err);
    res.status(500).json({ message: "Failed to fetch seats." });
  }
};

// POST /api/seats/book
exports.bookSeats = async (req, res) => {
  const userId = req.user.id;
  const { numberOfSeats } = req.body;

  if (!Number.isInteger(numberOfSeats) || numberOfSeats < 1 || numberOfSeats > 7) {
    return res.status(400).json({ message: "You can only book maxiumum of 7 seats at a time." });
  }

  try {
    // Fetch all unbooked seats ordered by seat number
    const { rows: availableSeats } = await pool.query(
      "SELECT seat_number FROM seats WHERE is_booked = FALSE ORDER BY seat_number ASC"
    );

    if (availableSeats.length < numberOfSeats) {
      return res.status(400).json({ message: "Not enough seats available." });
    }

    // Find contiguous seats in the same row
    const findSeatsInRow = () => {
      for (let i = 0; i <= availableSeats.length - numberOfSeats; i++) {
        const slice = availableSeats.slice(i, i + numberOfSeats);
        const sameRow =
          Math.floor((slice[0].seat_number - 1) / 7) ===
          Math.floor((slice[slice.length - 1].seat_number - 1) / 7);
        if (sameRow) return slice.map((s) => s.seat_number);
      }
      // fallback: pick first available
      return availableSeats.slice(0, numberOfSeats).map((s) => s.seat_number);
    };

    const selectedSeats = findSeatsInRow();

    // Book the seats
    await pool.query(
      "UPDATE seats SET is_booked = TRUE, booked_by = $1 WHERE seat_number = ANY($2::int[])",
      [userId, selectedSeats]
    );

    res.json({ message: " Seats booked successfully", seats: selectedSeats });
  } catch (err) {
    console.error(" Booking Error:", err);
    res.status(500).json({ message: "Error booking seats. Please try again." });
  }
};

// POST /api/seats/cancel
exports.cancelBooking = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "UPDATE seats SET is_booked = FALSE, booked_by = NULL WHERE booked_by = $1 RETURNING seat_number",
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "You have no bookings to cancel." });
    }

    const cancelledSeats = result.rows.map((r) => r.seat_number);
    res.json({ message: " Booking cancelled", seats: cancelledSeats });
  } catch (err) {
    console.error("Cancel Error:", err);
    res.status(500).json({ message: "Error cancelling booking. Please try again." });
  }
};
