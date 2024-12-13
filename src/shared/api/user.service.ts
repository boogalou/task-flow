import { apiClient } from 'shared/api/_base-api.ts';

class UserService {
  public async getUser() {
    return apiClient.get('/users');
  }
}

export const userService = new UserService();
