import dotenv from 'dotenv';
import mariadb from 'mariadb';

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT || '3309'),
});

async function migrate() {
    const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            is_admin BOOLEAN DEFAULT FALSE
        );
    `;

    const createUserSubscriptionTableQuery = `
            CREATE TABLE IF NOT EXISTS user_subscription (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                starts_at DATETIME NOT NULL,
                ends_at DATETIME NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            );
    `;

    const createPaymentTableQuery = `
        CREATE TABLE IF NOT EXISTS payment (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            card_number VARCHAR(16) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        );
    `;

    const createMovieTableQuery = `
        CREATE TABLE IF NOT EXISTS movie (
            id INT AUTO_INCREMENT PRIMARY KEY,
            mb_id INT,
            genres VARCHAR(255),
            age_restriction VARCHAR(50),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            poster_url TEXT,
            video_url TEXT,
            director VARCHAR(255),
            writers VARCHAR(255),
            cast VARCHAR(255),
            release_date DATE,
            movie_duration INT
    );`;

    let conn;
    try {
        conn = await pool.getConnection();
        console.log('Migrating: Creating users table...');
        await conn.query(createUserTableQuery);
        console.log('Users table created successfully.');
        console.log();

        console.log('Migrating: Creating user subscription table...');
        await conn.query(createUserSubscriptionTableQuery);
        console.log('User subscription table created successfully.');
        console.log();

        console.log('Migrating: Creating payment table...');
        await conn.query(createPaymentTableQuery);
        console.log('Payment table created successfully.');

        console.log('Migrating: Creating movie table...');
        await conn.query(createMovieTableQuery);
        console.log('Movie table created successfully.');
        console.log();
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        if (conn) conn.release();
    }
}

migrate().then(() => {
    console.log('Migration completed.');
    pool.end();
});
