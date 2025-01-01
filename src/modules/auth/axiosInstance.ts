import axios from "axios";

const API_URL_BASE: string = "http://localhost:5098/";

export const axiosInstance = axios.create({
  baseURL: API_URL_BASE,
  withCredentials: true,
});
