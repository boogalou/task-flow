import { useTranslation } from 'react-i18next';
import { enUS, ru } from 'date-fns/locale';
import { useModal } from 'shared/ui-kit/modal/useModal.ts';
import { useAppSelector } from 'shared/lib/reduxHooks.ts';
import { selectFilter } from 'entities/task/model/taskSlice.ts';
import { useMemo } from 'react';
import { addDays, format } from 'date-fns';

export function useMianContent() {
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

  return {
    isOpen,
    closeModal,
    subtitleDate,
    filters,
    handleOpenModal,
    t,
  };
}
