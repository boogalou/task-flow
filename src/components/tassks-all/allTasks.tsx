import styles from './all-tasks.module.scss';
import cnBind from 'classnames/bind';

const cx = cnBind.bind(styles);

export function AllTasks() {
  return <div className={cx('all-tasks')}>ALL</div>;
}
