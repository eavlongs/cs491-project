import dotenv from 'dotenv';
import express from 'express';
import mariadb from 'mariadb';
import { login, register } from './authController';
import { isAdmin, isUser, isUserSubscriptionActive } from './middleware';
import {
    createMovie,
    deleteMovie,
    editMovie,
    getMovie,
    getMovies,
    subscribe,
} from './movieController';

dotenv.config();

const app = express();
const authRouter = express.Router();
const movieRouter = express.Router();
const port = parseInt(process.env.API_PORT || '8081');
export const subscriptionPrice = parseInt(
    process.env.SUBSCRIPTION_PRICE || '10'
);

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Create a pool for MariaDB connection
export const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT || '3309'),
});

const prefix = process.env.API_ROUTE_PREFIX || '/'; // Middleware to parse JSON

app.use(express.json());

authRouter.post('/register', register);
authRouter.post('/login', login);

movieRouter.post('/subscribe', isUser, subscribe);
movieRouter.get('/movies', isUser, isUserSubscriptionActive, getMovies);
movieRouter.get('/movies/:id', isUser, isUserSubscriptionActive, getMovie);
movieRouter.post('/movies', isAdmin, createMovie);
movieRouter.patch('/movies/:id', isAdmin, editMovie);
movieRouter.delete('/movies/:id', isAdmin, deleteMovie);

app.use(prefix + '/auth', authRouter);
app.use(prefix, movieRouter);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
