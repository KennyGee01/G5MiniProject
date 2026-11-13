import express from 'express';
import reservationRoutes from './routes/reservationRoutes.js';

const app = express();

// Middleware to read JSON request bodies
app.use(express.json());


// Home route
app.get('/', (req, res) => {
    res.send('Welcome to restaurant reservation');
});

// Connect reservation routes
app.use('/reservations', reservationRoutes);

export default app;