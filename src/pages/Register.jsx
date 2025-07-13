import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/eventAPI";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

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
      <button className="w-full bg-green-600 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
