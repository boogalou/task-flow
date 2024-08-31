import styles from './sidebar-header.module.scss';
import cnBind from 'classnames/bind';
import { Avatar } from '../../shared/ui-kit/avatar/avatar.tsx';
import { useAppSelector } from '../../app/redux/reduxHooks.ts';
import { selectAuthData } from '../auth/model/auth.slice.ts';

const cx = cnBind.bind(styles);

export function SidebarHeader() {
  const user = useAppSelector(selectAuthData);
  return (
    <header className={cx('sidebar-header')}>
      <Avatar avatarUrl={user?.userPic} name={user?.username} />
      <div>{user?.username}</div>
    </header>
  );
}
