import styles from './avatar.module.scss';
import cnBind from 'classnames/bind';
import { ReactNode } from 'react';

const cx = cnBind.bind(styles);

export interface AvatarProps {
  id?: number;
  className?: string;
  avatarUrl?: string | null;
  name?: string;
  isOnline?: boolean;
  children?: ReactNode;
}

export function Avatar({ avatarUrl, children }: AvatarProps) {
  return (
    <div className={cx('avatar')}>
      {avatarUrl ? (
        <img className={cx('avatar__img')} src={avatarUrl} alt="user picture" />
      ) : (
        <div className={cx('avatar__color')} style={{ backgroundColor: '#219C90' }}>
          {'NM'}
        </div>
      )}
      {children}
    </div>
  );
}
