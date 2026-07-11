import { useEffect, useState } from 'react';
import api from '../lib/api';
import ItemCard from '../components/ItemCard';

export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    api.get('/items', { params: { search, type } }).then(res => setItems(res.data));
  }, [search, type]);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="flex gap-2 mb-4">
        <input className="border p-2 flex-1 rounded" placeholder="Search items..." onChange={e => setSearch(e.target.value)} />
        <select className="border p-2 rounded" onChange={e => setType(e.target.value)}>
          <option value="">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(item => <ItemCard key={item._id} item={item} />)}
      </div>
    </div>
  );
}