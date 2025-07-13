import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import MyBookings from "../pages/MyBookings";
import CreateEvent from "../pages/CreateEvent";
import EventDetails from "../pages/EventDetails";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Events from "../pages/Events";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("private routes not allowed for you");
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Admin routes not allowed for you");
  return user?.role === "admin" ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/events" element={<Events />} />
      <Route path="/" element={<Home />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route
        path="/bookings"
        element={
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-event"
        element={
          <AdminRoute>
            <CreateEvent />
          </AdminRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
