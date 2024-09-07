import styles from './main-content.module.scss';
import cnBind from 'classnames/bind';
import { addDays, format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { TaskForm } from '../task-form/taskForm.tsx';
import { Portal } from '../../shared/ui-kit/portal/portal.tsx';
import { ModalLayout } from '../../shared/ui-kit/modal/modal.tsx';
import { useModal } from '../../shared/ui-kit/modal/useModal.ts';
import { TasksList } from '../task/tasks-list.tsx';
import { useAppSelector } from '../../app/store/reduxHooks.ts';
import { selectFilter } from '../task/model/taskSlice.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const cx = cnBind.bind(styles);

export function MainContent() {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language === 'ru' ? ru : enUS;
  const { isOpen, openModal, closeModal } = useModal();
  const [subtitleDate, setSubtitleDate] = useState('');
  const filters = useAppSelector(selectFilter);

  const handleOpenModal = () => {
    openModal();
  };

  useEffect(() => {
    if (filters.date === 'today') {
      setSubtitleDate(format(new Date(), 'EEE, MMM dd', { locale: currentLocale }));
    } else if (filters.date === 'week') {
      const today = new Date();
      const tomorrow = addDays(today, 1);
      const endDate = addDays(tomorrow, 6);
      setSubtitleDate(
        `${format(tomorrow, 'EEE, MMM dd', { locale: currentLocale })} - ${format(endDate, 'EEE, MMM dd', { locale: currentLocale })}`,
      );
    }
  }, [filters]);

  return (
    <div className={cx('content')}>
      <header className={cx('content__header')}>
        <h2 className={cx('content__title')}>{t(`mainContent.${filters.date}`)}</h2>
        {filters.date === 'all' ? null : (
          <div className={cx('content__subtitle')}>{subtitleDate}</div>
        )}
      </header>
      <TasksList />
      <Button
        className={cx('content__button', 'content__button-add')}
        variant="primary"
        onClick={handleOpenModal}
      >
        <Icon iconType="cross" />
        <span className={cx('content__button-text')}>{t('mainContent.addTaskButton')}</span>
      </Button>
      <Portal>
        <ModalLayout isOpen={isOpen} closeModal={closeModal}>
          <TaskForm closeModal={closeModal} />
        </ModalLayout>
      </Portal>
    </div>
  );
}
