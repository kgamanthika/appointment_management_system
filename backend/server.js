import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import appointmentRoutes from './routes/appointmentRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
