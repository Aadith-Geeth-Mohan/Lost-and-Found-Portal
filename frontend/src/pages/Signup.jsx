import { useState } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', form);
      nav('/login');
    } catch (err) { alert(err.response?.data?.msg || 'Signup failed'); }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4 p-4">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      <input className="border p-2 w-full rounded" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="border p-2 w-full rounded" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border p-2 w-full rounded" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-blue-600 text-white px-4 py-2 w-full rounded">Sign Up</button>
    </form>
  );
}