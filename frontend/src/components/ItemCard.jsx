import { Link } from 'react-router-dom';
export default function ItemCard({ item }) {
  return (
    <Link to={`/items/${item._id}`} className="border rounded p-3 shadow-sm block hover:shadow-md">
      {item.image && <img src={item.image} className="h-32 w-full object-cover rounded mb-2" />}
      <h3 className="font-semibold">{item.title}</h3>
      <p className="text-sm text-gray-500">{item.type} • {item.category}</p>
      <p className="text-sm">{item.location}</p>
    </Link>
  );
}