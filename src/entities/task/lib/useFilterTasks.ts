import { FilterCriteria, Task } from 'shared/types/types.ts';
import { useMemo } from 'react';
import { addDays, endOfDay, isToday, isWithinInterval, startOfDay } from 'date-fns';

export function useFilterTasks(tasks: Task[], criteria: FilterCriteria) {
  return useMemo(() => {
    return tasks.filter((task) => {
      const today = new Date();
      const tomorrow = addDays(today, 1);

      const dateMatch =
        criteria.date === 'today'
          ? isToday(new Date(task.dueDate!))
          : criteria.date === 'week'
            ? isWithinInterval(new Date(task.dueDate!), {
                start: startOfDay(tomorrow),
                end: endOfDay(addDays(tomorrow, 6)),
              })
            : criteria.date === 'all';

      const categoryMatch = criteria.category ? task.category === criteria.category : true;

      const completionMatch =
        criteria.isCompleted !== null ? task.isCompleted === criteria.isCompleted : true;

      const expiredMatch =
        criteria.isExpired !== null ? new Date(task.dueDate!) < today === criteria.isExpired : true;

      const searchQuery = criteria.searchQuery!.toLowerCase();
      const matchesSearch =
        task.title?.toLowerCase().includes(searchQuery) ||
        task.description?.toLowerCase().includes(searchQuery) ||
        task.dueDate?.toLowerCase().includes(searchQuery);

      return dateMatch && categoryMatch && completionMatch && expiredMatch && matchesSearch;
    });
  }, [tasks, criteria]);
}
