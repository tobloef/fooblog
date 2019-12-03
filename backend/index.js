import dotenv from "dotenv";
import setupApp from "./app.js";
import * as database from "./database/database.js";

/**
 * SetupScreen the environment, then start the express server
 * @returns {Promise<void>}
 */
async function start() {
    try {
        dotenv.config();
        const port = Number(process.env.PORT);
        if (Number.isNaN(port)) {
            throw new Error(`Invalid port ${process.env.PORT}.`);
        }
        await database.connect();
        const app = await setupApp();
        app.listen(port, () => console.info(`Started server on port ${port}.`));
    } catch (error) {
        console.error("Error starting server.", error);
    }
}

start();
