import { z } from 'zod';

export const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(6, 'Ditt användarnamn måste bestå av minst 6 tecken')
        .max(15, 'Ditt användarnamn får som mest innehålla 15 tecken'),
    password: z
        .string()
        .min(8, 'Ditt lösenord måste innehålla minst 8 tecken')
        .max(72, 'Ditt lösenord får som mest innehålla 72 tecken')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Ditt lösenord måste innehålla minst en stor bokstav, en liten bokstav, en siffra och ett specialtecken'
        )
});

export const loginSchema = z.object({
    username: z.string().min(1, 'Användarnamn krävs'),
    password: z.string().min(1, 'Lösenord krävs'),
});
