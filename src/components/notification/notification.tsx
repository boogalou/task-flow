import styles from './notification.module.scss';
import cnBind from 'classnames/bind';

const cx = cnBind.bind(styles);

export function Notification() {
  return <div className={cx('notification')}>Notification</div>;
}
