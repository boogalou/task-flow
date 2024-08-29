import { Task } from '../../../shared/types/types.ts';

export const getUniqueCategories = (tasks: Task[]): string[] => {
  return [...new Set(tasks.map((task) => task.category))];
};
