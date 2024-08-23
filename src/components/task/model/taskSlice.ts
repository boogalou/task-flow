import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { crateTaskRequest, deleteTask, getTasks, updateTaskRequest } from './taskThunk.ts';
import { ErrorResponse, Task } from '../../../shared/types/types.ts';
import { addDays, format, isWithinInterval } from 'date-fns';

export interface TaskState {
  tasks: Task[];
  lastRemovedTask: Task | null;
  taskFetchStatus: string;
  error: ErrorResponse | null;
}

const initialState: TaskState = {
  tasks: [],
  lastRemovedTask: null,
  taskFetchStatus: 'idle',
  error: null,
};

export const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  selectors: {
    selectTasks: (state) => state.tasks,
    selectError: (state) => state.error,
  },

  reducers: {
    taskFiltering(state, { payload }: PayloadAction<string>) {
      const dateNow = format(new Date(), 'yyyy-MM-dd');
      console.log(payload);
      switch (payload) {
        case 'today':
          state.tasks = state.tasks.filter(
            (task) =>
              format(new Date(task.dueDate), 'yyyy-MM-dd') === format(dateNow, 'yyyy-MM-dd'),
          );
          break;

        case 'week':
          state.tasks = state.tasks.filter((task) =>
            isWithinInterval(new Date(task.dueDate), {
              start: dateNow,
              end: addDays(dateNow, 7),
            }),
          );
          break;

        case 'completed':
          state.tasks = state.tasks.filter((task) => task.isCompleted);
          break;

        default:
          return state;
      }
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
      .addCase(updateTaskRequest.fulfilled, (state, action: PayloadAction<Task>) => {
        state.taskFetchStatus = 'succeeded';
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task,
        );
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
      .addCase(getTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.taskFetchStatus = 'succeeded';
        state.tasks = action.payload;
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

export const { selectTasks, selectError } = taskSlice.selectors;
export const { taskFiltering } = taskSlice.actions;

export const selectTaskById = (state: TaskState, taskId: number) => {
  if (taskId) {
    return state.tasks.find((task) => task.id === taskId);
  }
};
