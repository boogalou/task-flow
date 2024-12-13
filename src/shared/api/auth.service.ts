import { apiClient } from './_base-api.ts';
import axios, { AxiosResponse } from 'axios';
import { AuthResponse, LoginFormData, RegistrationFormData } from '../types/types.ts';

class AuthService {
  public async registration(data: RegistrationFormData): Promise<AxiosResponse<AuthResponse>> {
    return apiClient.post('/users/registration', data);
  }

  public async login(data?: LoginFormData): Promise<AxiosResponse<AuthResponse>> {
    return apiClient.post('/auth/login', data);
  }

  public async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    return axios.post(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {},
      { withCredentials: true },
    );
  }

  public async logout(): Promise<AxiosResponse<void>> {
    return apiClient.post('/auth/logout');
  }
}

export const authService = new AuthService();
