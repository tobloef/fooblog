import {Router} from "express";
import DEFAULT_ROUTER_OPTIONS from "../../default-router-options.js";
import expressErrorWrapper from "../../middlewares/express-error-wrapper.js";
import handleGetUserFromUsername from "./handle-get-user-from-username.js";

const usersRouter = Router(DEFAULT_ROUTER_OPTIONS);

usersRouter.get("/users/:username", expressErrorWrapper(handleGetUserFromUsername));

export default usersRouter;