import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string({
    required_error: "El nombre de usuario es obligatorio",
  }),
  email: z
    .string({
      required_error: "El email es obligatorio",
    })
    .email({
      message: "Email invalido",
    }),
  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
  admin: z.boolean().optional(),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es obligatorio",
    })
    .email({
      message: "Email invalido",
    }),
  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});
