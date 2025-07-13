import axios from "axios";

const API = axios.create({
  baseURL: "https://event-booking-system-tqf3.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchEvents = () => API.get("/events");
export const fetchEventById = (id) => API.get(`/events/${id}`);
export const bookEvent = (event_id) => API.post("/bookings", { event_id });
export const login = (credentials) => API.post("/users/login", credentials);
export const register = (data) => API.post("/users/register", data);
export const fetchMyBookings = () => API.get("/bookings/me");
export const fetchAllBookings = () => API.get("/bookings/admin");

export default API;
