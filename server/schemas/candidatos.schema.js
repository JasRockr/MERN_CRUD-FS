import { z } from "zod";

export const candidateSchema = z.object({
  nombres: z.string({
    required_error: "El candidato debe tener al menos un nombre",
  }),
  apellidos: z.string({
    required_error: "El candidato debe tener al menos un apellido",
  }),
  ciudad: z.string({
    required_error: "El campo ciudad es obligatorio",
  }),
  slogan: z
    .string({
      required_error: "Se requiere un slogan para cada candidato",
    })
    .min(10, {
      message: "El Slogan debe tener mínimo 10 caracteres",
    }),
});
