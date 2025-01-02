import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, pool } from '.';
import { respondWithBadRequestError, respondWithSuccess } from './response';

export async function register(req: Request, res: Response) {
    const {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
    } = req.body;

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
}

export async function login(req: Request, res: Response) {
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
}
