import middy from "@middy/core";
import { errorHandler } from "../../middlewares/errors.mjs";
import { validate } from "../../middlewares/validate.mjs";
import { registerSchema } from "../../models/auth.mjs";
import * as authService from "../../services/auth-service.mjs";
import { sendResponse } from "../../utils/response.mjs";

const register = async (event) => sendResponse(201, await authService.register(event.input));

export const handler = middy(register).use(validate(registerSchema)).use(errorHandler());
