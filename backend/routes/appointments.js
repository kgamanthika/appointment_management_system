const express = require('express');
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect these routes with authentication middleware
router.post('/', authMiddleware, async (req, res) => {
  const { userId, slotId } = req.body;
  try {
    const appointment = await Appointment.create({ userId, slotId });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error booking appointment', error });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ where: { userId: req.user.id } });
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointments', error });
  }
});

module.exports = router;
