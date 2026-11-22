import bcrypt from "bcryptjs";
import { createError } from "@middy/util";
import * as users from '../repositores/users.mjs';

export const register = async ({ username, password }) => {
    const passwordHash = await bcrypt.hash(password, 10);
    const created = await users.createUser({ username, passwordHash });
    if (!created) throw createError(409, 'Username already exists');

    return { message: 'User registered successfully', username };
};