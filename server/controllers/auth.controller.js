import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import { createdAccesToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js"

// Create new user
export const registrar = async (req, res) => {
  const { nombre, email, admin } = req.body;

  try {
    const userFound = await Usuario.findOne({ email });
    if (userFound)
      return res.status(400).json(["El correo ya se encuentra registrado"]);

    // Use bcrypt
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    // New user data
    const newUser = new Usuario({
      nombre,
      email,
      admin,
      password: passwordHash,
    });

    // Save new user
    const userSaved = await newUser.save();
    // Create token
    const token = await createdAccesToken({
      id: userSaved._id,
      email: userSaved.email,
      admin: userSaved.admin,
    });
    // Cookie stored
    res.cookie("access_token", token, {
      httpOnly: true,
      // sameSite: 'none',
      // secure: true
    });
    // Response
    res.status(201).json({
      message: "Usuario creado correctamente!",
      data: {
        id: userSaved._id,
        nombre: userSaved.nombre,
        email: userSaved.email,
        // admin: userSaved.admin
        // token: token
      },
    });
  } catch (error) {
    // Error response
    res.status(500).json({
      message: error.message,
    });
  }
};
// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // User found
    const userFound = await Usuario.findOne({
      email,
    });
    // Validate response
    if (!userFound) {
      return res.status(400).json(["Usuario no encontrado"]);
    }
    // Compare password
    const passIsMatch = await bcrypt.compare(
      req.body.password,
      userFound.password
    );
    // If not match
    if (!passIsMatch) {
      return res.status(400).json({
        message: "Password incorrecto",
      });
    }
    // Create token
    const token = await createdAccesToken({
      id: userFound._id,
      email: userFound.email,
      admin: userFound.admin,
    });
    // Cookie stored
    res.cookie("access_token", token, {
      // httpOnly: true
    });
    // Response
    res.status(200).json({
      message: "Se ha iniciado sesión correctamente.",
      data: {
        id: userFound._id,
        nombre: userFound.nombre,
        email: userFound.email,
        // admin: userSaved.admin
        token: token,
      },
    });
  } catch (error) {
    // Error response
    res.status(500).json({
      message: error.message,
    });
  }
};
// logout
export const logout = (req, res) => {
  // Clear the session
  res.clearCookie("access_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  // Response
  res.status(200).json({
    message: "La conexión ha finalizado",
  });
};

export const perfil = async (req, res) => {
  const userFound = await Usuario.findById(req.user.id);

  if (!userFound) {
    return res.status(400).json({
      message: "El usuario no pudo ser encontrado.",
    });
  }

  return res.json({
    id: userFound._id,
    username: userFound.nombre,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
  // res.send('perfil');
};

export const verifyToken = async (req, res) => {
  const {access_token} = req.cookies

  if (!access_token) res.status(401).json({ message: 'No Autorizado'});

  jwt.verify(access_token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: 'No Autorizado'});

    const userFound = await Usuario.findById(user.id)
    if (!userFound) return res.status(401).json({ message: 'No Autorizado' });

    return res.json({
      id: userFound.id,
      user: userFound.nombre,
      email: userFound.email,
    })
  })
};