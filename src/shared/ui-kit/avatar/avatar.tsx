import cnBind from 'classnames/bind';
import styles from './avatar.module.scss';

const cx = cnBind.bind(styles);

export interface AvatarProps {
  id?: number;
  className?: string;
  avatarUrl?: string;
  name?: string;
  isOnline?: boolean;
}

export function Avatar({ avatarUrl }: AvatarProps) {
  return (
    <div className={cx('avatar')}>
      {avatarUrl ? (
        <img className={cx('avatar__img')} src={avatarUrl} alt="user picture" />
      ) : (
        <div className={cx('avatar__color')} style={{ backgroundColor: '#219C90' }}>
          {'NM'}
        </div>
      )}
    </div>
  );
}
