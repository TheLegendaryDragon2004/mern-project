import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Changed to string
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      // POST request to backend
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/reservation/send",  // Use /api/reservation/send assuming /api prefix
        { firstName, lastName, email, phone, date, time, seats },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Send credentials (if needed, like cookies)
        }
      );
      // Show success message with toast
      toast.success(data.message);

      // Reset form after successful submission
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setTime("");
      setDate("");
      setSeats("");
      
      // Navigate to success page
      navigate("/success");
    } catch (error) {
      // Handle error, show appropriate message
      toast.error(error.response?.data?.message || "An error occurred while making the reservation");
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="res" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>
            <p>For Further Questions, Please Call</p>
            <form onSubmit={handleReservation}>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="date"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <input
                  type="time"
                  placeholder="Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="email_tag"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
              <input
                  type="number"
                  placeholder="Seats"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  required
                />   
              </div>
              <button type="submit">
                RESERVE NOW{" "}
                <span>
                  <HiOutlineArrowNarrowRight />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
