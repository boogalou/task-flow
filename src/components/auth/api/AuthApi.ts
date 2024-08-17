import { apiClient } from '../../../shared/lib/apiClietn.ts';
import { AxiosResponse } from 'axios';
import { LoginRequestData, RegistrationRequestData } from '../types.ts';

export class AuthApi {
  public async signup(data: RegistrationRequestData): Promise<AxiosResponse<any>> {
    return await apiClient.post('/registration', data);
  }

  public async signin(data: LoginRequestData): Promise<AxiosResponse<any>> {
    return await apiClient.post('/login', data);
  }
}

export const authApi = new AuthApi();
