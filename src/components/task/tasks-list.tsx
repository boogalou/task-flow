import styles from './task.module.scss';
import cnBind from 'classnames/bind';
import { Task } from './task.tsx';

const cx = cnBind.bind(styles);

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  label: string;
  category: string;
};

const tasks: Task[] = [
  {
    id: 1,
    title: 'Fix login bug',
    description: 'Resolve the issue where users cannot log in using OAuth.',
    dueDate: new Date('2024-07-29'),
    label: 'Bug',
    category: 'Development',
  },
  {
    id: 2,
    title: 'Design new homepage',
    description: 'Create a new design for the homepage that is more user-friendly.',
    dueDate: new Date('2024-08-06'),
    label: 'Enhancement',
    category: 'Design',
  },
  {
    id: 3,
    title: 'Write unit tests',
    description: 'Write unit tests for the new user registration feature.',
    dueDate: new Date('2024-08-25'),
    label: 'Testing',
    category: 'Development',
  },
  {
    id: 4,
    title: 'Database optimization',
    description: 'Optimize the database queries for faster response times.',
    dueDate: new Date('2024-08-30'),
    label: 'Performance',
    category: 'Database',
  },
  {
    id: 5,
    title: 'Update user documentation',
    description: 'Revise the user documentation to include the latest features.',
    dueDate: new Date('2025-09-05'),
    label: 'Documentation',
    category: 'Support',
  },
];

export function TasksList() {
  return (
    <div className={cx('tasks-list')}>
      {tasks.map((it) => (
        <Task key={it.id} {...it} />
      ))}
    </div>
  );
}
