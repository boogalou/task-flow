import styles from './nav-actions.module.scss';
import cnBind from 'classnames/bind';
import { IconType } from '../../shared/ui-kit/icon/iconType.tsx';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';

const cx = cnBind.bind(styles);

interface ButtonData {
  id: number;
  label: string;
  iconType: IconType;
}

const buttonData: ButtonData[] = [
  { id: 1, label: 'Completed', iconType: 'checkmark' },
  { id: 2, label: 'Trash', iconType: 'trash-bin' },
];

export function NavActions() {
  return (
    <div className={cx('nav-actions')}>
      {buttonData.map((it) => (
        <Button className={cx('nav-actions__button')} key={it.id}>
          {<Icon className={cx('nav-actions__icon')} iconType={it.iconType} />}
          {it.label}
        </Button>
      ))}
    </div>
  );
}
