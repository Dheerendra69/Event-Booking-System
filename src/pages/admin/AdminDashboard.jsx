import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import AllBookingsList from "./AllBookingsList";
import CreateEvent from "./CreateEvent";
import CreateUser from "./CreateUser";
const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-100 border-r p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <NavLink
          to="/admin/allbookings"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-800 hover:bg-gray-200"
            }`
          }
        >
          📋 All Bookings
        </NavLink>
        <NavLink
          to="/admin/createevent"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-800 hover:bg-gray-200"
            }`
          }
        >
          🗓️ Create Event
        </NavLink>
        <NavLink
          to="/admin/createuser"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-800 hover:bg-gray-200"
            }`
          }
        >
          👤 Create User
        </NavLink>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="all-bookings" element={<AllBookingsList />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="create-user" element={<CreateUser />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
