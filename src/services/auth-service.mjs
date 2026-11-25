import bcrypt from "bcryptjs";
import { createError } from "@middy/util";
import * as users from '../repositories/users-repository.mjs';
import { signToken } from "../utils/jwt.mjs";

export const register = async ({ username, password }) => {
    const passwordHash = await bcrypt.hash(password, 10);
    const created = await users.createUser({ username, passwordHash });
    if (!created) throw createError(409, 'Username already exists');

    return { message: 'User registered successfully', username };
};

export const login = async ({ username, password }) => {
    const user = await users.getUser(username);
    const valid = user && (await bcrypt.compare(password, user.passwordHash));
    if (!valid) throw createError(401, 'Invalid username or password');

    return { message: 'Login successful', token: signToken(username), username };
}