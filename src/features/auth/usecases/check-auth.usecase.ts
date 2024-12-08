import { createAsyncAction } from '../../../shared/lib/thunk.adapter.ts';
import { authService } from '../../../entities/auth/service/AuthService.ts';

export const checkAuthRequest = createAsyncAction({
  actionType: 'auth/refresh',
  method: authService.checkAuth,
});
