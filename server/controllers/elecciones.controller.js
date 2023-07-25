import Eleccion from "../models/eleccion.model.js";

export const getElections = async (req, res) => {
  try {
    const all = await Eleccion.find();
    res.status(200).json(all);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getElection = async (req, res) => {
  try {
    const getEleccion = await Eleccion.findById(req.params.id);
    res.status(getEleccion ? 200 : 400).json(
      getEleccion
        ? getEleccion
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

export const createElection = async (req, res) => {
  const newEleccion = new Eleccion(req.body);
  try {
    const saved = await newEleccion.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// TODO: Validación que existe antes de intentar eliminarlo
export const deleteElection = async (req, res) => {
  try {
    const rmEleccion = await Eleccion.findByIdAndDelete(req.params.id);
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

export const updateElection = async (req, res) => {
  try {
    const upEleccion = await Eleccion.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(upEleccion);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
