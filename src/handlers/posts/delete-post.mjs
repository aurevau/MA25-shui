import middy from "@middy/core";
import { authenticate } from "../../middlewares/auth.mjs";
import { authorizePostOwner } from "../../middlewares/authorize.mjs";
import { errorHandler } from "../../middlewares/errors.mjs";
import * as postService from "../../services/post-service.mjs";
import { sendResponse } from "../../utils/response.mjs";

const deletePost = async (event) => {
    await postService.deletePost(event.pathParameters.postId);
    return sendResponse(204);
};

export const handler = middy(deletePost)
    .use(authenticate())
    .use(authorizePostOwner())
    .use(errorHandler());