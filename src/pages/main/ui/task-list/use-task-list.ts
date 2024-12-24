import { useState, useMemo } from 'react';
import { parse, compareAsc } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'shared/lib/reduxHooks.ts';
import { selectFilter, selectTaskById, selectTasks } from 'entities/task/model/taskSlice.ts';
import { useModal } from 'shared/ui-kit/modal/useModal.ts';
import { useFilterTasks } from 'entities/task/lib/useFilterTasks.ts';
import { groupTasksByDate } from 'entities/task/lib/groupTasksByDate.ts';

export const useTaskList = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language === 'ru' ? ru : enUS;
  const tasks = useAppSelector(selectTasks);
  const filters = useAppSelector(selectFilter);
  const { isOpen, openModal, closeModal } = useModal();
  const [taskId, setTaskId] = useState<number | null>(null);

  const task = useAppSelector((state) => selectTaskById(state.taskSlice, taskId!))!;
  const filteredTasks = useFilterTasks(tasks, filters);
  const groupedTasks = groupTasksByDate(filteredTasks, currentLocale);

  const handleClickOnEdit = (id: number) => {
    if (id) {
      setTaskId(id);
      openModal();
    }
  };

  const handleCloseModal = () => {
    setTaskId(null);
    closeModal();
  };

  const sortedGroupedTasks = useMemo(() => {
    return Object.entries(groupedTasks).sort(([dateA], [dateB]) => {
      const parsedDateA = parse(dateA, 'yyyy, EEE, MMM dd', new Date(), { locale: currentLocale });
      const parsedDateB = parse(dateB, 'yyyy, EEE, MMM dd', new Date(), { locale: currentLocale });
      return compareAsc(parsedDateA, parsedDateB);
    });
  }, [groupedTasks, currentLocale]);

  return {
    sortedGroupedTasks,
    filters,
    task,
    isOpen,
    handleClickOnEdit,
    handleCloseModal,
  };
};
