import { Request, Response } from 'express';
import { pool, subscriptionPrice } from '.';
import {
    respondWithBadRequestError,
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

export async function createMovie(req: Request, res: Response) {
    let {
        mb_id,
        genres,
        age_restriction,
        title,
        description,
        poster_url,
        video_url,
        director,
        writers,
        cast,
        release_date,
        movie_duration,
    } = req.body;

    if (!mb_id) mb_id = null;
    let formattedReleaseDate = null;
    if (release_date) {
        formattedReleaseDate = release_date
            ? new Date(release_date).toISOString().split('T')[0]
            : null;
    }

    if (
        !genres ||
        !age_restriction ||
        !title ||
        !description ||
        !poster_url ||
        !video_url ||
        !director ||
        !writers ||
        !cast ||
        !movie_duration
    ) {
        respondWithBadRequestError(res, 'All fields are required.');
        return;
    }

    try {
        const conn = await pool.getConnection();
        await conn.query(
            `INSERT INTO movie (mb_id, genres, age_restriction, title, description, poster_url, video_url, director, writers, cast, release_date, movie_duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                mb_id,
                genres,
                age_restriction,
                title,
                description,
                poster_url,
                video_url,
                director,
                writers,
                cast,
                formattedReleaseDate,
                movie_duration,
            ]
        );
        conn.release();

        respondWithSuccess(res, null);
    } catch (err: any) {
        console.error(err);
        respondWithBadRequestError(res, err.message);
    }
}

export async function editMovie(req: Request, res: Response) {
    const id = req.params.id;
    let {
        mb_id,
        genres,
        age_restriction,
        title,
        description,
        poster_url,
        video_url,
        director,
        writers,
        cast,
        release_date,
        movie_duration,
    } = req.body;

    if (!mb_id) mb_id = null;
    let formattedReleaseDate = null;
    if (release_date) {
        formattedReleaseDate = release_date
            ? new Date(release_date).toISOString().split('T')[0]
            : null;
    }

    if (
        !genres ||
        !age_restriction ||
        !title ||
        !description ||
        !poster_url ||
        !video_url ||
        !director ||
        !writers ||
        !cast ||
        !release_date ||
        !movie_duration
    ) {
        respondWithBadRequestError(res, 'All fields are required.');
        return;
    }

    try {
        const conn = await pool.getConnection();
        await conn.query(
            `UPDATE movie SET mb_id = ?, genres = ?, age_restriction = ?, title = ?, description = ?, poster_url = ?, video_url = ?, director = ?, writers = ?, cast = ?, release_date = ?, movie_duration = ? WHERE id = ?;`,
            [
                mb_id,
                genres,
                age_restriction,
                title,
                description,
                poster_url,
                video_url,
                director,
                writers,
                cast,
                formattedReleaseDate,
                movie_duration,
                id,
            ]
        );
        conn.release();

        respondWithSuccess(res, null);
    } catch (err: any) {
        console.error(err);
        respondWithBadRequestError(res, err.message);
    }
}

export async function deleteMovie(req: Request, res: Response) {
    const id = req.params.id;

    try {
        const conn = await pool.getConnection();
        await conn.query(`DELETE FROM movie WHERE id = ?;`, [id]);
        conn.release();

        respondWithSuccess(res, null);
    } catch (err: any) {
        console.error(err);
        respondWithBadRequestError(res, err.message);
    }
}

export async function getMovies(req: Request, res: Response) {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query(
            `SELECT id, mb_id, genres, age_restriction, title, description, poster_url, director, writers, cast, release_date, movie_duration FROM movie;`
        );
        conn.release();

        respondWithSuccess(res, {
            movies: rows,
        });
    } catch (err: any) {
        console.error(err);
        respondWithBadRequestError(res, err.message);
    }
}

export async function getMovie(req: Request, res: Response) {
    const id = req.params.id;

    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query(`SELECT * FROM movie WHERE id = ?;`, [
            id,
        ]);
        conn.release();

        if (!rows || rows.length === 0) {
            respondWithNotFoundError(res);
            return;
        }

        respondWithSuccess(res, { movie: rows[0] });
    } catch (err: any) {
        console.error(err);
        respondWithBadRequestError(res, err.message);
    }
}
