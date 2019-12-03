import express from "express";
import cors from "cors";
import expressErrorWrapper from "./middlewares/express-error-wrapper.js";
import createReqLocals from "./middlewares/create-req-locals.js";
import setAuthTokenFromHeader from "./middlewares/set-auth-token-from-header.js";
import handleEndpointNotFound from "./routes/misc/handle-endpoint-not-found.js";
import usersRouter from "./routes/users/users-router.js";
import authRouter from "./routes/auth/auth-router.js";
import postsRouter from "./routes/posts/posts-router.js";
import {setUserFromAuthToken} from "./middlewares/set-user-from-auth-token.js";

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
    app.use(expressErrorWrapper(setUserFromAuthToken));
}

/**
 * Configure an Express app's root high-level routes
 * @param app The Express app
 */
function configureRoutes(app) {
    app.use("/users", usersRouter);
    app.use("/posts", postsRouter);
    app.use("/auth", authRouter);

    app.all("*", expressErrorWrapper(handleEndpointNotFound));
}

/**
 * Configure error handling for an Express app
 * @param app The Express app
 */
function configureErrorHandler(app) {
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

/**
 * Create and configure an express app with a database.
 * @returns {Promise<Express>}
 */
async function setupApp() {
    const app = express();
    configureMiddlewares(app);
    configureRoutes(app);
    configureErrorHandler(app);
    return app;
}

export default setupApp;