import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Change if backend runs on a different port

// Fetch available time slots
export const getAvailableSlots = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/slots`);
    return response.data;
  } catch (error) {
    console.error("Error fetching slots:", error);
    return [];
  }
};

// Book an appointment
export const bookAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData);
    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error);
    return null;
  }
};

// Get user appointments
export const getUserAppointments = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

// Cancel an appointment
export const cancelAppointment = async (appointmentId) => {
  try {
    await axios.delete(`${API_BASE_URL}/appointments/${appointmentId}`);
    return true;
  } catch (error) {
    console.error("Error canceling appointment:", error);
    return false;
  }
};
