//? Dependencies
import express from 'express';
import dotenv from 'dotenv';
//? Enviroment Variables
dotenv.config();

const app = express();
app.use(express.json());

//? Routes
import storageUsers from './routes/users.js';
import storageAuth from './routes/auth.js';

//? Use routes
app.use('/users', storageUsers);
app.use('/auth', storageAuth);

//? Server
const config = JSON.parse(process.env.CONFIG)
app.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
})