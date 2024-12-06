export function withUserId<T>(thunk: (userId: number, payload: T, thunkApi: any) => Promise<any>) {
  return (payload: T, thunkApi: any) => {
    const userId = thunkApi.getState().authSlice.authData?.id;
    console.log(userId);
    if (!userId) {
      return thunkApi.rejectWithValue('User ID is missing');
    }

    return thunk(userId, payload, thunkApi);
  };
}
