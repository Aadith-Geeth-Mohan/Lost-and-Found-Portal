const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  type: { type: String, enum: ['lost', 'found'] },
  location: String,
  image: String,
  contact: String,
  status: { type: String, default: 'open' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
itemSchema.index({ title: 'text', description: 'text' });
itemSchema.index({ type: 1, category: 1, status: 1 });
module.exports = mongoose.model('Item', itemSchema);