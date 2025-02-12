import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const BookingForm = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', { date, time, description });
      toast.success('Appointment booked successfully!');
      setDate('');
      setTime('');
      setDescription('');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          className="w-full p-2 mb-4 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          className="w-full p-2 mb-4 border rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 mb-4 border rounded"
          placeholder="Appointment description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
