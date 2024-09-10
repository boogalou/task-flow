import styles from './taskDetails.module.scss';
import cnBind from 'classnames/bind';
import { MouseEvent } from 'react';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { Task } from '../../shared/types/types.ts';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { deleteTask } from '../task/model/taskThunk.ts';
import { useAppDispatch } from '../../app/store/reduxHooks.ts';

const cx = cnBind.bind(styles);

interface TaskDetailsProps extends Task {
  handleClickOnEdit: (id: number) => void;
}

export function TaskDetails(props: TaskDetailsProps) {
  const dispatch = useAppDispatch();
  const handleClickOnEditButton = (evt: MouseEvent<HTMLButtonElement>, id: number) => {
    evt.stopPropagation();
    props.handleClickOnEdit(id);
  };
  const handleClickOnDeleteButton = (evt: MouseEvent<HTMLButtonElement>, id: number) => {
    evt.stopPropagation();

    if (id) {
      dispatch(deleteTask(id));
    }
  };

  const details = [
    {
      label: 'Title',
      value: props.title,
      className: 'details__title',
      textClassName: 'details__title-text',
    },
    {
      label: 'Description',
      value: props.description,
      className: 'details__description',
      textClassName: 'details__description-text',
    },
    {
      label: 'Category',
      value: props.category,
      className: 'details__category',
      textClassName: 'details__category-text',
    },
    {
      label: 'Expire',
      value: props.dueDate,
      className: 'details__expire',
      textClassName: 'details__expire-text',
    },
    {
      label: 'Created',
      value: props.createdAt,
      className: 'details__created',
      textClassName: 'details__created-text',
    },
    {
      label: 'Updated',
      value: props.updatedAt,
      className: 'details__updated',
      textClassName: 'details__updated-text',
    },
  ];

  return (
    <ul className={cx('details')}>
      <span className={cx('details__header')}>Details</span>

      {details.map((detail, index) => (
        <li key={index} className={cx(detail.className)}>
          {detail.label}:&nbsp;
          <span className={cx(detail.textClassName)}>{detail.value}</span>
        </li>
      ))}

      <div className={cx('details__action')}>
        <Button
          className={cx('details__action-button', 'details__action-edit')}
          onClick={(evt) => handleClickOnEditButton(evt, props.id)}
        >
          <Icon className={cx('details__icon', 'details__icon-edit')} iconType="edit" />
        </Button>
        <Button
          className={cx('details__action-button', 'details__action-delete')}
          onClick={(evt) => handleClickOnDeleteButton(evt, props.id)}
        >
          <Icon className={cx('details__icon', 'details__icon-trash')} iconType="trash-bin" />
        </Button>
      </div>
    </ul>
  );
}
