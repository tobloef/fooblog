import express from "express";
import cors from "cors";

/**
 * Configure an Express app's middlewares.
 * @param app The Express app
 */
function configureMiddlewares(app) {
    app.use(cors());
    app.options("*", cors());
    app.use(express.json());
    app.use(expressErrorWrapper(createReqLocals));
    app.use(expressErrorWrapper(setAuthTokenFromHeader("Authorization")));
}

/**
 * Configure an Express app's root high-level routes
 * @param app The Express app
 */
function configureRoutes(app) {
    app.use("/users", usersRouter());
    app.use("/auth", authRouter());

    app.all("*", expressErrorWrapper(handleEndpointNotFound));
}

/**
 * Configure error handling for an Express app
 * @param app The Express app
 */
function configureErrorHandler(app) {
    // noinspection JSUnresolvedVariable
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
        app.use((err, req, res, next) => {
            const message = (err.stack || err);
            console.error("Error handling request.", message);
            return res.status(500).send(message);
        });
    } else {
        app.use((err, req, res, next) => {
            const message = (err.stack || err).toString();
            console.error("Error handling request.", message);
            return res.status(500).send();
        });
    }
}

// noinspection JSValidateJSDoc
/**
 * Create and configure an express app with a database.
 * @returns {Promise<Express>}
 */
async function setupApp() {
    // Create and configure an Express app
    const app = express();
    configureMiddlewares(app);
    configureRoutes(app);
    configureErrorHandler(app);
    return app;
}

export default setupApp;