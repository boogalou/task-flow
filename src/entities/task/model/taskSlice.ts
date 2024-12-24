import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterCriteria } from 'shared/types/types.ts';
import {
  createTaskFulfilled,
  createTaskPending,
  createTaskRejected,
  createTaskRequest,
} from 'entities/task/model/create-task.thunk.ts';
import {
  getTasksFulfilled,
  getTasksPending,
  getTasksRejected,
  getTasksRequest,
} from 'entities/task/model/get-tasks.thunk.ts';
import {
  updateTaskFulfilled,
  updateTaskPending,
  updateTaskRejected,
  updateTaskRequest,
} from 'entities/task/model/update-task.thunk.ts';
import {
  deleteTaskFulfilled,
  deleteTaskPending,
  deleteTaskRejected,
  deleteTaskRequest,
} from 'entities/task/model/delete-task.thunk.ts';
import { TaskState } from 'entities/task/types.ts';

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
    isExpired: null,
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
      .addCase(getTasksRequest.pending, getTasksPending)
      .addCase(getTasksRequest.fulfilled, getTasksFulfilled)
      .addCase(getTasksRequest.rejected, getTasksRejected)
      .addCase(createTaskRequest.pending, createTaskPending)
      .addCase(createTaskRequest.fulfilled, createTaskFulfilled)
      .addCase(createTaskRequest.rejected, createTaskRejected)
      .addCase(updateTaskRequest.pending, updateTaskPending)
      .addCase(updateTaskRequest.fulfilled, updateTaskFulfilled)
      .addCase(updateTaskRequest.rejected, updateTaskRejected)
      .addCase(deleteTaskRequest.pending, deleteTaskPending)
      .addCase(deleteTaskRequest.fulfilled, deleteTaskFulfilled)
      .addCase(deleteTaskRequest.rejected, deleteTaskRejected);
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
