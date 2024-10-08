import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [reservations, setReservations] = useState([]); // State for current reservations
  const [showReservations, setShowReservations] = useState(false); // State for toggling reservations visibility
  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/reservation/send",
        { firstName, lastName, email, phone, date, time, seats },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      // Reset form
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setTime("");
      setDate("");
      setSeats("");
      navigate("/success");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while making the reservation");
    }
  };

  const fetchReservations = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/reservation/current");
      setReservations(data.reservations);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching reservations");
    }
  };

  // Toggle reservations display
  const toggleReservations = () => {
    setShowReservations((prev) => !prev); // Toggle the state
    if (!showReservations) {
      fetchReservations(); // Fetch reservations only when showing them
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
            <button onClick={toggleReservations} className="fetch-reservations-btn">
              {showReservations ? "HIDE CURRENT RESERVATIONS" : "SHOW CURRENT RESERVATIONS"}
            </button>
            {showReservations && reservations.length > 0 && (
              <div className="current-reservations">
                <h2>Current Reservations:</h2>
                <ul>
                  {reservations.map((reservation, index) => (
                    <li key={index}>
                      {reservation.firstName} {reservation.lastName} - {reservation.date} at {reservation.time} for {reservation.seats} seats
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showReservations && reservations.length === 0 && (
              <div className="current-reservations">
                <h2>No Current Reservations</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
