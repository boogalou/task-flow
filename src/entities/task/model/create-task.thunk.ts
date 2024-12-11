import { createAsyncAction } from 'shared/lib/thunk.adapter.ts';
import { taskService } from 'shared/api/task.service.ts';
import { TaskState } from 'entities/task/model/taskSlice.ts';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse, Task } from 'shared/types/types.ts';
import { getUniqueCategories } from 'entities/task/lib/getUniqueCategories.ts';

export const createTaskRequest = createAsyncAction({
  actionType: 'task/create',
  method: taskService.createTask,
});

export const createTaskPending: CaseReducer<TaskState> = (state) => {
  state.taskFetchStatus = 'loading';
  state.error = null;
};

export const createTaskFulfilled: CaseReducer<TaskState, PayloadAction<Task>> = (state, action) => {
  state.taskFetchStatus = 'succeeded';
  state.tasks.push(action.payload);
  state.categories = getUniqueCategories(state.tasks);
  state.error = null;
};

export const createTaskRejected: CaseReducer<TaskState> = (state, action) => {
  state.taskFetchStatus = 'failed';
  state.error = action.payload as ErrorResponse;
};
