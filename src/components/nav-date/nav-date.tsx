import styles from './nav-date.module.scss';
import cnBind from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/reduxHooks.ts';
import { selectTasksCount, setCriteriaFilter } from '../task/model/taskSlice.ts';
import { ButtonsData } from '../../shared/types/types.ts';

const cx = cnBind.bind(styles);

export function NavDate() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const countTasks = useAppSelector(selectTasksCount);
  const [buttonIsPressed, setButtonIsPressed] = useState(3);
  const handleOnClick = (id: number, action: string) => {
    setButtonIsPressed(id);
    dispatch(setCriteriaFilter({ date: action }));
  };

  useEffect(() => {
    dispatch(setCriteriaFilter({ date: 'all' }));
  }, []);

  const buttonsData: ButtonsData[] = [
    {
      id: 1,
      label: t('sidebar.today'),
      iconType: 'calendar-one',
      action: 'today',
      count: countTasks.today,
    },
    {
      id: 2,
      label: t('sidebar.next7Days'),
      iconType: 'calendar-seven',
      action: 'week',
      count: countTasks.week,
    },
    {
      id: 3,
      label: t('sidebar.all'),
      iconType: 'calendar-all',
      action: 'all',
      count: countTasks.all,
    },
  ];

  return (
    <div className={cx('nav-date')}>
      {buttonsData.map((it) => (
        <Button
          className={cx('nav-date__button', {
            'nav-date__button--pressed': it.id === buttonIsPressed,
          })}
          variant="primary"
          onClick={() => handleOnClick(it.id, it.action)}
          key={it.id}
        >
          <div className={cx('nav-date__wrapper')}>
            <Icon className={cx('nav-date__icon')} iconType={it.iconType} />
            <span className={cx('nav-date__button-label')}>{it.label}</span>
          </div>
          <span className={cx('nav-date__counter')}>{it.count > 0 ? it.count : null}</span>
        </Button>
      ))}
    </div>
  );
}

//TODO: refactoring
