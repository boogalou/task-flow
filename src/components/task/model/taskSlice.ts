import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { crateTaskRequest, deleteTask, getTasks, updateTaskRequest } from './taskThunk.ts';
import { ErrorResponse, Task } from '../../../shared/types/types.ts';

export interface TaskState {
  tasks: Task[];
  categories: string[];
  lastRemovedTask: Task | null;
  taskFetchStatus: string;
  error: ErrorResponse | null;
  filter: string;
}

const initialState: TaskState = {
  tasks: [],
  categories: [],
  lastRemovedTask: null,
  taskFetchStatus: 'idle',
  error: null,
  filter: '',
};

export const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  selectors: {
    selectTasks: (state) => state.tasks,
    selectCategories: (state) => state.categories,
    selectError: (state) => state.error,
    selectFilter: (state) => state.filter,
  },

  reducers: {
    setFilter(state, { payload }: PayloadAction<string>) {
      state.filter = payload;
    },
  },

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
        state.error = action.payload as ErrorResponse;
      })
      .addCase(updateTaskRequest.pending, (state) => {
        state.taskFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(updateTaskRequest.fulfilled, (state, { payload }: PayloadAction<Task>) => {
        state.taskFetchStatus = 'succeeded';
        state.tasks = state.tasks.map((task) =>
          task.id === payload.id ? { ...task, ...payload } : task,
        );
        state.categories = [...new Set(...state.categories, payload.category)];
        state.error = null;
      })
      .addCase(updateTaskRequest.rejected, (state, action) => {
        state.taskFetchStatus = 'failed';
        state.error = action.payload as ErrorResponse;
      })
      .addCase(getTasks.pending, (state) => {
        state.taskFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, { payload }: PayloadAction<Task[]>) => {
        state.taskFetchStatus = 'succeeded';
        state.tasks = payload;
        state.categories = [...new Set(payload.map((it) => it.category))];
        state.error = null;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.taskFetchStatus = 'failed';
        state.error = action.payload as ErrorResponse;
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.taskFetchStatus = 'loading';
        state.error = null;

        state.lastRemovedTask = state.tasks.find((task) => task.id === action.meta.arg) || null;
        state.tasks = state.tasks.filter((task) => task.id !== action.meta.arg);
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.taskFetchStatus = 'succeeded';
        state.lastRemovedTask = null;
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.taskFetchStatus = 'failed';
        if (state.lastRemovedTask) {
          state.tasks.push(state.lastRemovedTask);
          state.lastRemovedTask = null;
        }
        state.error = action.payload as ErrorResponse;
      });
  },
});

export const { selectTasks, selectError, selectFilter, selectCategories } = taskSlice.selectors;
export const { setFilter } = taskSlice.actions;
export const selectTaskById = (state: TaskState, taskId: number) => {
  if (taskId) {
    return state.tasks.find((task) => task.id === taskId);
  }
};
