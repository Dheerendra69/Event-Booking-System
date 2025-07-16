import React, { useRef } from "react";
import { Navigate } from "react-router-dom";

const UserRoutes = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const alerted = useRef(false); 

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "user") {
    if (!alerted.current) {
      window.alert("This route is available for users only");
      alerted.current = true;
    }
    return <Navigate to="/" />;
  }

  return children;
};

export default UserRoutes;
