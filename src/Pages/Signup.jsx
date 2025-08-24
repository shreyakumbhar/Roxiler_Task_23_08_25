// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/app";
import { validateEmail, validatePassword, validateName, validateAddress } from "../utils/validation";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
console.log("from",form);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validations
    if (!validateName(form.name)) return setError("Name must be 20–60 characters.");
    if (!validateEmail(form.email)) return setError("Invalid email.");
    if (!validatePassword(form.password)) return setError("Password must be 8–16 chars with uppercase & special char.");
    // if (!validateAddress(form.address)) return setError("Address too long (max 400).");

    try {
      setError("");
      // ✅ API call to backend (example: /auth/signup)
      const res = await api.post("http://localhost:4000/api/auth/signup", form);

      if (res.data.success) {
        alert("✅ User registered successfully!");
        navigate("/login"); // Redirect to login page
      } else {
        setError(res.data.message || "Signup failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3 w-80">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <button className="bg-green-500 text-white p-2 w-full rounded">Signup</button>
      </form>
    </div>
  );
}
