import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import API from "./api/eventAPI";

function App() {
  React.useEffect(() => {
    fetch(`${API}/ping`)
      .then(() => {
        console.log("Backend pinged successfully");
      })
      .catch(() => {
        console.log("Backend ping failed");
      });
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
