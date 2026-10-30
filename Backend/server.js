const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
   // Only your own site may call this API (set CLIENT_ORIGIN in .env, comma-separated if several)
   const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173,http://localhost:5174')
     .split(',').map((o) => o.trim().replace(/\/$/, ''));
   app.use(cors({
     origin: (origin, cb) => (!origin || allowedOrigins.includes(origin) ? cb(null, true) : cb(new Error('Not allowed by CORS'))),
   }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Note: Removed static file serving - now using Cloudinary for all uploads
   // Slow down password guessing and contact-form spam
   app.use('/api/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { message: 'Too many login attempts. Try again in 15 minutes.' } }));
   app.use('/api/auth/account', rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { message: 'Too many attempts. Try again in 15 minutes.' } }));
   app.use('/api/contact', (req, res, next) => (req.method === 'POST' ? rateLimit({ windowMs: 60 * 60 * 1000, max: 10, message: { message: 'Too many messages. Please try later.' } })(req, res, next) : next()));
// Routes
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/upload', require('./routes/upload'));
// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio Backend API is running!' });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;