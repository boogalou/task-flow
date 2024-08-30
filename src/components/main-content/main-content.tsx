import styles from './main-content.module.scss';
import cnBind from 'classnames/bind';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { TaskForm } from '../task-form/taskForm.tsx';
import { Portal } from '../../shared/ui-kit/portal/portal.tsx';
import { ModalLayout } from '../../shared/ui-kit/modal/modal.tsx';
import { useModal } from '../../shared/ui-kit/modal/useModal.ts';
import { TasksList } from '../task/tasks-list.tsx';
import { useAppSelector } from '../../app/redux/reduxHooks.ts';
import { selectFilter } from '../task/model/taskSlice.ts';

const cx = cnBind.bind(styles);

export function MainContent() {
  const { isOpen, openModal, closeModal } = useModal();
  const filters = useAppSelector(selectFilter);

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <div className={cx('content')}>
      <header className={cx('content__header')}>
        <h2 className={cx('content__title')}>{filters.date}</h2>
        <div className={cx('content__subtitle')}>Aug 13, Today 7</div>
      </header>
      <TasksList />
      <Button className={cx('content__button', 'content__button-add')} onClick={handleOpenModal}>
        <Icon iconType="cross" />
        <span className={cx('content__button-text')}>Add Task</span>
      </Button>
      <Portal>
        <ModalLayout isOpen={isOpen} closeModal={closeModal}>
          <TaskForm closeModal={closeModal} />
        </ModalLayout>
      </Portal>
    </div>
  );
}
