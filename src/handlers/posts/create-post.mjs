import middy from "@middy/core";
import { authenticateOptional } from "../../middlewares/auth.mjs";
import { errorHandler } from "../../middlewares/errors.mjs";
import { validate } from "../../middlewares/validate.mjs";
import { postSchema } from "../../models/posts.mjs";
import * as postService from "../../services/post-service.mjs";
import { sendResponse } from "../../utils/response.mjs";

const createPost = async (event) => sendResponse(201, await postService.createPost(event.input, event.user));

export const handler = middy(createPost)
    .use(authenticateOptional())
    .use(validate(postSchema))
    .use(errorHandler());