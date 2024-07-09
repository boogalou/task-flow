import styles from './sidebar-header.module.scss';
import cnBind from 'classnames/bind';
import { Avatar } from '../../shared/ui-kit/avatar/avatar.tsx';
import { faker } from '@faker-js/faker';

const cx = cnBind.bind(styles);

const user = {
  username: faker.person.firstName(),
  avatarUrl: faker.image.avatar(),
};

export function SidebarHeader() {
  return (
    <header className={cx('sidebar-header')}>
      <Avatar avatarUrl={user.avatarUrl} name={user.username} />
      <div>{user.username}</div>
    </header>
  );
}
