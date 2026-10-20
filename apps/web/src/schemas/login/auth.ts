import z from "zod";

export const loginSchema = z.object({
  email: z.email("Insira um e-mail válido"),
  password: z.string()
});

export type LoginFormData = z.infer<typeof loginSchema>;
