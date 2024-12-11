import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse, isAxiosError } from 'axios';

export interface IAsyncThunkConfig<P = void, R = void> {
  actionType: string;
  method: (payload: P) => Promise<AxiosResponse<R>>;
}

export const createAsyncAction = <P = void, R = void>({
  actionType,
  method,
}: IAsyncThunkConfig<P, R>) => {
  return createAsyncThunk<R, P>(actionType, async (payload: P, thunkApi) => {
    try {
      const response = await method(payload);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }

      throw new Error(`${err}`);
    }
  });
};
