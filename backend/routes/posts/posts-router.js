import {Router} from "express";
import DEFAULT_ROUTER_OPTIONS from "../../default-router-options.js";
import expressErrorWrapper from "../../middlewares/express-error-wrapper.js";
import handleCreateNewPost from "./handle-create-new-post.js";
import handleGetPosts from "./handle-get-posts.js";

const postsRouter = Router(DEFAULT_ROUTER_OPTIONS);

postsRouter.get("/", expressErrorWrapper(handleGetPosts));
postsRouter.post("/", expressErrorWrapper(handleCreateNewPost));

export default postsRouter;