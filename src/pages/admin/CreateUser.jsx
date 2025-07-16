import { useState, useContext } from "react";
import axios from "../../api/eventAPI";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [message, setMessage] = useState("");

  if (user?.role !== "admin") {
    navigate("/unauthorized");
    return null;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/register", formData);
      setMessage("✅ User created successfully!");
      setFormData({ name: "", email: "", password: "", role: "organiser" });
    } catch (err) {
      setMessage("❌ Failed to create user. Maybe email already exists?");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Create User Credentials</h2>
      {message && <div className="mb-4 text-sm text-red-600">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
