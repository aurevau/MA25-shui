import middy from "@middy/core";
import { errorHandler } from "../../middlewares/errors.mjs";
import * as commentService from "../../services/comment-service.mjs";
import { sendResponse } from "../../utils/response.mjs";

const getComments = async (event) => sendResponse(200, await commentService.getComments(event.pathParameters.postId));

export const handler = middy(getComments).use(errorHandler());