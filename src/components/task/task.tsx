import styles from './task.module.scss';
import cnBind from 'classnames/bind';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { formatExpiryDate } from './lib/formatExpiryDate.ts';
import { CustomInput } from '../../shared/ui-kit/checkbox/customInput.tsx';
import { useAppDispatch } from '../../app/store/reduxHooks.ts';
import { updateTaskRequest } from './model/taskThunk.ts';
import { TaskDetails } from '../task-details/taskDetails.tsx';
import { Task as ITask } from '../../shared/types/types.ts';

const cx = cnBind.bind(styles);

interface TaskProps extends ITask {
  handleClickOnEdit: (id: number) => void;
}

export function Task(props: TaskProps) {
  const dispatch = useAppDispatch();
  const expireDate = formatExpiryDate(props.dueDate);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const handleOnChangeCheckBox = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTaskRequest({
        id: props.id,
        isCompleted: evt.target.checked,
      }),
    );
  };

  const handleClickOnTask = () => {
    setIsDetailsVisible((prevState) => !prevState);
  };

  const handleClickOnCheckbox = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
  };

  return (
    <>
      <div className={cx('task')} onClick={handleClickOnTask}>
        <div className={cx('task__checkbox')} onClick={handleClickOnCheckbox}>
          <CustomInput
            id={`${props.id}`}
            type="checkbox"
            onChange={handleOnChangeCheckBox}
            checked={props.isCompleted}
          />
        </div>
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
