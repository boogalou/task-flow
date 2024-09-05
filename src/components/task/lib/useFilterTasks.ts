import { FilterCriteria, Task } from '../../../shared/types/types.ts';
import { useMemo } from 'react';
import { addDays, endOfDay, isToday, isWithinInterval, startOfDay } from 'date-fns';

export function useFilterTasks(tasks: Task[], criteria: FilterCriteria) {
  return useMemo(() => {
    return tasks.filter((task) => {
      let dateMatch = false;
      const today = new Date();
      const tomorrow = addDays(today, 1);

      if (criteria.date === 'today') {
        dateMatch = isToday(new Date(task.dueDate));
      } else if (criteria.date === 'week') {
        dateMatch = isWithinInterval(new Date(task.dueDate), {
          start: startOfDay(tomorrow),
          end: endOfDay(addDays(tomorrow, 7)),
        });
      } else if (criteria.date === 'all') {
        dateMatch = true;
      }

      const categoryMatch = criteria.category ? task.category === criteria.category : true;

      const completionMatch =
        criteria.isCompleted !== null ? task.isCompleted === Boolean(criteria.isCompleted) : true;

      return dateMatch && categoryMatch && completionMatch;
    });
  }, [tasks, criteria]);
}
