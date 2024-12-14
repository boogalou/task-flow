import { ErrorResponse, FetchStatus, FilterCriteria, Task } from 'shared/types/types.ts';

export type TaskState = {
  tasks: Task[];
  categories: string[];
  lastRemovedTask: Task | null;
  taskFetchStatus: FetchStatus;
  error: ErrorResponse | null;
  filters: FilterCriteria;
};
