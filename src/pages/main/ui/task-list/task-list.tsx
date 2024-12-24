import styles from './task-list.module.scss';
import cnBind from 'classnames/bind';
import { TaskItem } from 'entities/task/ui/task-item.tsx';
import { Modal } from 'shared/ui-kit/modal/modal.tsx';
import { TaskForm } from 'features/task/create-update-task/taskForm.tsx';
import { StatusUpdate } from 'features/task';
import { useTaskList } from 'pages/main/ui/task-list/use-task-list.ts';

const cx = cnBind.bind(styles);

export function TaskList() {
  const prop = useTaskList();
  return (
    <>
      <div className={cx('task-list')}>
        {prop.sortedGroupedTasks.map(([date, tasksForDate]) => (
          <div className={cx('task-list__group')} key={date}>
            {prop.filters.date !== 'today' && (
              <div className={cx('task-list__group-header')}>{date}</div>
            )}
            {tasksForDate.map((it) => (
              <TaskItem
                key={it.id}
                {...it}
                statusUpdate={<StatusUpdate id={it.id} isCompleted={it.isCompleted!} />}
                handleClickOnEdit={prop.handleClickOnEdit}
              />
            ))}
          </div>
        ))}
      </div>
      <Modal isOpen={prop.isOpen} closeModal={prop.handleCloseModal}>
        {prop.task && <TaskForm task={prop.task} closeModal={prop.handleCloseModal} />}
      </Modal>
    </>
  );
}
