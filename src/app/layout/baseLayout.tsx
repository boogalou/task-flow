import styles from './layout.module.scss';
import cnBind from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import { Notificaion } from 'shared/ui-kit/notification/notificaion.tsx';

const cx = cnBind.bind(styles);

export function BaseLayout() {
  return (
    <div className={cx('app-container')}>
      <Notificaion />
      <Outlet />
    </div>
  );
}
