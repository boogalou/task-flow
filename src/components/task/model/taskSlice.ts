import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './types.ts';

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,

  selectors: {},

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase();
  },
});

export const { addTask } = taskSlice.actions;
