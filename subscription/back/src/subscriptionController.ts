import { Request, Response } from 'express';
import { pool, subscriptionPrice } from '.';
import { Movie } from './models';
import {
    respondWithBadRequestError,
    respondWithError,
    respondWithNotFoundError,
    respondWithSuccess,
} from './response';
import { checkIfUserHasActiveSubscription } from './middleware';

export async function subscribe(req: Request, res: Response) {
    try {
        // @ts-ignore
        const id = req.user.id;
        const { card_number: cardNumber } = req.body;

        if (!cardNumber) {
            respondWithBadRequestError(res, 'card number is required.');
            return;
        }

        const conn = await pool.getConnection();
        await conn.query(
            `INSERT INTO payment (user_id, amount, card_number, created_at) VALUES (?, ?, ?, NOW());`,
            [id, subscriptionPrice, cardNumber]
        );

        await conn.query(
            `INSERT INTO user_subscription (user_id, starts_at, ends_at) VALUES (?, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH));`,
            [id]
        );
        conn.release();
        respondWithSuccess(res, null);
    } catch (err: any) {
        console.error(err);
        respondWithBadRequestError(res, err.message);
    }
}

export async function checkIfSubscribed(req: Request, res: Response) {
    // @ts-ignore
    const subscribed = await checkIfUserHasActiveSubscription(req.user.id);

    if (subscribed) {
        respondWithSuccess(res, null);
    } else {
        respondWithError(res, 400, 'You have no active subscription');
    }
}
