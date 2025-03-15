import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(1, { message: "O primeiro nome é obrigatório." }),
    lastName: z.string().min(1, { message: "O sobrenome é obrigatório." }),
    email: z.string().email({ message: "Email inválido." }),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  });
  
  export type RegisterInput = z.infer<typeof registerSchema>;