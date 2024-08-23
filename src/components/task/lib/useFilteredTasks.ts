import { Task } from '../../../shared/types/types.ts';
import { useMemo } from 'react';
import { addDays, endOfDay, isWithinInterval, startOfDay } from 'date-fns';
import { format } from 'date-fns-tz';

export function useFilteredTasks(tasks: Task[], filter: string) {
  return useMemo(() => {
    const today = new Date();
    const startOfWeek = startOfDay(today);
    const endOfWeek = endOfDay(addDays(today, 7));
    switch (filter) {
      case 'today':
        return tasks.filter(
          (task) =>
            format(new Date(task.dueDate), 'yyyy-MM-dd', { timeZone: 'UTC' }) ===
            format(today, 'yyyy-MM-dd'),
        );

      case 'week':
        return tasks.filter((task) =>
          isWithinInterval(new Date(task.dueDate), {
            start: startOfWeek,
            end: endOfWeek,
          }),
        );

      case 'completed':
        return tasks.filter((task) => task.isCompleted);

      default:
        return tasks;
    }
  }, [tasks, filter]);
}
