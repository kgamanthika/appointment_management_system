import { useEffect, useState } from "react";
import "./index.css";
import { bookAppointment, cancelAppointment, getAvailableSlots, getUserAppointments } from "./services/api";

function App() {
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");

  // Fetch available slots
  useEffect(() => {
    fetchSlots();
    fetchAppointments();
  }, []);

  const fetchSlots = async () => {
    const data = await getAvailableSlots();
    setSlots(data);
  };

  const fetchAppointments = async () => {
    const data = await getUserAppointments();
    setAppointments(data);
  };

  // Handle booking an appointment
  const handleBook = async (slotId) => {
    if (!userName || !contact) {
      alert("Please enter name and contact!");
      return;
    }
    await bookAppointment(userName, contact, slotId);
    fetchSlots();
    fetchAppointments();
    setUserName("");
    setContact("");
  };

  // Handle canceling an appointment
  const handleCancel = async (id) => {
    await cancelAppointment(id);
    fetchSlots();
    fetchAppointments();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Appointment Booking System</h1>

      {/* Input Form */}
      <div className="bg-white p-4 rounded shadow-md mb-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 mr-2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Contact"
          className="border p-2 mr-2"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>

      {/* Available Slots */}
      <h2 className="text-xl font-semibold text-green-700 mb-2">Available Slots</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {slots.length > 0 ? (
          slots.map((slot) => (
            <div key={slot.id} className="bg-white p-4 rounded shadow-md text-center">
              <p>{slot.date} - {slot.time}</p>
              <button
                className="bg-blue-500 text-white p-2 rounded mt-2"
                onClick={() => handleBook(slot.id)}
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p>No slots available</p>
        )}
      </div>

      {/* Booked Appointments */}
      <h2 className="text-xl font-semibold text-red-700 mt-6">Your Appointments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white p-4 rounded shadow-md text-center">
              <p>{appointment.date} - {appointment.time}</p>
              <p className="text-sm text-gray-600">Booked by: {appointment.user_name}</p>
              <button
                className="bg-red-500 text-white p-2 rounded mt-2"
                onClick={() => handleCancel(appointment.id)}
              >
                Cancel
              </button>
            </div>
          ))
        ) : (
          <p>No appointments booked</p>
        )}
      </div>
    </div>
  );
}

export default App;
