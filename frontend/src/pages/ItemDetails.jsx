import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api';

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => { api.get(`/items/${id}`).then(res => setItem(res.data)); }, [id]);
  if (!item) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-8 px-4">
      {item.image && <img src={item.image} className="w-full h-64 object-cover rounded mb-4" />}
      <h2 className="text-2xl font-bold">{item.title}</h2>
      <p className="text-gray-500">{item.type} • {item.category}</p>
      <p className="mt-2">{item.description}</p>
      <p className="mt-2 text-sm">📍 {item.location}</p>
      <p className="text-sm text-gray-400">Reported by {item.user?.name}</p>
    </div>
  );
}