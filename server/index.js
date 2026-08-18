import dotenv from 'dotenv';
import express from 'express';
import healthRouter from './routes/healthRoute.js';
import customerRouter from './routes/customerRoutes.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/api/v1', healthRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/customers', customerRouter);

// Basic root route
app.get('/', (req, res) => {
  res.json({ message: 'Bank Backend API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});