import styles from './profile-avatar.module.scss';
import cnBind from 'classnames/bind';
import { Avatar } from 'shared/ui-kit/avatar/avatar.tsx';
import { Icon } from 'shared/ui-kit/icon/icon.tsx';

const cx = cnBind.bind(styles);

interface ProfileAvatarProps {
  avatarUrl?: string;
}

export function ProfileAvatar({ avatarUrl }: ProfileAvatarProps) {
  return (
    <div className={cx('avatar')}>
      <Avatar className={cx('avatar__img')} avatarUrl={avatarUrl}>
        <label className={cx('avatar__icon-overlay')}>
          <input className={cx('avatar__input')} type="file" accept="image/*" />
          <Icon className={cx('avatar__icon')} iconType={'camera'} />
        </label>
      </Avatar>
    </div>
  );
}
