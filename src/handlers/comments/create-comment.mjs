import { sendResponse } from "../../utils/response.mjs";
import middy from "@middy/core";
import * as commentService from "../../services/comment-service.mjs";
import { authenticate } from "../../middlewares/auth.mjs";
import { errorHandler } from "../../middlewares/errors.mjs";
import { validate } from "../../middlewares/validate.mjs";
import { commentSchema } from "../../models/comments.mjs";


const createComment = async (event) => sendResponse(
    201,
    await commentService.createComment(event.pathParameters.postId, event.input, event.user)
);

export const handler = middy(createComment)
    .use(authenticate())
    .use(validate(commentSchema))
    .use(errorHandler());