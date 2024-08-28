import { Task } from '../../../shared/types/types.ts';

export const getUniqueCategories = (tasks: Task[]): string[] => {
  return Array.from(new Set(tasks.map((task) => task.category)));
};
