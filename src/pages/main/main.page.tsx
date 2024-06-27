import styles from './mainPage.module.scss';
import cnBind from 'classnames/bind';
import { faker } from '@faker-js/faker';
import { Avatar } from '../../shared/ui-kit/avatar/avatar.tsx';
import { Header } from '../../components/header/header.tsx';

const cx = cnBind.bind(styles);

const user = {
  username: faker.person.firstName(),
  avatarUrl: faker.image.avatar(),
};

export function MainPage() {
  return (
    <div className={cx('main')}>
      <Header />
      <aside className={cx('main__sidebar')}>
        <header className={cx('main__sidebar-header')}>
          <Avatar avatarUrl={user.avatarUrl} name={user.username} />
          <div>{user.username}</div>
        </header>
      </aside>
      <main className={cx('main__content')}></main>
    </div>
  );
}
