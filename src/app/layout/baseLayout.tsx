import styles from './layout.module.scss';
import cnBind from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import { Toast } from '../../components/toast/toast.tsx';

const cx = cnBind.bind(styles);

export function BaseLayout() {
  return (
    <div className={cx('app-container')}>
      <Outlet />
      <Toast />
    </div>
  );
}
