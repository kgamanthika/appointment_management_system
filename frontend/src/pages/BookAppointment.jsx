import { useEffect, useState } from "react";
import { bookAppointment, getAvailableSlots } from "../services/api";

function BookAppointment() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userDetails, setUserDetails] = useState({ name: "", contact: "" });

  useEffect(() => {
    const fetchSlots = async () => {
      const data = await getAvailableSlots();
      setSlots(data);
    };
    fetchSlots();
  }, []);

  const handleBooking = async () => {
    if (!selectedSlot || !userDetails.name || !userDetails.contact) {
      alert("Please fill all fields!");
      return;
    }

    const success = await bookAppointment({
      slot: selectedSlot,
      name: userDetails.name,
      contact: userDetails.contact,
    });

    if (success) {
      alert("Appointment booked successfully!");
      setSelectedSlot(null);
      setUserDetails({ name: "", contact: "" });
    } else {
      alert("Error booking appointment. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-blue-100">
      <h1 className="text-3xl font-bold mb-4">Book an Appointment</h1>

      <div className="mb-4">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          className="p-2 border rounded"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Contact:</label>
        <input
          type="text"
          className="p-2 border rounded"
          value={userDetails.contact}
          onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })}
        />
      </div>

      <h2 className="text-2xl font-semibold mt-6">Available Slots</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {slots.length > 0 ? (
          slots.map((slot) => (
            <button
              key={slot.id}
              className={`p-3 border rounded ${selectedSlot === slot.id ? "bg-green-500 text-white" : "bg-white"}`}
              onClick={() => setSelectedSlot(slot.id)}
            >
              {slot.time}
            </button>
          ))
        ) : (
          <p>No slots available</p>
        )}
      </div>

      <button onClick={handleBooking} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
        Confirm Booking
      </button>
    </div>
  );
}

export default BookAppointment;
