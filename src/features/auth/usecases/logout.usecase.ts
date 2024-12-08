import { createAsyncAction } from '../../../shared/lib/thunk.adapter.ts';
import { authService } from '../../../entities/auth/service/AuthService.ts';

export const logoutRequest = createAsyncAction({
  actionType: 'auth/logout',
  method: authService.logout,
});
