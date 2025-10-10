import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { register } from "../api/eventAPI";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(90);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setShowLoader(true), 3000);

    try {
      await register(form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed or backend still starting...");
    } finally {
      setLoading(false);
      setShowLoader(false);
    }
  };

  useEffect(() => {
    if (!showLoader) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [showLoader]);

  if (showLoader) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        <div className="relative w-24 h-24">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute top-0 left-1/2 w-4 h-4 rounded-full"
              style={{
                backgroundColor:
                  i === 0 ? "#3B82F6" : i === 1 ? "#10B981" : "#F59E0B",
              }}
              animate={{
                rotate: 360,
                x: [0, 36, 0],
                y: [0, 36, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2 + i * 0.3,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <motion.p
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-lg font-medium text-gray-700"
        >
          ⚙️ Backend waking up... please wait{" "}
          <span className="font-semibold text-blue-600">{secondsLeft}s</span>
        </motion.p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-sm mx-auto mt-10 p-6 bg-white shadow rounded-lg space-y-4"
    >
      <h2 className="text-xl font-bold">Register</h2>

      <input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full border p-2 rounded"
        required
      />

      <button
        disabled={loading}
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        {loading ? "Please wait..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
