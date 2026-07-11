const router = require('express').Router();
const multer = require('multer');
const Item = require('../models/Item');
const auth = require('../middleware/auth.middleware');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', auth, upload.single('image'), async (req, res) => {
  const item = await Item.create({ ...req.body, user: req.user.id });
  res.json(item);
});

router.get('/mine', auth, async (req, res) => res.json(await Item.find({ user: req.user.id })));
router.get('/:id', async (req, res) => res.json(await Item.findById(req.params.id).populate('user', 'name')));
router.put('/:id', auth, async (req, res) => res.json(await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', auth, async (req, res) => { await Item.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

module.exports = router;