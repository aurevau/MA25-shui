import { z } from 'zod';

export const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(6, 'Username must be at least 6 characters')
        .max(15, 'Username must be at most 15 characters'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(72, 'Password must be at most 72 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain an uppercase letter, a lowercase letter, a digit and a special character'
        )
});

export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});
