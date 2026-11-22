import middy from "@middy/core";
import { errorHandler } from "../../middlewares/errors.mjs";
import { validate } from "../../middlewares/validate.mjs";
import { loginSchema } from "../../models/auth.mjs";
import * as authService from "../../services/auth-service.mjs";
import { sendResponse } from "../../utils/response.mjs";

const login = async (event) => sendResponse(200, await authService.login(event.input));

export const handler = middy(login).use(validate(loginSchema)).use(errorHandler());

