
import z from "zod";

export const teamSchema = z.object({
  name: z.string().min(2, "Ingresá al menos 2 caracteres"),
  email: z.email("Ingresá un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["admin", "usuario"]),
});
