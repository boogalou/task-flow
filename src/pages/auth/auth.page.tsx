import { Outlet } from 'react-router-dom';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import styles from './authPage.module.scss';
import cnBind from 'classnames/bind';

const cx = cnBind.bind(styles);

export function AuthLayout() {
  return (
    <div className={cx('auth-page')}>
      <header className={cx('auth-page__header')}>
        <div className={cx('auth-page__logo')}>
          <Icon className={cx('auth-page__logo-icon')} iconType={'logo'} />
          <div className={cx('auth-page__logo-title')}>TaskFlow</div>
        </div>
      </header>
      <div className={cx('auth-page__content')}>
        <Outlet />
      </div>
      <div className={cx('auth-page__splash')}>
        <Icon className={cx('auth-page__splash-icon')} iconType="auth-splash" />
      </div>
    </div>
  );
}
