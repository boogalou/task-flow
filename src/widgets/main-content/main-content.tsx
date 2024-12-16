import styles from './main-content.module.scss';
import cnBind from 'classnames/bind';
import { addDays, format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { Button } from 'shared/ui-kit/button/button.tsx';
import { Icon } from 'shared/ui-kit/icon/icon.tsx';
import { TaskForm } from 'widgets/task-form/taskForm.tsx';
import { Modal } from 'shared/ui-kit/modal/modal.tsx';
import { useModal } from 'shared/ui-kit/modal/useModal.ts';
import { TaskList } from 'entities/task/ui/task-list.tsx';
import { useAppSelector } from 'shared/lib/reduxHooks.ts';
import { selectFilter } from 'entities/task/model/taskSlice.ts';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const cx = cnBind.bind(styles);

export function MainContent() {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language === 'ru' ? ru : enUS;
  const { isOpen, openModal, closeModal } = useModal();
  const filters = useAppSelector(selectFilter);

  const subtitleDate = useMemo(() => {
    if (filters.date === 'today') {
      return format(new Date(), 'EEE, MMM dd', { locale: currentLocale });
    } else if (filters.date === 'week') {
      const today = new Date();
      const tomorrow = addDays(today, 1);
      const endDate = addDays(tomorrow, 6);
      return `${format(tomorrow, 'EEE, MMM dd', { locale: currentLocale })} - ${format(endDate, 'EEE, MMM dd', { locale: currentLocale })}`;
    }
    return '';
  }, [filters, currentLocale]);

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <div className={cx('content')}>
      <header className={cx('content__header')}>
        <h2 className={cx('content__title')}>{t(`mainContent.${filters.date}`)}</h2>
        {filters.date === 'all' ? null : (
          <div className={cx('content__subtitle')}>{subtitleDate}</div>
        )}
      </header>
      <TaskList />
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
