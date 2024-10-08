import styles from './main-header.module.scss';
import cnBind from 'classnames/bind';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { Search } from '../search/search.tsx';
import { Button } from '../../shared/ui-kit/button/button.tsx';

const cx = cnBind.bind(styles);

interface HeaderProps {
  onClick?: () => void;
}

export function MainHeader({ onClick }: HeaderProps) {
  const handleButtonQuestion = () => {
    console.log('click on button question');
  };

  const handleButtonBell = () => {
    console.log('click on button bell');
  };

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
          onClick={handleButtonQuestion}
        >
          <Icon iconType={'question-mark'} />
        </Button>
        <Button
          className={cx('header__actions-button', 'header__actions-button--help')}
          onClick={handleButtonBell}
        >
          <Icon iconType={'bell'} />
        </Button>
      </div>
    </header>
  );
}
