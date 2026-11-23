import middy from "@middy/core";
import { errorHandler } from "../../middlewares/errors.mjs";
import { listPostsQuerySchema } from "../../models/posts.mjs";
import * as postService from "../../services/post-service.mjs";
import { sendResponse } from "../../utils/response.mjs";
import { validate } from "../../middlewares/validate.mjs";

const listPosts = async (event) => sendResponse(200, await postService.listPosts(event.input.username));

export const handler = middy(listPosts)
    .use(validate(listPostsQuerySchema, 'query'))
    .use(errorHandler());