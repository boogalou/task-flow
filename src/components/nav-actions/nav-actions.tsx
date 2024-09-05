import styles from './nav-actions.module.scss';
import cnBind from 'classnames/bind';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/redux/reduxHooks.ts';
import { selectTasksCount, setCriteriaFilter } from '../task/model/taskSlice.ts';
import { ButtonsData } from '../../shared/types/types.ts';

const cx = cnBind.bind(styles);

export function NavActions() {
  const dispatch = useAppDispatch();
  const countTasks = useAppSelector(selectTasksCount);
  const [buttonIsPressed, setButtonIsPressed] = useState<null | number>(null);

  const handleOnClick = (id: number, action: string) => {
    setButtonIsPressed(id);
    dispatch(setCriteriaFilter({ isCompleted: action }));
  };

  const buttonsData: ButtonsData[] = [
    {
      id: 1,
      label: 'Completed',
      iconType: 'success',
      action: 'completed',
      count: countTasks.completed,
    },
    { id: 2, label: 'Trash', iconType: 'trash-bin', action: 'trash', count: countTasks.trash },
  ];

  return (
    <div className={cx('nav-actions')}>
      {buttonsData.map((it) => (
        <Button
          className={cx('nav-actions__button', {
            'nav-actions__button--pressed': it.id === buttonIsPressed,
          })}
          onClick={() => handleOnClick(it.id, it.action)}
          key={it.id}
        >
          <div className={cx('nav-actions__wrapper')}>
            <Icon className={cx('nav-actions__icon')} iconType={it.iconType} />
            <span className={cx('nav-actions__button-label')}>{it.label}</span>
          </div>
          <span className={cx('nav-actions__counter')}>{it.count > 0 ? it.count : null}</span>
        </Button>
      ))}
    </div>
  );
}

//TODO: refactoring
