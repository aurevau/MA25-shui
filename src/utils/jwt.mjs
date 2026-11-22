import jwt from 'jsonwebtoken';

export const signToken = (username) => jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
