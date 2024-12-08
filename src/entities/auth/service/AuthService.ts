import { apiClient } from '../../../shared/lib/axiosSettings.ts';
import axios, { AxiosResponse } from 'axios';
import {
  AuthDataResponse,
  LoginRequestData,
  RegistrationRequestData,
} from '../../../shared/types/types.ts';
import { BaseService } from '../../../shared/lib/base.service.ts';

class AuthService extends BaseService {
  public async signup(data: RegistrationRequestData): Promise<AxiosResponse<AuthDataResponse>> {
    return this.handleRequest(apiClient.post('/users/registration', data));
  }

  public async login(data: LoginRequestData): Promise<AxiosResponse<AuthDataResponse>> {
    return this.handleRequest(apiClient.post('/auth/login', data));
  }

  public async checkAuth(): Promise<AxiosResponse<AuthDataResponse>> {
    return this.handleRequest(
      axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, { withCredentials: true }),
    );
  }

  public async logout(): Promise<void> {
    return this.handleRequest(apiClient.post('/auth/logout'));
  }
}

export const authService = new AuthService();
