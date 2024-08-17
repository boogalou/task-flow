import styles from './task.module.scss';
import cnBind from 'classnames/bind';
import { formatExpiryDate } from './lib/formatExpiryDate.ts';
import Input from '../../shared/ui-kit/input/input.tsx';

const cx = cnBind.bind(styles);

interface TaskProps {
  id: number;
  title: string;
  dueDate: Date;
  label: string;
  category: string;
}

export function Task({ id, title, dueDate, category }: TaskProps) {
  const expireDate = formatExpiryDate(dueDate);

  const handleOnClick = () => {
    console.log(id);
  };

  return (
    <div className={cx('task')} onClick={handleOnClick}>
      <div className={cx('task__checkbox')}>
        <Input id={`${id}`} type="checkbox" />
      </div>
      <span className={cx('task__title')}>{title}</span>
      <div className={cx('task__due-date')}>{expireDate}</div>
      <div className={cx('task__category')}>{category}</div>
    </div>
  );
}
