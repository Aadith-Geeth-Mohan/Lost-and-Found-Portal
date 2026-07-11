require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

connectDB();

// normalize CLIENT_URL to avoid the missing-https CORS bug
const allowedOrigin = process.env.CLIENT_URL?.replace(/\/$/, '');
app.use(cors({ origin: allowedOrigin || '*' }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api/items', require('./routes/items.routes'));

app.listen(process.env.PORT || 5000, () => console.log('Backend running'));
