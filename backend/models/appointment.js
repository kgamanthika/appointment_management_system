import db from '../config/db.js';

export const createAppointment = (userId, date, time, description, callback) => {
  db.query(
    'INSERT INTO appointments (userId, date, time, description) VALUES (?, ?, ?, ?)',
    [userId, date, time, description],
    callback
  );
};

export const getAppointmentsByUserId = (userId, callback) => {
  db.query('SELECT * FROM appointments WHERE userId = ?', [userId], callback);
};
