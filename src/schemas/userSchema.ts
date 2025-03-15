import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  lastName: z.string().min(2, { message: "O sobrenome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }).optional(),
  lastName: z.string().min(2, { message: "O sobrenome deve ter pelo menos 2 caracteres" }).optional(),
  email: z.string().email({ message: "E-mail inválido" }).optional(),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;