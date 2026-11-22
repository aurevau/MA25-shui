import jwt from 'jsonwebtoken';

export const signToken = (username) => jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });