import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'El nombre completo debe tener al menos 3 caracteres' }),
  email: z.string().email({ message: 'El email no es válido' }),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty({
    message: 'El número de libreta universitaria no puede estar vacío',
  }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: 'El email no es válido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});
