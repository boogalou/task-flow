import styles from './nav-date.module.scss';
import cnBind from 'classnames/bind';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { IconType } from '../../shared/ui-kit/icon/iconType.tsx';

const cx = cnBind.bind(styles);

interface ButtonsData {
  id: number;
  btnLabel: string;
  iconType: IconType;
}

const buttonsData: ButtonsData[] = [
  { id: 1, btnLabel: 'Today', iconType: 'calendar-one' },
  { id: 2, btnLabel: 'Next 7 Days', iconType: 'calendar-seven' },
  { id: 3, btnLabel: 'All', iconType: 'calendar-all' },
];

const countTasks = 42;

export function NavDate() {
  return (
    <div className={cx('nav-date')}>
      {buttonsData.map((it) => (
        <Button className={cx('nav-date__button')} key={it.id}>
          <div className={cx('nav-date__wrapper')}>
            <Icon className={cx('nav-date__icon')} iconType={it.iconType} />
            <span className={cx('nav-date__button-label')}>{it.btnLabel}</span>
          </div>
          <span className={cx('nav-date__counter')}>{countTasks}</span>
        </Button>
      ))}
    </div>
  );
}
