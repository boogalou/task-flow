import { apiClient } from 'shared/api/_base-api.ts';
import { UserUpdate } from 'shared/types/types.ts';

class UserService {
  public async getUser() {
    return apiClient.get('/users');
  }

  public async updateUser(payload: UserUpdate) {
    return apiClient.patch('/users', payload);
  }
}

export const userService = new UserService();
