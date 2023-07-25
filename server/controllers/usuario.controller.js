import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";

export const getAll = async (req, res) => {
  try {
    const all = await Usuario.find();
    res.status(200).json(all);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const getUsuario = await Usuario.findById(req.params.id);
    res.status(getUsuario ? 200 : 400).json(
      getUsuario
        ? getUsuario
        : {
            id: req.params.id,
            message: "No se encontró el registro con el id especificado",
          }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// TODO: Validación que existe antes de intentar eliminarlo
export const deleteById = async (req, res) => {
  try {
    const rmUsuario = await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Registro eliminado correctamente!",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateById = async (req, res) => {
  try {
    const upUsuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(upUsuario);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default getAll;
