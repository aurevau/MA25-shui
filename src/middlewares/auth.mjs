import { createError } from "@middy/util";
import { verifyToken } from "../utils/jwt.mjs";

const getUser = (event) => {
    const authHeader = event.headers?.authorization;
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];
    if (!token) throw createError(401, 'Token is missing');

    try {
        return verifyToken(token);
    } catch {
        throw createError(401, 'Invalid or expired token');
    }
};

// Token is missing == guest 
export const authenticateOptional = () => ({
    before: (handler) => {
        handler.event.user = getUser(handler.event);
    }
});