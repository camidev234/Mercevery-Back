import express from 'express';
import { testConnection } from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js'
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'
dotenv.config();

const app = express();

app.use(cors());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization'
};

app.use(cors(corsOptions));

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