import React, { useState, useEffect } from "react";
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
  const [reservations, setReservations] = useState([]);
  const [showReservations, setShowReservations] = useState(false);
  const [editingId, setEditingId] = useState(null); // State to track the reservation being edited
  const navigate = useNavigate();

  useEffect(() => {
    if (showReservations) {
      fetchReservations();
    }
  }, [showReservations]);

  const handleReservation = async (e) => {
    e.preventDefault();
    const endpoint = editingId 
      ? `http://localhost:4000/api/v1/reservation/update/${editingId}` 
      : "http://localhost:4000/api/v1/reservation/send";
    
    const method = editingId ? axios.put : axios.post;

    try {
      const { data } = await method(endpoint, {
        firstName,
        lastName,
        email,
        phone,
        date,
        time,
        seats
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success(data.message);
      resetForm();
      fetchReservations(); // Refresh reservations
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while processing the reservation");
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

  const editReservation = (reservation) => {
    setFirstName(reservation.firstName);
    setLastName(reservation.lastName);
    setEmail(reservation.email);
    setPhone(reservation.phone);
    setDate(reservation.date);
    setTime(reservation.time);
    setSeats(reservation.seats);
    setEditingId(reservation._id); // Set the ID of the reservation to be edited
  };

  const deleteReservation = async (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        const { data } = await axios.delete(`http://localhost:4000/api/v1/reservation/delete/${id}`);
        toast.success(data.message);
        fetchReservations(); // Refresh reservations after deletion
      } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting reservation");
      }
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setDate("");
    setTime("");
    setSeats("");
    setEditingId(null); // Reset editing ID
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
                {editingId ? "UPDATE RESERVATION" : "RESERVE NOW"}{" "}
                <span>
                  <HiOutlineArrowNarrowRight />
                </span>
              </button>
            </form>
            <button onClick={() => setShowReservations(!showReservations)} className="fetch-reservations-btn">
              {showReservations ? "HIDE CURRENT RESERVATIONS" : "SHOW CURRENT RESERVATIONS"}
            </button>
            {showReservations && reservations.length > 0 && (
              <div className="current-reservations">
                <h2>Current Reservations:</h2>
                <ul>
                  {reservations.map((reservation) => (
                    <li key={reservation._id}>
                      {reservation.firstName} {reservation.lastName} - {reservation.date} at {reservation.time} for {reservation.seats} seats
                      <button onClick={() => editReservation(reservation)}>Edit</button>
                      <button onClick={() => deleteReservation(reservation._id)}>Delete</button>
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
