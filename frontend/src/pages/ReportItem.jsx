import { useState } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function ReportItem() {
  const [form, setForm] = useState({ title: '', description: '', category: '', type: 'lost', location: '' });
  const [image, setImage] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append('image', image);
    await api.post('/items', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    nav('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-3 p-4">
      <h2 className="text-xl font-bold">Report Item</h2>
      <select className="border p-2 w-full rounded" onChange={e => setForm({ ...form, type: e.target.value })}>
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>
      <input className="border p-2 w-full rounded" placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea className="border p-2 w-full rounded" placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
      <input className="border p-2 w-full rounded" placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} />
      <input className="border p-2 w-full rounded" placeholder="Location" onChange={e => setForm({ ...form, location: e.target.value })} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button className="bg-green-600 text-white px-4 py-2 w-full rounded">Submit</button>
    </form>
  );
}