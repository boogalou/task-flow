import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './types.ts';
import { crateTaskRequest, deleteTask, getTasks, updateTaskRequest } from './taskThunk.ts';

interface TaskState {
  tasks: Task[];
  lastRemovedTask: Task | null;
  taskFetchStatus: string;
  error: string | null;
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
  },

  reducers: {
    restoreTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      state.taskFetchStatus = 'idle';
      state.error = 'Failed to delete task. Task restored.';
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
        state.error = action.payload as string;
      })
      .addCase(updateTaskRequest.rejected, (state) => {
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      });
  },
});

export const { selectTasks } = taskSlice.selectors;

export const selectTaskById = (state: TaskState, taskId: number) => {
  if (taskId) {
    return state.tasks.find((task) => task.id === taskId);
  }
};
