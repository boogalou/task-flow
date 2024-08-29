import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTaskRequest, deleteTask, updateTaskRequest } from './taskThunk.ts';
import { ErrorResponse, Task } from '../../../shared/types/types.ts';
import { getUniqueCategories } from '../lib/getUniqueCategories.ts';
import { taskApi } from '../api/TaskApi.ts';
import axios from 'axios';

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

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  selectors: {
    selectTasks: (state) => state.tasks,
    selectCategories: (state) => state.categories,
    selectError: (state) => state.error,
    selectFilter: (state) => state.filter,
  },

  reducers: (create) => ({
    setFilter: create.reducer((state, { payload }: PayloadAction<string>) => {
      state.filter = payload;
    }),

    fetchTasks: create.asyncThunk(
      async (_payload: void, thunkApi) => {
        try {
          const response = await taskApi.getTasks();
          return response.data;
        } catch (err) {
          if (axios.isAxiosError(err)) {
            return thunkApi.rejectWithValue(err.response?.data);
          }
          throw new Error(`${err}`);
        }
      },
      {
        pending: (state) => {
          state.taskFetchStatus = 'loading';
          state.error = null;
        },

        fulfilled: (state, { payload }) => {
          state.taskFetchStatus = 'succeeded';
          state.tasks = payload;
          state.categories = getUniqueCategories(payload);
          state.error = null;
        },

        rejected: (state, action) => {
          state.taskFetchStatus = 'failed';
          state.error = action.payload as ErrorResponse;
        },
      },
    ),
  }),

  extraReducers: (builder) => {
    builder
      .addCase(createTaskRequest.pending, (state) => {
        state.taskFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(createTaskRequest.fulfilled, (state, { payload }) => {
        state.taskFetchStatus = 'succeeded';
        state.tasks.push(payload);
        state.error = null;
      })
      .addCase(createTaskRequest.rejected, (state, action) => {
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
        state.categories = getUniqueCategories(state.tasks);
        state.error = null;
      })
      .addCase(updateTaskRequest.rejected, (state, action) => {
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
        state.categories = getUniqueCategories(state.tasks);
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
export const { setFilter, fetchTasks } = taskSlice.actions;
export const selectTaskById = (state: TaskState, taskId: number) => {
  if (taskId) {
    return state.tasks.find((task) => task.id === taskId);
  }
};
