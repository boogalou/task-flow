import styles from './main-content.module.scss';
import cnBind from 'classnames/bind';
import { MouseEvent } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { CreateTask } from '../create-task/createTask.tsx';
import { useAppDispatch } from '../../app/redux/reduxHooks.ts';
import { openModal } from '../../shared/ui-kit/modal/model/modalSlice.ts';
import { Portal } from '../../shared/ui-kit/portal/portal.tsx';
import { ModalLayout } from '../../shared/ui-kit/modal/modal.tsx';

const cx = cnBind.bind(styles);

export function MainContent() {
  const dispatch = useAppDispatch();

  const handleOpenModal = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    dispatch(openModal());
  };

  return (
    <div className={cx('content')}>
      <Outlet />
      <Button className={cx('content__button', 'content__button-add')} onClick={handleOpenModal}>
        <Icon iconType="cross" />
        Add Task
      </Button>
      <Portal>
        <ModalLayout>
          <CreateTask />
        </ModalLayout>
      </Portal>
    </div>
  );
}
