import {Router} from "express";
import DEFAULT_ROUTER_OPTIONS from "../../default-router-options.js";
import expressErrorWrapper from "../../middlewares/express-error-wrapper.js";
import handleGetUserFromUsername from "./handle-get-user-from-username.js";
import userPostsRouter from "../user-posts/user-posts-router.js";

const usersRouter = Router(DEFAULT_ROUTER_OPTIONS);

usersRouter.get("/:username", expressErrorWrapper(handleGetUserFromUsername));
usersRouter.use("/:username/posts", userPostsRouter);

export default usersRouter;