import { sendResponse } from "../../utils/response.mjs";
import * as postService from "../../services/post-service.mjs";
import middy from "@middy/core";
import { authenticate } from "../../middlewares/auth.mjs";
import { authorizePostOwner } from "../../middlewares/authorize.mjs";
import { validate } from "../../middlewares/validate.mjs";
import { postSchema } from "../../models/posts.mjs";
import { errorHandler } from "../../middlewares/errors.mjs";

const updatePost = async (event) => sendResponse(200, await postService.updatePost(event.post, event.input));

export const handler = middy(updatePost)
    .use(authenticate())
    .use(authorizePostOwner())
    .use(validate(postSchema))
    .use(errorHandler());