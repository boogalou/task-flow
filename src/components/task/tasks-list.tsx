import styles from './task.module.scss';
import cnBind from 'classnames/bind';
import { Task } from './task.tsx';
import { Portal } from '../../shared/ui-kit/portal/portal.tsx';
import { ModalLayout } from '../../shared/ui-kit/modal/modal.tsx';
import { useModal } from '../../shared/ui-kit/modal/useModal.ts';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/redux/reduxHooks.ts';
import { selectFilter, selectTaskById, selectTasks } from './model/taskSlice.ts';
import { useFilterTasks } from './lib/useFilterTasks.ts';
import { TaskForm } from '../task-form/taskForm.tsx';

const cx = cnBind.bind(styles);

export function TasksList() {
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
  const filteredTask = useFilterTasks(tasks, filters);

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
      <div className={cx('tasks-list')}>
        {filteredTask.map((it) => (
          <Task key={it.id} {...it} handleOnClickTask={handleOnClickTask} openModal={openModal} />
        ))}
      </div>
      <Portal>
        <ModalLayout isOpen={isOpen} closeModal={closeModal}>
          {taskId !== null && <TaskForm task={task} closeModal={closeModal} />}
        </ModalLayout>
      </Portal>
    </>
  );
}
