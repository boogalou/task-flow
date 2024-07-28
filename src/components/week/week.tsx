import styles from './week.module.scss';
import cnBind from 'classnames/bind';

const cx = cnBind.bind(styles);

export function Week() {
  return <div className={cx('week')}>Week</div>;
}
