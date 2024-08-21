import styles from './task.module.scss';
import cnBind from 'classnames/bind';
import { MouseEvent } from 'react';
import { formatExpiryDate } from './lib/formatExpiryDate.ts';
import { Checkbox } from '../../shared/ui-kit/checkbox/checkbox.tsx';

const cx = cnBind.bind(styles);

interface TaskProps {
  id: number;
  title: string;
  dueDate: string;
  color: string;
  category: string;
  handleOnClickTask: (id: number) => void;
  openModal: () => void;
}

export function Task({ id, title, dueDate, color, category, handleOnClickTask }: TaskProps) {
  const expireDate = formatExpiryDate(dueDate);

  const handleOnClick = () => {
    console.log(id);
    handleOnClickTask(id);
  };

  const handleClickOnCheckbox = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
  };

  return (
    <>
      <div className={cx('task')} onClick={handleOnClick}>
        <div className={cx('task__checkbox')} onClick={handleClickOnCheckbox}>
          <Checkbox id={`${id}`} type="checkbox" />
        </div>
        <span className={cx('task__title')}>{title}</span>
        <div className={cx('task__due-date')}>{expireDate}</div>
        <div className={cx('task__category')} style={{ backgroundColor: `${color}` }}>
          {category}
        </div>
      </div>
    </>
  );
}
