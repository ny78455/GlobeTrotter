import { useState } from "react";
import axios from "axios";

export default function AuthPage({ setUser }: { setUser: (u: any) => void }) {
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      setUser(res.data.user);
    } catch (err: any) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Mobile"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />
        <button
          className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
          onClick={register}
        >
          Register
        </button>
      </div>
    </div>
  );
}
