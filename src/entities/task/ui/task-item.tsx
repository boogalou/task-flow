import styles from './task.module.scss';
import cnBind from 'classnames/bind';
import { ReactNode, useState } from 'react';
import { formatExpiryDate } from '../lib/formatExpiryDate.ts';
import { TaskDetails } from 'entities/task/ui/task-details.tsx';
import { Task } from 'shared/types/types.ts';

const cx = cnBind.bind(styles);

interface TaskProps extends Task {
  handleClickOnEdit: (id: number) => void;
  TaskDetails?: ReactNode;
  statusUpdate: ReactNode;
}

export function TaskItem(props: TaskProps) {
  const expireDate = formatExpiryDate(props.dueDate!);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const handleClickOnTask = () => {
    setIsDetailsVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className={cx('task')} onClick={handleClickOnTask}>
        <div className={cx('task__checkbox')}>{props.statusUpdate}</div>
        <span className={cx('task__title')}>{props.title}</span>
        <div className={cx('task__due-date')}>{expireDate}</div>
        <div className={cx('task__category')} style={{ backgroundColor: `${props.color}` }}>
          {props.category}
        </div>
        <div className={cx('task__details', { 'task__details--visible': isDetailsVisible })}>
          <TaskDetails {...props} />
        </div>
      </div>
    </>
  );
}
