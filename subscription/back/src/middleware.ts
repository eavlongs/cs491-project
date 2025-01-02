import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, pool } from '.';
import { respondWithBadRequestError } from './response';
import { User } from './models';

export function parseJWTToken(req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return null;
    }

    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}

export async function isUser(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        respondWithBadRequestError(res, 'Unauthorized: No token provided');
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET) as User;
        // @ts-ignore
        req.user = payload;
        next();
    } catch (err: any) {
        respondWithBadRequestError(res, 'Invalid token');
    }
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        respondWithBadRequestError(res, 'Unauthorized: No token provided');
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET) as User;
        if (!payload.isAdmin) {
            return respondWithBadRequestError(
                res,
                'Unauthorized: Not an admin'
            );
        }
        // @ts-ignore
        req.user = payload;
        next();
    } catch (err: any) {
        respondWithBadRequestError(res, 'Invalid token');
    }
}

export async function isUserSubscriptionActive(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // @ts-ignore
    const user = req.user;
    if (user.isAdmin) {
        next();
        return;
    }

    const conn = await pool.getConnection();

    const [rows] = await conn.query(
        `SELECT * FROM user_subscription WHERE user_id = ? AND ends_at > NOW();`,
        [user.id]
    );

    conn.release();

    if (rows && rows.length === 0) {
        respondWithBadRequestError(res, 'No active subscription');
        return;
    }

    next();
}
