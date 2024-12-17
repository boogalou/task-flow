import styles from './task-list.module.scss';
import cnBind from 'classnames/bind';
import { TaskItem } from 'entities/task/ui/task-item.tsx';
import { Modal } from 'shared/ui-kit/modal/modal.tsx';
import { useModal } from 'shared/ui-kit/modal/useModal.ts';
import { useState } from 'react';
import { useAppSelector } from 'shared/lib/reduxHooks.ts';
import { selectFilter, selectTaskById, selectTasks } from 'entities/task/model/taskSlice.ts';
import { useFilterTasks } from 'entities/task/lib/useFilterTasks.ts';
import { TaskForm } from 'features/task/create-update-task/taskForm.tsx';
import { groupTasksByDate } from 'entities/task/lib/groupTasksByDate.ts';
import { useTranslation } from 'react-i18next';
import { enUS, ru } from 'date-fns/locale';
import { StatusUpdate } from 'features/task';

const cx = cnBind.bind(styles);

export function TaskList() {
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

  return (
    <>
      <div className={cx('task-list')}>
        {Object.entries(groupedTasks).map(([date, tasksForDate]) => (
          <div className={cx('task-list__group')} key={date}>
            {filters.date !== 'today' && (
              <div className={cx('task-list__group-header')}>{date}</div>
            )}
            {tasksForDate.map((it) => (
              <TaskItem
                key={it.id}
                {...it}
                statusUpdate={<StatusUpdate id={it.id} isCompleted={it.isCompleted!} />}
                handleClickOnEdit={handleClickOnEdit}
              />
            ))}
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} closeModal={handleCloseModal}>
        {task && <TaskForm task={task} closeModal={handleCloseModal} />}
      </Modal>
    </>
  );
}
