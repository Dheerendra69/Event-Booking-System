import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import { warmUpBackend } from "./utils/coldStarts";

function App() {
  React.useEffect(() => {
    warmUpBackend(); 
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
