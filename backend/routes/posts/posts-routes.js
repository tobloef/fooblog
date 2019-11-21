import {Router} from "express";
import DEFAULT_ROUTER_OPTIONS from "../../default-router-options.js";
import expressErrorWrapper from "../../middlewares/express-error-wrapper.js";
import handleGetPostFromSlug from "./handle-get-post-from-slug.js";
import handleCreateNewPost from "./handle-create-new-post.js";
import handleGetPosts from "./handle-get-posts.js";

const postsRouter = Router(DEFAULT_ROUTER_OPTIONS);

postsRouter.get("/posts", expressErrorWrapper(handleGetPosts));
postsRouter.get("/posts/:postSlug", expressErrorWrapper(handleGetPostFromSlug));
postsRouter.post("/posts", expressErrorWrapper(handleCreateNewPost));

export default postsRouter;