import { Request, Response } from 'express';
import { pool, subscriptionPrice } from '.';
import { Movie } from './models';
import {
    respondWithBadRequestError,
    respondWithNotFoundError,
    respondWithSuccess,
} from './response';

export async function createMovie(req: Request, res: Response) {
    let {
        mb_id,
        genres,
        age_restriction,
        title,
        description,
        poster_url,
        video_url,
        directors,
        cast,
        release_date,
        movie_duration,
        trailer_url,
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
        !directors ||
        !cast ||
        !movie_duration ||
        !trailer_url
    ) {
        respondWithBadRequestError(res, 'All fields are required.');
        return;
    }

    try {
        const conn = await pool.getConnection();
        await conn.query(
            `INSERT INTO movie (mb_id, genres, age_restriction, title, description, poster_url, video_url, directors, cast, release_date, movie_duration, trailer_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                mb_id,
                genres,
                age_restriction,
                title,
                description,
                poster_url,
                video_url,
                directors,
                cast,
                formattedReleaseDate,
                movie_duration,
                trailer_url,
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
        directors,
        cast,
        release_date,
        movie_duration,
        trailer_url,
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
        !directors ||
        !cast ||
        !movie_duration ||
        !trailer_url
    ) {
        respondWithBadRequestError(res, 'All fields are required.');
        return;
    }

    try {
        const conn = await pool.getConnection();
        await conn.query(
            `UPDATE movie SET mb_id = ?, genres = ?, age_restriction = ?, title = ?, description = ?, poster_url = ?, video_url = ?, directors = ?, cast = ?, release_date = ?, movie_duration = ?, trailer_url = ? WHERE id = ?;`,
            [
                mb_id,
                genres,
                age_restriction,
                title,
                description,
                poster_url,
                video_url,
                directors,
                cast,
                formattedReleaseDate,
                movie_duration,
                trailer_url,
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
            `SELECT id, mb_id, genres, age_restriction, title, description, poster_url, directors, cast, release_date, movie_duration FROM movie;`
        );
        conn.release();

        let movies: Movie[];
        if (!rows) {
            movies = [];
        } else if (Array.isArray(rows)) {
            movies = rows;
        } else {
            movies = [rows];
        }

        respondWithSuccess(res, {
            movies,
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

        if (!rows) {
            respondWithNotFoundError(res);
            return;
        }

        respondWithSuccess(res, { movie: rows });
    } catch (err: any) {
        console.error(err);
        respondWithBadRequestError(res, err.message);
    }
}
