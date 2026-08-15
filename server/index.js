import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/healthRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount routes
app.use('/api/v1', routes);

// Basic root route
app.get('/', (req, res) => {
  res.json({ message: 'Bank Backend API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});