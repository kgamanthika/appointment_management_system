import { useEffect, useState } from "react";
import { cancelAppointment, getUserAppointments } from "../services/api";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getUserAppointments(1); // Replace with dynamic user ID
      setAppointments(data);
    };
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    if (await cancelAppointment(id)) {
      alert("Appointment canceled!");
      setAppointments(appointments.filter((appt) => appt.id !== id));
    } else {
      alert("Error canceling appointment.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-green-100">
      <h1 className="text-3xl font-bold mb-4">My Appointments</h1>

      {appointments.length > 0 ? (
        appointments.map((appt) => (
          <div key={appt.id} className="p-4 border rounded mb-2 bg-white flex justify-between w-1/2">
            <span>{appt.time} - {appt.name}</span>
            <button onClick={() => handleCancel(appt.id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Cancel
            </button>
          </div>
        ))
      ) : (
        <p>No appointments found</p>
      )}
    </div>
  );
}

export default MyAppointments;
