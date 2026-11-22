import middy from "@middy/core";
import { errorHandler } from "../../middlewares/errors.mjs";
import * as postService from "../../services/post-service.mjs";
import { sendResponse } from "../../utils/response.mjs";

const getPost = async (event) => sendResponse(200, await postService.getPost(event.pathParameters.postId));

export const handler = middy(getPost).use(errorHandler());