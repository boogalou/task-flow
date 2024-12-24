import styles from './task-management-panel.module.scss';
import cnBind from 'classnames/bind';
import { Button } from 'shared/ui-kit/button/button.tsx';
import { Icon } from 'shared/ui-kit/icon/icon.tsx';
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks.ts';
import { selectTasks, setCriteriaFilter } from 'entities/task/model/taskSlice.ts';
import { ButtonsData, FilterCriteria } from 'shared/types/types.ts';
import { useTranslation } from 'react-i18next';
import { calculateTasksCount } from 'entities/task/lib/calculateTasksCount.ts';

const cx = cnBind.bind(styles);

export function TaskManagementPanel() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const [buttonIsPressed, setButtonIsPressed] = useState<null | number>(null);

  const countTasks = useMemo(() => calculateTasksCount(tasks), [tasks]);

  const handleOnClick = (id: number, action: string) => {
    setButtonIsPressed((prevId) => (prevId === id ? null : id));

    const newFilter: Partial<FilterCriteria> = {
      isCompleted: null,
      isExpired: null,
    };

    if (action === 'completed') {
      newFilter.isCompleted = buttonIsPressed === id ? null : true;
    } else if (action === 'expired') {
      newFilter.isExpired = buttonIsPressed === id ? null : true;
    }

    dispatch(setCriteriaFilter(newFilter));
  };

  const buttonsData: ButtonsData[] = [
    {
      id: 1,
      label: t('sidebar.completed'),
      iconType: 'success',
      action: 'completed',
      count: countTasks.completed,
    },
    {
      id: 2,
      label: t('sidebar.expired'),
      iconType: 'alert',
      action: 'expired',
      count: countTasks.expired,
    },
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
