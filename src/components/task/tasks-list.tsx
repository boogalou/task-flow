import styles from './task.module.scss';
import cnBind from 'classnames/bind';
import { Task } from './task.tsx';
import { Portal } from '../../shared/ui-kit/portal/portal.tsx';
import { ModalLayout } from '../../shared/ui-kit/modal/modal.tsx';
import { EditTask } from '../edit-task/editTask.tsx';
import { useModal } from '../../shared/ui-kit/modal/useModal.ts';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/redux/reduxHooks.ts';
import { selectTaskById, selectTasks } from './model/taskSlice.ts';

const cx = cnBind.bind(styles);

export function TasksList() {
  const tasks = useAppSelector(selectTasks);
  const { isOpen, openModal, closeModal } = useModal();
  const [taskId, setTaskId] = useState<number | null>(null);
  const task = useAppSelector((state) => selectTaskById(state.taskSlice, taskId!))!;
  const handleOnClickTask = (id: number) => {
    if (id) {
      setTaskId(id);
    }
  };

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
        {tasks.map((it) => (
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
