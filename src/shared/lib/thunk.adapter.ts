import { createAsyncThunk } from '@reduxjs/toolkit';

export interface IAsyncThunkConfig<P = any, R = any> {
  actionType: string;
  method: (payload: P) => Promise<R>;
}

export const createAsyncAction = <P, R>({ actionType, method }: IAsyncThunkConfig<P, R>) => {
  return createAsyncThunk<R, P>(actionType, async (payload: P, thunkApi) => {
    try {
      return await method(payload);
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  });
};
