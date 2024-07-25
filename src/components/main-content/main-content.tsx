import styles from './main-content.module.scss';
import cnBind from 'classnames/bind';
import { Task } from '../task/task.tsx';

const cx = cnBind.bind(styles);

export function MainContent() {
  return (
    <div className={cx('content')}>
      <header className={cx('content__header')}>
        <h2 className={cx('content__title')}>Today</h2>
        <div className={cx('content__subtitle')}>Aug 13, Today 7</div>
      </header>
      <Task />
    </div>
  );
}
