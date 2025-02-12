import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments');
        setAppointments(response.data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Failed to load appointments');
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
      <ul>
        {appointments.length === 0 ? (
          <p>No appointments booked yet</p>
        ) : (
          appointments.map((appointment) => (
            <li key={appointment.id} className="border p-2 mb-2">
              <span>{appointment.date}</span> - <span>{appointment.time}</span>
              <p>{appointment.description}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AppointmentList;
