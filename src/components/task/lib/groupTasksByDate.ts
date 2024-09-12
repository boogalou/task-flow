import { Task } from '../../../shared/types/types.ts';
import { format, toZonedTime } from 'date-fns-tz';
import { Locale } from 'date-fns';

export function groupTasksByDate(tasks: Task[], locale: Locale) {
  return tasks.reduce(
    (grouped, task) => {
      const dataKey = format(toZonedTime(task.dueDate, 'UTC'), 'EEE, MMM dd', { locale });
      if (!grouped[dataKey]) {
        grouped[dataKey] = [];
      }
      grouped[dataKey].push(task);
      return grouped;
    },
    {} as Record<string, Task[]>,
  );
}
