// reservation.js
import express from 'express';
import { sendReservation } from "../controller/reservation.js"; // Ensure the controller is correctly imported
const router = express.Router();

router.post("/send", sendReservation); // Route: /api/reservation/send (with prefix /api)

export default router;