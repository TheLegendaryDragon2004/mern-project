import mongoose from "mongoose";
import validator from  "validator";

const reservationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must contain atleast 3 characters!"],
        maxLength: [30, "First name cannot exceed 30 characters"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name must contain atleast 3 characters!"],
        maxLength: [30, "Last name cannot exceed 30 characters"],       
    },
    email:{
        type: String,
        requied: true,
        validate: [validator.isEmail, "Provide a valid email!"],
    },
    phone:{
        type: String,
        required: true,
        minLength: [10, "Phone no must contain only 10 digits!"],
        maxLength: [10, "Phone no must contain only 10 digits"], 
    },
    time:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    seats:{
        type: Number,
        required:true,
        min:1,
        max:10
    }   
});

export const Reservation = mongoose.model("Reservation",reservationSchema);