import styles from './header.module.scss';
import cnBind from 'classnames/bind';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { Search } from '../search/search.tsx';
import { Button } from '../../shared/ui-kit/button/Button.tsx';

const cx = cnBind.bind(styles);

export function Header() {
  return (
    <header className={cx('header')}>
      <div className={cx('header__menu')}>
        <Icon className={cx('header__menu-icon')} iconType={'hamburger'} />
      </div>
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
