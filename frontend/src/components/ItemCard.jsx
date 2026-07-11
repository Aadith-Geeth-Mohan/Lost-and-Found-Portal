import { Link } from 'react-router-dom';

export default function ItemCard({ item, index = 0 }) {
  const isLost = item.type === 'lost';

  return (
    <Link
      to={`/items/${item._id}`}
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden border border-primary-100 hover:border-primary-300 transition-all duration-500 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      {/* Image Container */}
      <div className="relative h-44 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <svg className="w-16 h-16 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Type Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
          isLost
            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
            : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
        }`}>
          {isLost ? '🔴 Lost' : '🟢 Found'}
        </div>

        {/* Status Badge */}
        {item.status === 'resolved' && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold bg-white/90 text-primary-700 shadow">
            Resolved
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-primary-800 text-lg mb-1 truncate group-hover:text-primary-600 transition-colors">
          {item.title}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs font-medium rounded-full border border-primary-100">
            {item.category || 'Uncategorized'}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{item.location || 'No location'}</span>
        </div>
      </div>

      {/* Hover Arrow */}
      <div className="absolute bottom-4 right-4 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
