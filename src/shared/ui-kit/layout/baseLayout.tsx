import styles from './layout.module.scss';
import cnBind from "classnames/bind";
import { Outlet } from "react-router-dom";

const cx = cnBind.bind(styles);

export function BaseLayout() {
  return (
    <div className={cx('app-container')}>
      <Outlet/>
    </div>
  )
}