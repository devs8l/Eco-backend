import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reelRoutes from './routes/reelRoutes.js';
import authRoutes from './routes/auth.js';
import connectCloudinary from './config/cloudinary.js';
import signRoutes from './routes/signature.js';
import packageRoutes from './routes/packageRoute.js';
import roomRoutes from './routes/roomImages.js';
import galleryRoutes from './routes/gallery.js';

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
app.use('/api/pricing', packageRoutes);

//signature route for Cloudinary uploads
app.use('/api', signRoutes)

// Route for room images
app.use('/api/room-images',roomRoutes);

// Gallery route
app.use('/api/gallery',galleryRoutes);


app.get('/', (req, res) => {
  res.send('Eco Holiday API is running');
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});