import { Task } from '../../../shared/types/types.ts';
import { addDays, endOfDay, isToday, isWithinInterval, startOfDay } from 'date-fns';

export function calculateTasksCount(tasks: Task[]) {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const weekEnd = endOfDay(addDays(tomorrow, 7));
  const tasksCount = {
    today: 0,
    week: 0,
    all: 0,
    completed: 0,
    trash: 0,
  };

  tasks.forEach((task) => {
    const taskDueDate = new Date(task.dueDate);

    if (isToday(taskDueDate)) {
      tasksCount.today += 1;
    }

    if (isWithinInterval(taskDueDate, { start: startOfDay(tomorrow), end: weekEnd })) {
      tasksCount.week += 1;
    }

    if (task.isCompleted) {
      tasksCount.completed += 1;
    }

    tasksCount.all += 1;
  });

  return tasksCount;
}
