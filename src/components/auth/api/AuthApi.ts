import { apiClient } from '../../../shared/lib/apiClietn.ts';
import axios, { AxiosResponse } from 'axios';
import {
  AuthDataResponse,
  LoginRequestData,
  RegistrationRequestData,
} from '../../../shared/types/types.ts';

export class AuthApi {
  public async signup(data: RegistrationRequestData): Promise<AxiosResponse<AuthDataResponse>> {
    return await apiClient.post('/registration', data);
  }

  public async signin(data: LoginRequestData): Promise<AxiosResponse<AuthDataResponse>> {
    return await apiClient.post('/login', data);
  }

  async checkAuth(): Promise<AxiosResponse<AuthDataResponse>> {
    return await axios.post(
      `${import.meta.env.VITE_API_URL}/refresh`,
      {},
      {
        withCredentials: true,
      },
    );
  }

  public async logout() {
    return await apiClient.delete('/logout');
  }
}

export const authApi = new AuthApi();
