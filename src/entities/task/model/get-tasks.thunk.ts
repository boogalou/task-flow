import { createAsyncAction } from 'shared/lib/thunk.adapter.ts';
import { taskService } from 'shared/api/task.service.ts';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { TaskState } from 'entities/task/model/taskSlice.ts';
import { ErrorResponse, Task } from 'shared/types/types.ts';

export const getTasksRequest = createAsyncAction({
  actionType: 'task/getAll',
  method: taskService.getTasks,
});

export const getTasksPending: CaseReducer<TaskState> = (state) => {
  state.taskFetchStatus = 'loading';
  state.error = null;
};

export const getTasksFulfilled: CaseReducer<TaskState, PayloadAction<Task[]>> = (state, action) => {
  state.taskFetchStatus = 'succeeded';
  state.tasks = action.payload;
  state.error = null;
};

export const getTasksRejected: CaseReducer<TaskState> = (state, action) => {
  state.taskFetchStatus = 'failed';
  state.error = action.payload as ErrorResponse;
};
