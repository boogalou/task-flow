import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTaskRequest, deleteTask, getTasks, updateTaskRequest } from './taskThunk.ts';
import { ErrorResponse, FetchStatus, FilterCriteria, Task } from '../../../shared/types/types.ts';
import { getUniqueCategories } from '../lib/getUniqueCategories.ts';

export interface TaskState {
  tasks: Task[];
  categories: string[];
  lastRemovedTask: Task | null;
  taskFetchStatus: FetchStatus;
  error: ErrorResponse | null;
  filters: FilterCriteria;
}

const initialState: TaskState = {
  tasks: [],
  categories: [],
  lastRemovedTask: null,
  taskFetchStatus: 'idle',
  error: null,
  filters: {
    date: 'all',
    category: null,
    isCompleted: null,
  },
};

export const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  selectors: {
    selectTasks: (state) => state.tasks,
    selectCategories: (state) => state.categories,
    selectError: (state) => state.error,
    selectFilter: (state) => state.filters,
    selectTaskFetchStatus: (state) => state.taskFetchStatus,
  },

  reducers: {
    setCriteriaFilter(state, { payload }: PayloadAction<FilterCriteria>) {
      state.filters = { ...state.filters, ...payload };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.taskFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.taskFetchStatus = 'succeeded';
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.taskFetchStatus = 'failed';
        state.error = action.payload as ErrorResponse;
      })
      .addCase(createTaskRequest.pending, (state) => {
        state.taskFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(createTaskRequest.fulfilled, (state, { payload }) => {
        state.taskFetchStatus = 'succeeded';
        state.tasks.push(payload);
        state.categories = getUniqueCategories(state.tasks);
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

export const { selectTasks, selectError, selectFilter, selectCategories, selectTaskFetchStatus } =
  taskSlice.selectors;
export const { setCriteriaFilter } = taskSlice.actions;
export const selectTaskById = (state: TaskState, taskId: number) => {
  if (taskId) {
    return state.tasks.find((task) => task.id === taskId);
  }
};
