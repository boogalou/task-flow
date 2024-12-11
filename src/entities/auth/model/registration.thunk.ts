import { createAsyncAction } from 'shared/lib/thunk.adapter.ts';
import { authService } from 'shared/api/auth.service.ts';

export const registrationRequest = createAsyncAction({
  actionType: 'auth/registration',
  method: authService.registration,
});
