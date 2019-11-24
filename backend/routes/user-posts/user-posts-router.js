import {Router} from "express";
import DEFAULT_ROUTER_OPTIONS from "../../default-router-options.js";
import expressErrorWrapper from "../../middlewares/express-error-wrapper.js";
import handleGetUserPost from "./handle-get-user-post.js";
import handleGetUserPostComments from "./handle-get-user-post-comments.js";
import handleCreateUserPostComment from "./handle-create-user-post-comment.js";
import handleGetUserPosts from "./handle-get-user-posts.js";

const userPostsRouter = Router(DEFAULT_ROUTER_OPTIONS);

userPostsRouter.get("/", expressErrorWrapper(handleGetUserPosts));
userPostsRouter.get("/:urlSlug", expressErrorWrapper(handleGetUserPost));
userPostsRouter.get("/:urlSlug/comments", expressErrorWrapper(handleGetUserPostComments));
userPostsRouter.post("/:urlSlug/comments", expressErrorWrapper(handleCreateUserPostComment));

export default userPostsRouter;