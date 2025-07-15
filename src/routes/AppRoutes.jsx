import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MyBookings from "../pages/MyBookings";
import CreateEvent from "../pages/admin/CreateEvent";
import EventDetails from "../pages/EventDetails";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Events from "../pages/Events";
import CreateUser from "../pages/admin/CreateUser";
import GuestRoute from "./GuestRoute";
import AdminRoute from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import AllBookingsList from "../pages/admin/AllBookingsList";
import EditEvent from "../pages/admin/EditEvent";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event/:id" element={<EventDetails />} />

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <UserRoutes>
            <MyBookings />
          </UserRoutes>
        }
      />
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/createuser" element={<CreateUser />} />
        <Route path="/admin/allbookings" element={<AllBookingsList />} />
        <Route path="/admin/createevent" element={<CreateEvent />} />
        <Route path="/admin/editevent/:id" element={<EditEvent />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
