import styles from './task.module.scss';
import cnBind from 'classnames/bind';
import { Task } from './task.tsx';
import { Portal } from '../../shared/ui-kit/portal/portal.tsx';
import { ModalLayout } from '../../shared/ui-kit/modal/modal.tsx';
import { EditTask } from '../edit-task/editTask.tsx';
import { useModal } from '../../shared/ui-kit/modal/useModal.ts';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/redux/reduxHooks.ts';
import { selectFilter, selectTaskById, selectTasks } from './model/taskSlice.ts';
import { useFilteredTasks } from './lib/useFilteredTasks.ts';

const cx = cnBind.bind(styles);

export function TasksList() {
  const tasks = useAppSelector(selectTasks);
  const filter = useAppSelector(selectFilter);
  const { isOpen, openModal, closeModal } = useModal();
  const [taskId, setTaskId] = useState<number | null>(null);
  const handleOnClickTask = (id: number) => {
    if (id) {
      setTaskId(id);
    }
  };
  const task = useAppSelector((state) => selectTaskById(state.taskSlice, taskId!))!;
  const filteredTask = useFilteredTasks(tasks, filter);

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

  const filteredByCompleted = filteredTask.filter((task) => task.isCompleted);
  const filteredByUncompleted = filteredTask.filter((task) => !task.isCompleted);
  const sortedTasks = [...filteredByUncompleted, ...filteredByCompleted];

  return (
    <>
      <div className={cx('tasks-list')}>
        {sortedTasks.map((it) => (
          <Task key={it.id} {...it} handleOnClickTask={handleOnClickTask} openModal={openModal} />
        ))}
      </div>
      <Portal>
        <ModalLayout isOpen={isOpen} closeModal={closeModal}>
          {taskId !== null && <EditTask task={task} closeModal={closeModal} />}
        </ModalLayout>
      </Portal>
    </>
  );
}
