import { createAsyncAction } from 'shared/lib/thunk.adapter.ts';
import { userService } from 'shared/api/user.service.ts';

export const getUserRequest = createAsyncAction({
  actionType: 'user/get',
  method: userService.getUser,
});
