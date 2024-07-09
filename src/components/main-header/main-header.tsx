import styles from './main-header.module.scss';
import cnBind from 'classnames/bind';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { Search } from '../search/search.tsx';
import { Button } from '../../shared/ui-kit/button/Button.tsx';

const cx = cnBind.bind(styles);

interface HeaderProps {
  onClick?: () => void;
}

export function MainHeader({ onClick }: HeaderProps) {
  return (
    <header className={cx('header')}>
      <Button className={cx('header__menu-button')} onClick={onClick}>
        <Icon className={cx('header__menu-icon')} iconType={'hamburger'} />
      </Button>
      <div className={cx('header__search')}>
        <Search />
      </div>
      <div className={cx('header__actions')}>
        <Button
          className={cx('header__actions-button', 'header__actions-button--help')}
          icon={<Icon iconType={'question-mark'} />}
        />
        <Button
          className={cx('header__actions-button', 'header__actions-button--notification')}
          icon={<Icon iconType={'bell'} />}
        />
      </div>
    </header>
  );
}
