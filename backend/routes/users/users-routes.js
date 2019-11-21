import {Router} from "express";
import DEFAULT_ROUTER_OPTIONS from "../../default-router-options.js";
import expressErrorWrapper from "../../middlewares/express-error-wrapper.js";
import handleGetUserFromId from "../users/handle-get-user-from-id.js";

const usersRouter = Router(DEFAULT_ROUTER_OPTIONS);

usersRouter.get("/users/:id", expressErrorWrapper(handleGetUserFromId));

export default usersRouter;