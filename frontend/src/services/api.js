import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get available time slots
export const getAvailableSlots = async () => {
  try {
    const response = await axios.get(`${API_URL}/slots`);
    return response.data;
  } catch (error) {
    console.error('Error fetching slots:', error);
    return [];
  }
};

// Book an appointment
export const bookAppointment = async (userName, contact, slotId) => {
  try {
    const response = await axios.post(`${API_URL}/appointments`, { userName, contact, slotId });
    return response.data;
  } catch (error) {
    console.error('Error booking appointment:', error);
    return null;
  }
};

// Get user appointments
export const getUserAppointments = async () => {
  try {
    const response = await axios.get(`${API_URL}/appointments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
};

// Cancel an appointment
export const cancelAppointment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling appointment:', error);
    return null;
  }
};
