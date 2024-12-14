import express from 'express';
import { sendReservation, updateReservation, deleteReservation } from "../controller/reservation.js"; // Ensure the controller is correctly imported
import { Reservation } from "../models/reservationSchema.js";

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

router.put('/update/:id', updateReservation); // Route: /api/reservation/update/:id
router.delete('/delete/:id', deleteReservation); // Route: /api/reservation/delete/:id

export default router;
