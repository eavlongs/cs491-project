import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mariadb from 'mariadb';
import { respondWithBadRequestError, respondWithSuccess } from './response';

dotenv.config();

const app = express();
const authRouter = express.Router();
const port = parseInt(process.env.API_PORT || '8081');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Create a pool for MariaDB connection
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT || '3309'),
});

const prefix = process.env.API_ROUTE_PREFIX || '/'; // Middleware to parse JSON

app.use(express.json());

authRouter.post('/register', async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password) {
        respondWithBadRequestError(res, 'Email and password are required.');
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const conn = await pool.getConnection();
        const result = await conn.query(
            `INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES (?, ?, ?, ?, ?)`,
            [firstName, lastName, email, hashedPassword, false]
        );
        conn.release();

        const token = jwt.sign(
            {
                id: parseInt(result.insertId.toString()),
                first_name: firstName,
                last_name: lastName,
                email,
                is_admin: false,
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        respondWithSuccess(res, { token });
    } catch (err: any) {
        console.error(err);
        respondWithBadRequestError(res, err.message);
    }
});

// Login endpoint
authRouter.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        respondWithBadRequestError(res, 'Email and password are required.');
        return;
    }

    try {
        const conn = await pool.getConnection();
        const rows: any[] = await conn.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );
        conn.release();

        const user = rows[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            respondWithBadRequestError(res, 'Invalid email or password.');
            return;
        }

        const token = jwt.sign(
            {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                isAdmin: user.is_admin,
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        respondWithSuccess(res, { token });
    } catch (err: any) {
        console.error(err);
        respondWithBadRequestError(res, err.message);
    }
});

app.use(prefix + '/auth', authRouter);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
