import express from 'express';
import { testConnection } from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js'
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
dotenv.config();

const app = express();

app.use(express.json());

testConnection();

app.get('/', (req, res) => {
    res.send('Hello world in express')
});

app.use('/api', userRoutes);
app.use('/api', companyRoutes);
app.use('/api', authRoutes);

app.listen(3000, () => {
    console.log('Running server');
})