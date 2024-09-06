import styles from './task.module.scss';
import cnBind from 'classnames/bind';
import { ChangeEvent, MouseEvent } from 'react';
import { formatExpiryDate } from './lib/formatExpiryDate.ts';
import { CustomInput } from '../../shared/ui-kit/checkbox/customInput.tsx';
import { useAppDispatch } from '../../app/store/reduxHooks.ts';
import { updateTaskRequest } from './model/taskThunk.ts';

const cx = cnBind.bind(styles);

interface TaskProps {
  id: number;
  title: string;
  dueDate: string;
  color: string;
  category: string;
  isCompleted: boolean;
  handleOnClickTask: (id: number) => void;
  openModal: () => void;
}

export function Task({
  id,
  title,
  dueDate,
  color,
  category,
  isCompleted,
  handleOnClickTask,
}: TaskProps) {
  const dispatch = useAppDispatch();
  const expireDate = formatExpiryDate(dueDate);

  const handleOnChangeCheckBox = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTaskRequest({
        id: id,
        isCompleted: evt.target.checked,
      }),
    );
  };

  const handleOnClick = () => {
    handleOnClickTask(id);
  };

  const handleClickOnCheckbox = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
  };

  return (
    <>
      <div className={cx('task')} onClick={handleOnClick}>
        <div className={cx('task__checkbox')} onClick={handleClickOnCheckbox}>
          <CustomInput
            id={`${id}`}
            type="checkbox"
            onChange={handleOnChangeCheckBox}
            checked={isCompleted}
          />
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
