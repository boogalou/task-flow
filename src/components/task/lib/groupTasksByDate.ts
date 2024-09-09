import { Task } from '../../../shared/types/types.ts';
import { format, toZonedTime } from 'date-fns-tz';
import { Locale } from 'date-fns';

export function groupTasksByDate(tasks: Task[], locale: Locale) {
  console.log(format(toZonedTime('2024-09-08T22:13:00Z', 'UTC'), 'EEE, MMM dd'));
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
