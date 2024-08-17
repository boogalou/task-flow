import styles from './main-content.module.scss';
import cnBind from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { CreateTask } from '../create-task/createTask.tsx';

const cx = cnBind.bind(styles);

export function MainContent() {
  return (
    <div className={cx('content')}>
      <Outlet />
      <Button className={cx('content__button', 'content__button-add')}>
        <Icon iconType="cross" />
        Add Task
      </Button>
      <CreateTask />
    </div>
  );
}
