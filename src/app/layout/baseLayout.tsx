import styles from './layout.module.scss';
import cnBind from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import { Notification } from '../../components/notification/notification.tsx';

const cx = cnBind.bind(styles);

export function BaseLayout() {
  return (
    <div className={cx('app-container')}>
      <Outlet />
      <Notification />
    </div>
  );
}
