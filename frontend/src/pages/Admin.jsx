import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Admin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/items/admin/all')
      .then(res => { setItems(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const setStatus = async (id, status) => {
    try {
      await api.patch(`/items/admin/${id}/status`, { status });
      setItems(items.map(i => i._id === id ? { ...i, status } : i));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this item? This cannot be undone.')) return;
    try {
      await api.delete(`/items/${id}`);
      setItems(items.filter(i => i._id !== id));
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary-800">Admin Panel</h1>
            <p className="text-gray-500 text-sm">Manage all reported items</p>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg border border-primary-100 overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-primary-500">Loading items...</p>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-primary-700 mb-2">No items reported yet</h3>
            <p className="text-gray-500">Items reported by users will appear here</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-primary-100 overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                    <th className="px-5 py-4 text-left font-semibold">Title</th>
                    <th className="px-5 py-4 text-left font-semibold">Owner</th>
                    <th className="px-5 py-4 text-left font-semibold">Type</th>
                    <th className="px-5 py-4 text-left font-semibold">Status</th>
                    <th className="px-5 py-4 text-left font-semibold">Date</th>
                    <th className="px-5 py-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-100">
                  {items.map((item, i) => (
                    <tr
                      key={item._id}
                      className={`hover:bg-primary-50/50 transition-colors duration-150 animate-fade-in ${i % 2 === 0 ? 'bg-white' : 'bg-primary-50/30'}`}
                      style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-primary-100" />
                          )}
                          <div>
                            <p className="font-semibold text-primary-800 truncate max-w-[180px]">{item.title}</p>
                            <p className="text-xs text-gray-400">{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{item.user?.email || 'Unknown'}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                          item.type === 'lost'
                            ? 'bg-red-50 text-red-600 border border-red-100'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                          item.status === 'resolved'
                            ? 'bg-green-50 text-green-600 border border-green-100'
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs">
                        {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {item.status !== 'resolved' && (
                            <button
                              onClick={() => setStatus(item._id, 'resolved')}
                              className="px-3 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-100 transition-all duration-150 flex items-center gap-1"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Resolve
                            </button>
                          )}
                          <button
                            onClick={() => remove(item._id)}
                            className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-100 transition-all duration-150 flex items-center gap-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
