import Router from "express";
import {
  adminUser,
  authToken,
} from "../middlewares/validateAuth.middleware.js";
import {
  getCandidates,
  getCandidate,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from "../controllers/candidatos.controller.js";
import { candidateSchema } from "../schemas/candidatos.schema.js";
import { validateSchema } from "../middlewares/validateData.middleware.js";

const router = Router();

// Get all
router.get("/candidatos", authToken, getCandidates);
// Get By Id
router.get("/candidatos/:id", authToken, getCandidate);
// Post
router.post(
  "/candidatos",
  authToken,
  validateSchema(candidateSchema),
  createCandidate
);
// Put
router.put("/candidatos/:id", authToken, updateCandidate);
// Delete
router.delete("/candidatos/:id", authToken, adminUser, deleteCandidate);

export default router;
