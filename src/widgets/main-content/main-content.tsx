import styles from './main-content.module.scss';
import cnBind from 'classnames/bind';
import { Button } from 'shared/ui-kit/button/button.tsx';
import { Icon } from 'shared/ui-kit/icon/icon.tsx';
import { TaskForm } from 'features/task/create-update-task/taskForm.tsx';
import { Modal } from 'shared/ui-kit/modal/modal.tsx';
import { ReactNode } from 'react';
import { useMianContent } from 'widgets/main-content/lib/useMianContent.ts';

const cx = cnBind.bind(styles);

interface MainContentProps {
  TaskList: ReactNode;
}

export function MainContent({ TaskList }: MainContentProps) {
  const { filters, isOpen, closeModal, handleOpenModal, subtitleDate, t } = useMianContent();

  return (
    <div className={cx('content')}>
      <header className={cx('content__header')}>
        <h2 className={cx('content__title')}>{t(`mainContent.${filters.date}`)}</h2>
        {filters.date === 'all' ? null : (
          <div className={cx('content__subtitle')}>{subtitleDate}</div>
        )}
      </header>
      {TaskList}
      <Button
        className={cx('content__button', 'content__button-add')}
        variant="primary"
        onClick={handleOpenModal}
      >
        <Icon iconType="cross" />
        <span className={cx('content__button-text')}>{t('mainContent.addTaskButton')}</span>
      </Button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <TaskForm closeModal={closeModal} />
      </Modal>
    </div>
  );
}
