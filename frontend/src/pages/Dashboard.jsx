import 'react';
import AppointmentList from '../components/AppointmentList';
import BookingForm from '../components/BookingForm';

const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <BookingForm />
      <AppointmentList />
    </div>
  );
};

export default Dashboard;
