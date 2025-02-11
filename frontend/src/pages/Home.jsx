import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to Appointment Booking</h1>
      <p className="mt-4 text-lg">Book your appointment easily.</p>

      <div className="mt-6 space-x-4">
        <Link to="/book" className="bg-blue-500 text-white px-4 py-2 rounded">Book Appointment</Link>
        <Link to="/appointments" className="bg-green-500 text-white px-4 py-2 rounded">My Appointments</Link>
      </div>
    </div>
  );
}

export default Home;
