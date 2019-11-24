import pgPromise from "pg-promise";
import timeoutablePromiseWrapper from "../timeoutable-promise-wrapper.js";

const TIMEOUT = 20 * 1000;

export let pgp;
export let db;

/**
 * Create a new connection to the database.
 * @returns {Promise<void>}
 */
export async function connect() {
    // noinspection JSUnresolvedVariable
    const pgpConfig = {
        query: (e) => {
            console.debug(`Executing database query: ${e.query != null ? e.query.trimEnd() : ""}`);
        },
        error: (error, e) => {
            console.error(`Error executing database query: ${e.query != null ? e.query.trimEnd() : ""}`, error);
        }
    };
    pgp = pgPromise(pgpConfig);
    const dbConfig = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        max: process.env.DB_CONNECTION_LIMIT || 10
    };
    console.info(`Connecting to DB (${dbConfig.database}) at (${dbConfig.user}@${dbConfig.host}:${dbConfig.port})`);
    db = pgp(dbConfig);
    await testConnection();
}

/**
 * Try to run a test query on the DB connection.
 * @returns {Promise<void>}
 */
export async function testConnection() {
    // noinspection ES6MissingAwait
    const promise = new Promise((async (resolve, reject) => {
        try {
            const result = await db.one("SELECT 1+1 AS test");
            if (result.test !== 2) {
                throw new Error(`Test result (${result.test}) didn't equal 2.`);
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    }));
    await timeoutablePromiseWrapper(TIMEOUT, promise);
}

export async function firstOrUndefined(query, params) {
    return (await db.any(query, params) || [])[0];
}