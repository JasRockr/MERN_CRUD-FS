import Candidato from "../models/candidato.model.js";

export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidato.find({
      // >> Consultar unicamente los candidatos creados por el usuario autenticado
      // usuario: req.user.id
    }).populate("usuario");
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createCandidate = async (req, res) => {
  const { nombres, apellidos, ciudad, slogan, estado } = req.body;

  try {
    const newCandidato = new Candidato({
      nombres,
      apellidos,
      ciudad,
      slogan,
      estado,
      usuario: req.user.id,
    });

    const savedCandidate = await newCandidato.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCandidate = async (req, res) => {
  try {
    const candidate = await Candidato.findById(req.params.id).populate(
      "usuario"
    );
    res.status(candidate ? 200 : 404).json(
      candidate
        ? candidate
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

export const updateCandidate = async (req, res) => {
  try {
    const modCandidate = await Candidato.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(modCandidate ? 200 : 404);
    res.json(
      modCandidate
        ? modCandidate
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
export const deleteCandidate = async (req, res) => {
  try {
    const delCandidate = await Candidato.findByIdAndDelete(req.params.id);
    res.status(delCandidate ? 204 : 404);
    res.json(
      delCandidate
        ? delCandidate
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
