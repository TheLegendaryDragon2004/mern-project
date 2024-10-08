// reservation.js
import express from 'express';
import { Reservation } from "../models/reservationSchema.js";
import { sendReservation } from "../controller/reservation.js"; // Ensure the controller is correctly imported
const router = express.Router();

router.post("/send", sendReservation); // Route: /api/reservation/send (with prefix /api)

router.get('/current', async (req, res) => {
  try {
    const reservations = await Reservation.find(); // Fetch all reservations
    res.status(200).json({ reservations }); // Send reservations as response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations' });
  }
});

export default router;