import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import requestsRouter from './routes/requests.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/requests', requestsRouter);

app.post('/api/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  }); 