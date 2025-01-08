import { apiClient } from 'shared/api/_base-api.ts';
import { UserUpdate } from 'shared/types/types.ts';

class UserService {
  public async getUser() {
    return apiClient.get('/users');
  }

  public async updateUser(payload: UserUpdate) {
    return apiClient.patch('/users', payload);
  }

  public async updateUserAvatar(payload: { id: number; avatarImg: FormData }) {
    return apiClient.put(`users/${payload.id}/avatar`, payload.avatarImg, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const userService = new UserService();
