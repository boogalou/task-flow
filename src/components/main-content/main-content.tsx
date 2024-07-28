import styles from './main-content.module.scss';
import cnBind from 'classnames/bind';
import { Outlet } from 'react-router-dom';

const cx = cnBind.bind(styles);

export function MainContent() {
  return (
    <div className={cx('content')}>
      <Outlet />
    </div>
  );
}
