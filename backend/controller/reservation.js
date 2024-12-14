import ErrorHandler from "../error/error.js"; // Error handling module
import { Reservation } from "../models/reservationSchema.js"; // Import your Reservation model

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, date, time, seats } = req.body;

    // Check if any field is missing
    if (!firstName || !lastName || !email || !phone || !date || !time || !seats) {
        return next(new ErrorHandler("Please fill out the full form!", 400));
    }

    // Convert seats to a number
    const seatCount = Number(seats);

    // Validate that seats is a valid number
    if (isNaN(seatCount) || seatCount <= 0) {
        return next(new ErrorHandler("Seats must be a valid positive number", 400));
    }

    try {
        // Check the total number of seats in existing reservations
        const totalSeatsResult = await Reservation.aggregate([
            { $group: { _id: null, totalSeats: { $sum: "$seats" } } },
        ]);

        // Calculate the current total seats
        const currentTotalSeats = totalSeatsResult.length ? totalSeatsResult[0].totalSeats : 0;

        // Check if the new reservation will exceed the maximum limit of 30 seats
        if (currentTotalSeats + seatCount > 30) {
            return next(new ErrorHandler("Maximum seat capacity reached (30). Cannot add more reservations.", 400));
        }

        // Create a new reservation entry
        await Reservation.create({ firstName, lastName, email, phone, date, time, seats: seatCount });

        // Return a success response
        res.status(200).json({
            success: true,
            message: "Reservation Sent Successfully",
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return next(new ErrorHandler(validationErrors.join(","), 400));
        }
        return next(error);
    }
};

export const updateReservation = async (req, res, next) => {
    const { id } = req.params;  // Change here
    const { firstName, lastName, email, phone, date, time, seats } = req.body;

    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            phone,
            date,
            time,
            seats,
        }, { new: true, runValidators: true });

        if (!updatedReservation) {
            return next(new ErrorHandler("Reservation not found!", 404));
        }

        res.status(200).json({
            success: true,
            message: "Reservation updated successfully",
            updatedReservation,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return next(new ErrorHandler(validationErrors.join(","), 400));
        }
        return next(error);
    }
};

export const deleteReservation = async (req, res, next) => {
    const { id } = req.params;  // Change here
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(id);
        if (!deletedReservation) {
            return next(new ErrorHandler("Reservation not found!", 404));
        }

        res.status(200).json({
            success: true,
            message: "Reservation deleted successfully",
        });
    } catch (error) {
        return next(error);
    }
};
