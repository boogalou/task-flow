import { createSlice } from '@reduxjs/toolkit';
import { Task } from './types.ts';
import { crateTaskRequest } from './taskThunk.ts';

interface TaskState {
  tasks: Task[];
  taskFetchStatus: string;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  taskFetchStatus: 'idle',
  error: null,
};

export const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,

  selectors: {
    selectTasks: (state) => state.tasks,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(crateTaskRequest.pending, (state) => {
        state.taskFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(crateTaskRequest.fulfilled, (state, { payload }) => {
        state.taskFetchStatus = 'succeeded';
        state.tasks.push(payload);
        state.error = null;
      })
      .addCase(crateTaskRequest.rejected, (state, action) => {
        state.taskFetchStatus = 'failed';
        state.error = action.payload as string;
      });
  },
});
