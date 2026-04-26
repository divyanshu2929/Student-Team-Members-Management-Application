import axios from "axios";

export const API_BASE_URL = "http://localhost:5001/api";
export const UPLOADS_BASE_URL = "http://localhost:5001/uploads";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
