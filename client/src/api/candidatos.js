import axios from "./axios";

export const getCandidatesRequest = () => axios.get("/candidatos");

export const getCandidateRequest = (id) => axios.get(`/candidatos/${id}`);

export const createCandidatesRequest = (candidate) =>
  axios.post("/candidatos", candidate);

export const updateCandidateRequest = (id, candidate) =>
  axios.put(`/candidatos/${id}`, candidate);

export const deleteCandidateRequest = (id) => axios.delete(`/candidatos/${id}`);
