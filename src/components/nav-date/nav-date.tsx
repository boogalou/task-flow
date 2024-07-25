import styles from './nav-date.module.scss';
import cnBind from 'classnames/bind';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { IconType } from '../../shared/ui-kit/icon/iconType.tsx';
import { useState } from 'react';

const cx = cnBind.bind(styles);

interface ButtonsData {
  id: number;
  label: string;
  iconType: IconType;
}

const buttonsData: ButtonsData[] = [
  { id: 1, label: 'Today', iconType: 'calendar-one' },
  { id: 2, label: 'Next 7 Days', iconType: 'calendar-seven' },
  { id: 3, label: 'All', iconType: 'calendar-all' },
];

const countTasks = 42;

export function NavDate() {
  const [buttonIsPressed, setButtonIsPressed] = useState<null | number>(null);
  const handleOnClick = (id: number) => {
    setButtonIsPressed(id);
  };

  return (
    <div className={cx('nav-date')}>
      {buttonsData.map((it) => (
        <Button
          className={cx('nav-date__button', {
            'nav-date__button--pressed': it.id === buttonIsPressed,
          })}
          onClick={() => handleOnClick(it.id)}
          key={it.id}
        >
          <div className={cx('nav-date__wrapper')}>
            <Icon className={cx('nav-date__icon')} iconType={it.iconType} />
            <span className={cx('nav-date__button-label')}>{it.label}</span>
          </div>
          <span className={cx('nav-date__counter')}>{countTasks}</span>
        </Button>
      ))}
    </div>
  );
}
