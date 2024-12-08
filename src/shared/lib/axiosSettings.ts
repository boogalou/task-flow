import axios from 'axios';
import { setAuthData } from '../../entities/auth/model/auth.slice.ts';
import { AuthDataResponse } from '../types/types.ts';

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export function setupInterceptors(store: any) {
  apiClient.interceptors.request.use((config) => {
    const token = store.getState().authSlice.authData?.accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  apiClient.interceptors.response.use(
    async (response) => {
      return response;
    },

    async (error) => {
      const config = error.config;

      if (error.response && error.response.status === 401 && !config._retry) {
        config._retry = true;
        try {
          const response = await refreshToken();
          const token: string = response.data.accessToken;
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            return apiClient(config);
          }
        } catch (err) {
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    },
  );

  async function refreshToken() {
    try {
      const response = await axios.post<AuthDataResponse>(
        API_URL + `/auth/refresh`,
        {},
        { withCredentials: true },
      );

      const data = response.data;
      if (data) {
        store.dispatch(setAuthData(data));
      }

      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
