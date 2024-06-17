import express from 'express';
import sequelize from './config/database';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world in express')
})

sequelize.authenticate()
    .then(() => {
        console.log('Connected successfully');
    })
    .catch(err => {
        console.log('An error ocurred to connect to db:', err);
    })

app.listen(3000, () => {
    console.log('Running server');
})