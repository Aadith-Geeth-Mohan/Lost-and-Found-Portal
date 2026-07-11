import { useEffect, useState } from 'react';
import api from '../lib/api';
import ItemCard from '../components/ItemCard';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.get('/items/mine').then(res => setItems(res.data)); }, []);

  const remove = async (id) => {
    await api.delete(`/items/${id}`);
    setItems(items.filter(i => i._id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-xl font-bold mb-4">My Reports</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item._id}>
            <ItemCard item={item} />
            <button onClick={() => remove(item._id)} className="text-red-600 text-sm mt-1">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}