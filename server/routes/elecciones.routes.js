import Router from "express";
import {
  getElections,
  getElection,
  createElection,
  updateElection,
  deleteElection,
} from "../controllers/elecciones.controller.js";
import {
  adminUser,
  authToken,
} from "../middlewares/validateAuth.middleware.js";
import { electionSchema } from "../schemas/elecciones.schema.js";
import { validateSchema } from "../middlewares/validateData.middleware.js";

const router = Router();

// Get all
router.get("/elecciones", getElections);
// Get
router.get("/elecciones/:id", getElection);
// Post
router.post(
  "/elecciones",
  adminUser,
  validateSchema(electionSchema),
  createElection
);
// Delete
router.delete("/elecciones/:id", adminUser, deleteElection);
// Put
router.put(
  "/elecciones/:id",
  adminUser,
  validateSchema(electionSchema),
  updateElection
);

export default router;
