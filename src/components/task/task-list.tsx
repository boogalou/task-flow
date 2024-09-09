import styles from './task.module.scss';
import cnBind from 'classnames/bind';
import { Task } from './task.tsx';
import { Modal } from '../../shared/ui-kit/modal/modal.tsx';
import { useModal } from '../../shared/ui-kit/modal/useModal.ts';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/store/reduxHooks.ts';
import { selectFilter, selectTaskById, selectTasks } from './model/taskSlice.ts';
import { useFilterTasks } from './lib/useFilterTasks.ts';
import { TaskForm } from '../task-form/taskForm.tsx';
import { groupTasksByDate } from './lib/groupTasksByDate.ts';
import { useTranslation } from 'react-i18next';
import { enUS, ru } from 'date-fns/locale';

const cx = cnBind.bind(styles);

export function TaskList() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language === 'ru' ? ru : enUS;
  const tasks = useAppSelector(selectTasks);
  const filters = useAppSelector(selectFilter);
  const { isOpen, openModal, closeModal } = useModal();
  const [taskId, setTaskId] = useState<number | null>(null);
  const handleOnClickTask = (id: number) => {
    if (id) {
      setTaskId(id);
    }
  };
  const task = useAppSelector((state) => selectTaskById(state.taskSlice, taskId!))!;
  const filteredTasks = useFilterTasks(tasks, filters);
  const groupedTasks = groupTasksByDate(filteredTasks, currentLocale);

  useEffect(() => {
    if (taskId !== null) {
      openModal();
    }
  }, [taskId, openModal]);

  useEffect(() => {
    if (!isOpen) {
      setTaskId(null);
    }
  }, [isOpen]);

  return (
    <>
      <div className={cx('task-list')}>
        {Object.entries(groupedTasks).map(([date, tasksForDate]) => (
          <div className={cx('task-list__group')} key={date}>
            {filters.date !== 'today' && (
              <div className={cx('task-list__group-header')}>{date}</div>
            )}
            {tasksForDate.map((it) => (
              <Task
                key={it.id}
                {...it}
                handleOnClickTask={handleOnClickTask}
                openModal={openModal}
              />
            ))}
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {task && <TaskForm task={task} closeModal={closeModal} />}
      </Modal>
    </>
  );
}
