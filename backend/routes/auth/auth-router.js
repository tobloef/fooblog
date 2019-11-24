import {Router} from "express";
import DEFAULT_ROUTER_OPTIONS from "../../default-router-options.js";
import expressErrorWrapper from "../../middlewares/express-error-wrapper.js";
import handleLogin from "../auth/handle-login.js";
import handleRegister from "../auth/handle-register.js";

const authRouter = Router(DEFAULT_ROUTER_OPTIONS);

authRouter.post("/login", expressErrorWrapper(handleLogin));
authRouter.post("/register", expressErrorWrapper(handleRegister));

export default authRouter;