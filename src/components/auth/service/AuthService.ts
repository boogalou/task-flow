import { apiClient } from '../../../shared/lib/axiosSettings.ts';
import axios, { AxiosResponse } from 'axios';
import {
  AuthDataResponse,
  LoginRequestData,
  RegistrationRequestData,
} from '../../../shared/types/types.ts';

class AuthService {
  public async signup(data: RegistrationRequestData): Promise<AxiosResponse<AuthDataResponse>> {
    return apiClient.post('/users/registration', data);
  }

  public async login(data: LoginRequestData): Promise<AxiosResponse<AuthDataResponse>> {
    return apiClient.post('/auth/login', data);
  }

  public async checkAuth(): Promise<AxiosResponse<AuthDataResponse>> {
    return axios.post(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {},
      { withCredentials: true },
    );
  }

  public async logout() {
    return await apiClient.post('/auth/logout');
  }

  // private async handleError<T>(execute: () => Promise<T>): Promise<T> {
  //   try {
  //     return await execute();
  //   } catch (err) {
  //     if (axios.isAxiosError(err)) {
  //       console.error(err.response?.data.message);
  //       throw new Error(err.response?.data.messages);
  //     }
  //   }
  //
  //   throw new Error('Unexpected error occurred');
  // }
}

export const authService = new AuthService();
