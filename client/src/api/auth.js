import axios from "./axios";

export const registerRequest = (user) => axios.post(`/registrar`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get(`/verify`);

export const logoutRequest = () => axios.post(`/logout`);
