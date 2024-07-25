import styles from './task.module.scss';
import cnBind from 'classnames/bind';
import { Checkbox } from '../../shared/ui-kit/checkbox/checkbox.tsx';

const cx = cnBind.bind(styles);

export function Task() {
  return (
    <div className={cx('task')}>
      <Checkbox id="checkbox" type="checkbox" />
      <span className={cx('task__title')}>Go to the gym</span>
      <div className={cx('task__due-date')}>by 8AM</div>
    </div>
  );
}
