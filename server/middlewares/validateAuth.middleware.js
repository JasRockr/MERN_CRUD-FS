import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// Validate token authentication
export const authToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "No se encontró el token o no está autorizado." });
  }

  // Validate access
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "La autenticación del token ha fallado." });
    }
    // Data user
    req.user = user;
    next();
  });
};

// Validate user privileges
export const adminUser = (req, res, next) => {
  authToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.admin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "No tienes permiso para acceder a este recurso." });
    }
  });
};
