import { useState } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      nav('/');
    } catch (err) { alert(err.response?.data?.msg || 'Login failed'); }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4 p-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input className="border p-2 w-full rounded" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border p-2 w-full rounded" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-blue-600 text-white px-4 py-2 w-full rounded">Login</button>
    </form>
  );
}