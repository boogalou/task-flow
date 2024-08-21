import { createSlice } from '@reduxjs/toolkit';
import { Task } from './types.ts';
import { crateTaskRequest } from './taskThunk.ts';

interface TaskState {
  tasks: Task[];
  taskFetchStatus: string;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [
    {
      id: 1,
      title: 'Fix login bug',
      description: 'Resolve the issue where users cannot log in using OAuth.',
      dueDate: '2024-07-29T23:12:00.00Z',
      color: '#6A9C89',
      category: 'Development',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Design new homepage',
      description: 'Create a new design for the homepage that is more user-friendly.',
      dueDate: '2024-08-06T12:02:00.00Z',
      color: '#FFAAAA',
      category: 'Design',
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Write unit tests',
      description: 'Write unit tests for the new user registration feature.',
      dueDate: '2024-08-25T15:00:00.00Z',
      color: '#1679AB',
      category: 'Development',
      isCompleted: false,
    },
    {
      id: 4,
      title: 'Database optimization',
      description: 'Optimize the database queries for faster response times.',
      dueDate: '2024-08-30T18:25:00.00Z',
      color: '#EFBC9B',
      category: 'Database',
      isCompleted: false,
    },
    {
      id: 5,
      title: 'Update user documentation',
      description: 'Revise the user documentation to include the latest features.',
      dueDate: '2025-09-05T07:45:00.00Z',
      color: '#FDFFAB',
      category: 'Support',
      isCompleted: false,
    },
  ],
  taskFetchStatus: 'idle',
  error: null,
};

export const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,

  selectors: {
    selectTasks: (state) => state.tasks,
  },

  reducers: {},

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
      });
  },
});

export const { selectTasks } = taskSlice.selectors;

export const selectTaskById = (state: TaskState, taskId: number) => {
  if (taskId) {
    return state.tasks.find((task) => task.id === taskId);
  }
};
