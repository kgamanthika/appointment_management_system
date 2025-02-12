import db from '../config/db.js';

export const createUser = (email, password, callback) => {
  db.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password],
    callback
  );
};

export const findUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};
