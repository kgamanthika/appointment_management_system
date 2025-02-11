import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BookAppointment from "./pages/BookAppointment";
import Home from "./pages/Home";
import MyAppointments from "./pages/MyAppointments";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/appointments" element={<MyAppointments />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
