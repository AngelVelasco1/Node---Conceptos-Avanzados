//? Dependencies
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
//? Enviroment Variables
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.text());

//? Routes
import storageUsers from './routes/users.js';
import storageAuth from './routes/auth.js';
import storageToken from './routes/token.js';
import storageSession from './routes/session.js';

//? Use routes
app.use('/users', storageUsers);
app.use('/auth', storageAuth);
app.use('/token', storageToken);
app.use('/session', storageSession);


//? Server
const config = JSON.parse(process.env.CONFIG)
app.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
})