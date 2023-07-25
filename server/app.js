import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import candidatosRoutes from "./routes/candidatos.routes.js";
import eleccionesRoutes from "./routes/elecciones.routes.js";

// App
const app = express();

// Middleware's
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Server Online...");
  console.log("Server Online...");
});
app.use("/api", authRoutes);
app.use("/api", candidatosRoutes);
app.use("/api", eleccionesRoutes);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Server Not Available";

  return res.status(errStatus).json({
    message: errMessage,
    success: false,
    status: errStatus,
  });
});

export default app;
