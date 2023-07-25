import Router from "express";
import {
  login,
  registrar,
  logout,
  perfil,
  verifyToken,
} from "../controllers/auth.controller.js";
import {
  adminUser,
  authToken,
} from "../middlewares/validateAuth.middleware.js";
import { validateSchema } from "../middlewares/validateData.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/registrar", validateSchema(registerSchema), registrar);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/perfil", authToken, perfil);

router.get("/verify", verifyToken);

export default router;
