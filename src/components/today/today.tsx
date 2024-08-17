import styles from './today.module.scss';
import cnBind from 'classnames/bind';
import { TasksList } from '../task/tasks-list.tsx';

const cx = cnBind.bind(styles);

export function Today() {
  return (
    <>
      <header className={cx('today__header')}>
        <h2 className={cx('today__title')}>Today</h2>
        <div className={cx('today__subtitle')}>Aug 13, Today 7</div>
      </header>
      <TasksList />
    </>
  );
}
