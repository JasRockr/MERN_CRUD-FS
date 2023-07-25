import { z } from "zod";

export const electionSchema = z.object({
  titulo: z.string({
    required_error: "El titulo de la elección es necesario",
  }),
  descripcion: z.string({
    required_error: "Debe incluirse una descripción para crear una elección",
  }),
  fecha: z.date().optional(),
});