import express from 'express';
import { testConnection } from './config/database.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());

testConnection();

app.get('/', (req, res) => {
    res.send('Hello world in express')
});

app.use('/api', userRoutes);

app.listen(3000, () => {
    console.log('Running server');
})