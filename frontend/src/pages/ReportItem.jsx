import { useState } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function ReportItem() {
  const [form, setForm] = useState({ title: '', description: '', category: '', type: 'lost', location: '', contact: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);
      await api.post('/items', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      nav('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 py-10 px-4">
      <div className="max-w-xl mx-auto animate-scale-in">
        <div className="bg-white rounded-3xl shadow-2xl border border-primary-100 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Report an Item</h2>
            <p className="text-primary-100 mt-1 text-sm">Help reunite lost items with their owners</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Type Toggle */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary-700">Item Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, type: 'lost' })}
                  className={`py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 border-2 ${
                    form.type === 'lost'
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white border-transparent shadow-lg scale-105'
                      : 'bg-white text-red-500 border-red-200 hover:border-red-300 hover:bg-red-50'
                  }`}
                >
                  🔴 Lost Item
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, type: 'found' })}
                  className={`py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 border-2 ${
                    form.type === 'found'
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-transparent shadow-lg scale-105'
                      : 'bg-white text-emerald-500 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  🟢 Found Item
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-primary-700">Title</label>
              <input
                className="w-full px-4 py-3 bg-primary-50 border border-primary-200 rounded-xl text-primary-800 placeholder-primary-400 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200"
                placeholder="e.g. Black iPhone 14 Pro"
                required
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-primary-700">Description</label>
              <textarea
                className="w-full px-4 py-3 bg-primary-50 border border-primary-200 rounded-xl text-primary-800 placeholder-primary-400 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 resize-none"
                placeholder="Describe the item in detail..."
                rows={4}
                required
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary-700">Category</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-primary-50 border border-primary-200 rounded-xl text-primary-800 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 appearance-none cursor-pointer"
                    required
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="">Select</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Documents">Documents</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Keys">Keys</option>
                    <option value="Pet">Pet</option>
                    <option value="Other">Other</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary-700">Location</label>
                <input
                  className="w-full px-4 py-3 bg-primary-50 border border-primary-200 rounded-xl text-primary-800 placeholder-primary-400 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200"
                  placeholder="Where was it lost/found?"
                  required
                  onChange={e => setForm({ ...form, location: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-primary-700">Contact (phone or email)</label>
              <input
                className="w-full px-4 py-3 bg-primary-50 border border-primary-200 rounded-xl text-primary-800 placeholder-primary-400 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200"
                placeholder="How should people reach you?"
                required
                onChange={e => setForm({ ...form, contact: e.target.value })}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary-700">Image (optional)</label>
              <div className={`relative border-2 border-dashed rounded-xl transition-all duration-200 overflow-hidden ${
                preview ? 'border-primary-400 bg-primary-50' : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50'
              }`}>
                {preview ? (
                  <div className="relative p-4">
                    <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                    <button
                      type="button"
                      onClick={() => { setImage(null); setPreview(null); }}
                      className="absolute top-6 right-6 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center py-10 cursor-pointer">
                    <svg className="w-12 h-12 text-primary-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-primary-400 font-medium">Click to upload image</span>
                    <span className="text-xs text-primary-300 mt-1">PNG, JPG up to 5MB</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Submit Report
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
