console.log('✅ Server started. __dirname =', __dirname);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const laundryRoutes = require('./routes/laundryRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/laundry', laundryRoutes);

app.get('/', (req, res) => res.send('Laundry Management System Backend Running'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// DB and Server
const PORT = process.env.PORT || 5500;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection failed:', err));
