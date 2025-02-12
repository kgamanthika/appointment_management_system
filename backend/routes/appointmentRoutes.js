import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { createAppointment, getAppointmentsByUserId } from '../models/appointment.js';
import { sendAppointmentEmail } from '../utils/emailUtils.js'; // Email sending logic

const router = express.Router();

// Create an appointment
router.post('/', authenticateToken, (req, res) => {
  const { date, time, description } = req.body;
  const userId = req.user.id;

  createAppointment(userId, date, time, description, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to book appointment' });
    }

    // Send email notification after creating appointment
    sendAppointmentEmail(req.user.email, { date, time, description });

    res.status(201).json({ message: 'Appointment booked successfully' });
  });
});

// Get appointments by user ID
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id;
  getAppointmentsByUserId(userId, (err, appointments) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch appointments' });
    }
    res.json(appointments);
  });
});

export default router;
