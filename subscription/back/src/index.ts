import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mariadb from 'mariadb';

import { login, register } from './authController';
import {
    checkIfUserHasActiveSubscription,
    isAdmin,
    isUser,
    isUserSubscriptionActive,
} from './middleware';
import {
    createMovie,
    deleteMovie,
    editMovie,
    getMovie,
    getMovies,
} from './movieController';
import { checkIfSubscribed, subscribe } from './subscriptionController';

dotenv.config();

const app = express();
const authRouter = express.Router();
const movieRouter = express.Router();
const subscriptionRouter = express.Router();
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

authRouter.post('/signup', register);
authRouter.post('/login', login);

movieRouter.get('/', isUser, isUserSubscriptionActive, getMovies);
movieRouter.get('/:id', isUser, isUserSubscriptionActive, getMovie);
movieRouter.post('/create', isAdmin, createMovie);
movieRouter.patch('/:id', isAdmin, editMovie);
movieRouter.delete('/:id', isAdmin, deleteMovie);

subscriptionRouter.post('/subscribe', isUser, subscribe);
subscriptionRouter.get('/subscription/check', isUser, checkIfSubscribed);

var corsOptions: CorsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200,
    allowedHeaders: '*',
    methods: 'GET, POST, PATCH, DELETE',
};

app.use(cors(corsOptions));
app.use(prefix + '/auth', authRouter);
app.use(prefix + '/movies', movieRouter);
app.use(prefix, subscriptionRouter);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
