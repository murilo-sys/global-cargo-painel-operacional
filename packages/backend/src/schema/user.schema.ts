import { z } from "zod";

export const userSchema = z.object({
  id: z.string().min(1, "O ID do usuário é obrigatório"),
  email: z.email("Formato de e-mail inválido"),
  name: z.string().min(1, "O nome do usuário é obrigatório"),
  defaultHub: z.string().trim().toUpperCase().optional().default("SAO").catch("SAO")
});

export type UserInput = z.infer<typeof userSchema>;
