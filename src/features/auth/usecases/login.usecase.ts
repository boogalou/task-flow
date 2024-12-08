import { createAsyncAction } from '../../../shared/lib/thunk.adapter.ts';
import { authService } from '../../../entities/auth/service/AuthService.ts';

export const loginRequest = createAsyncAction({
  actionType: 'auth/login',
  method: authService.login,
});
