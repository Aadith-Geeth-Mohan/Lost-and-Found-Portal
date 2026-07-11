import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Admin() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.get('/items/admin/all').then(res => setItems(res.data)); }, []);

  const setStatus = async (id, status) => {
    await api.patch(`/items/admin/${id}/status`, { status });
    setItems(items.map(i => i._id === id ? { ...i, status } : i));
  };
  const remove = async (id) => {
    await api.delete(`/items/${id}`);
    setItems(items.filter(i => i._id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <table className="w-full text-sm border">
        <thead><tr className="bg-gray-100"><th className="p-2">Title</th><th>User</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map(i => (
            <tr key={i._id} className="border-t">
              <td className="p-2">{i.title}</td>
              <td>{i.user?.email}</td>
              <td>{i.status}</td>
              <td className="space-x-2">
                <button onClick={() => setStatus(i._id, 'resolved')} className="text-green-600">Resolve</button>
                <button onClick={() => remove(i._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}