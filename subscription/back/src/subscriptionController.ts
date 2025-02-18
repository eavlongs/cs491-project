import { Request, Response } from 'express';
import { pool, subscriptionPrice } from '.';
import { checkIfUserHasActiveSubscription } from './middleware';
import { Payment } from './models';
import {
    respondWithBadRequestError,
    respondWithError,
    respondWithNotFoundError,
    respondWithSuccess,
} from './response';

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

export async function getSubscriptions(req: Request, res: Response) {
    try {
        const conn = await pool.getConnection();
        const rows: (Payment & {
            user_first_name: string;
            user_last_name: string;
            user_email: string;
        })[] = await conn.query(
            `SELECT
                p.id AS id,
                p.card_number AS card_number,
                p.amount AS amount,
                p.created_at AS created_at,
                u.first_name AS user_first_name,
                u.last_name AS user_last_name,
                u.email AS user_email
            FROM
                payment AS p
                INNER JOIN users AS u ON u.id = p.user_id
            ORDER BY
                p.created_at DESC;`
        );
        conn.release();

        if (!rows) {
            respondWithNotFoundError(res);
            return;
        }

        const subscriptions: (Payment & {
            user_name: string;
            user_email: string;
        })[] = rows.map((row) => {
            return {
                ...row,
                user_name: row.user_first_name + ' ' + row.user_last_name,
                user_first_name: undefined,
                user_last_name: undefined,
                amount: parseFloat(row.amount as any as string),
            };
        });

        respondWithSuccess(res, { subscriptions: subscriptions });
    } catch (err: any) {
        console.error(err);
        respondWithBadRequestError(res, err.message);
    }
}
