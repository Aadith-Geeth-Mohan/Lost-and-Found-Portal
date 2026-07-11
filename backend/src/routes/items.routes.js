const router = require('express').Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const Item = require('../models/Item');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

const storage = new CloudinaryStorage({ cloudinary, params: { folder: 'lost-found' } });
const upload = multer({ storage });

router.post('/', auth, upload.single('image'), async (req, res) => {
  const item = await Item.create({ ...req.body, user: req.user.id, image: req.file?.path });
  res.json(item);
});

router.get('/mine', auth, async (req, res) => res.json(await Item.find({ user: req.user.id })));

router.get('/', async (req, res) => {
  const { search, category, type } = req.query;
  const filter = {};
  if (search) filter.$text = { $search: search };
  if (category) filter.category = category;
  if (type) filter.type = type;
  res.json(await Item.find(filter).populate('user', 'name').sort({ createdAt: -1 }));
});

router.get('/:id', async (req, res) => res.json(await Item.findById(req.params.id).populate('user', 'name')));
router.put('/:id', auth, async (req, res) => res.json(await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', auth, async (req, res) => { await Item.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

router.get('/admin/all', auth, admin, async (req, res) => {
  res.json(await Item.find().populate('user', 'name email').sort({ createdAt: -1 }));
});
router.patch('/admin/:id/status', auth, admin, async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(item);
});

module.exports = router;