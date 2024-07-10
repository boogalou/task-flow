import styles from './toast.module.scss';
import cnBind from 'classnames/bind';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';

const cx = cnBind.bind(styles);

type ToastType = 'success' | 'error';

interface ToastProps {
  toastMessage?: string;
  toastType?: ToastType;
}

export function Toast({ toastMessage, toastType = 'error' }: ToastProps) {
  return (
    <div className={cx('toast')}>
      <Icon className={cx('toast__icon', `toast__icon--${toastType}`)} iconType={toastType} />
      <span className={cx('toast__message')}>{'Toast Message'}</span>
    </div>
  );
}
