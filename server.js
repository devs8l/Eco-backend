import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';

connectDB();

const app = express();

app.use(cors());


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing form data

// Routes
app.use('/api/bookings', bookingRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});