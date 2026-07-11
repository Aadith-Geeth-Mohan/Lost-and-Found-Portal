import { useEffect, useState } from 'react';
import api from '../lib/api';
import ItemCard from '../components/ItemCard';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/items/mine')
      .then(res => { setItems(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const remove = async (id) => {
    if (!confirm('Delete this report?')) return;
    await api.delete(`/items/${id}`);
    setItems(items.filter(i => i._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary-800">My Dashboard</h1>
            <p className="text-gray-500 text-sm">Manage your reported items</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
              <svg className="w-12 h-12 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-primary-700 mb-2">No reports yet</h3>
            <p className="text-gray-500 mb-6">Start by reporting a lost or found item</p>
            <a
              href="/report"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Report an Item
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''} reported</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {items.map((item, i) => (
                <div key={item._id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
                  <ItemCard item={item} index={0} />
                  <button
                    onClick={() => remove(item._id)}
                    className="w-full mt-2 py-2 text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-xl border border-red-100 transition-all duration-200 flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="h-44 bg-gradient-to-r from-primary-100 to-primary-200 animate-shimmer bg-[length:200%_100%]" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-primary-100 rounded-lg w-3/4 animate-shimmer bg-[length:200%_100%]" />
        <div className="h-4 bg-primary-50 rounded-lg w-1/2 animate-shimmer bg-[length:200%_100%]" />
      </div>
    </div>
  );
}
