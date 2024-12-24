import { taskService } from 'shared/api/task.service.ts';
import { createAsyncAction } from 'shared/lib/thunk.adapter.ts';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse, Task } from 'shared/types/types.ts';
import { getUniqueCategories } from 'entities/task/lib/getUniqueCategories.ts';
import { TaskState } from 'entities/task/types.ts';

export const updateTaskRequest = createAsyncAction({
  actionType: 'task/update',
  method: taskService.updateTask,
});

export const updateTaskPending: CaseReducer<TaskState> = (state) => {
  state.taskFetchStatus = 'loading';
  state.error = null;
};

export const updateTaskFulfilled: CaseReducer<TaskState, PayloadAction<Task>> = (
  state,
  { payload }: PayloadAction<Task>,
) => {
  state.taskFetchStatus = 'succeeded';
  state.tasks = state.tasks.map((task) =>
    task.id === payload.id ? { ...task, ...payload } : task,
  );
  state.categories = getUniqueCategories(state.tasks);
  state.error = null;
};

export const updateTaskRejected: CaseReducer<TaskState> = (state, action) => {
  state.taskFetchStatus = 'failed';
  state.error = action.payload as ErrorResponse;
};
