import styles from './task.module.scss';
import cnBind from 'classnames/bind';
import { Task } from './task.tsx';

const cx = cnBind.bind(styles);

export function TasksList() {
  return (
    <div className={cx('tasks-list')}>
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
    </div>
  );
}
