const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Get available slots
router.get('/slots', (req, res) => {
  db.query("SELECT * FROM slots WHERE booked = 0", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Book an appointment
router.post('/appointments', (req, res) => {
  const { userName, contact, slotId } = req.body;

  db.query("UPDATE slots SET booked = 1, user_name = ?, contact = ? WHERE id = ? AND booked = 0",
    [userName, contact, slotId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(400).json({ message: "Slot already booked" });
      res.json({ message: "Appointment booked successfully!" });
    }
  );
});

// Get user appointments
router.get('/appointments', (req, res) => {
  db.query("SELECT * FROM slots WHERE booked = 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Cancel an appointment
router.delete('/appointments/:id', (req, res) => {
  const { id } = req.params;
  
  db.query("UPDATE slots SET booked = 0, user_name = NULL, contact = NULL WHERE id = ? AND booked = 1",
    [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(400).json({ message: "No appointment found" });
      res.json({ message: "Appointment cancelled successfully!" });
    }
  );
});

module.exports = router;
