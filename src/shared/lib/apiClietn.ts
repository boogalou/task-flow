import axios from 'axios';
import { AuthDataResponse } from '../types/types.ts';

const API_URL = `${import.meta.env.VITE_API_URL}`;

let token: string | null = null;

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export function setToken(newToken: string | null) {
  token = newToken;
}

export function getToken() {
  return token;
}

apiClient.interceptors.request.use((config) => {
  const currentToken = getToken();
  if (currentToken) {
    config.headers['Authorization'] = `Bearer ${currentToken}`;
  }
  return config;
});

async function refreshToken() {
  try {
    const response = await axios.post<AuthDataResponse>(
      API_URL + `/refresh`,
      {},
      { withCredentials: true },
    );

    const newToken = response.data.accessToken;
    if (newToken) {
      setToken(newToken);
    }

    return response;
  } catch (err) {
    return Promise.reject(err);
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const response = await refreshToken();
        const newToken = response.data.accessToken;
        if (newToken) {
          config.headers['Authorization'] = `Bearer ${newToken}`;
          return apiClient(config);
        }
      } catch (err) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
