import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reelRoutes from './routes/reelRoutes.js';
import authRoutes from './routes/auth.js';
import connectCloudinary from './config/cloudinary.js';
import signRoutes from './routes/signature.js';

connectDB();
connectCloudinary();

const app = express();

app.use(cors({
  origin: '*', // Allow any origin
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false // Must be false when using wildcard origin
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/reels', reelRoutes);
app.use('/api/auth', authRoutes);

//signature route for Cloudinary uploads
app.use('/api', signRoutes)

app.get('/', (req, res) => {
  res.send('Eco Holiday API is running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});