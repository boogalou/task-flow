import styles from './editTask.module.scss';
import cnBind from 'classnames/bind';
import { useAppDispatch } from '../../app/redux/reduxHooks.ts';
import { useForm } from '../auth/lib/useForm.ts';
import { updateTaskRequest } from '../task/model/taskThunk.ts';
import { parseDate } from './lib/parseDate.ts';
import { createInputFields } from '../../shared/lib/createInputFields.ts';
import Input from '../../shared/ui-kit/input/input.tsx';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { editTaskFields } from './inputConfig.ts';
import { useEffect } from 'react';
import { Task, TaskForm } from '../../shared/types/types.ts';

const cx = cnBind.bind(styles);

interface EditTaskProps {
  task: Task;
  closeModal: () => void;
}

export function EditTask({ task, closeModal }: EditTaskProps) {
  const dispatch = useAppDispatch();

  const date = parseDate(task.dueDate);

  const editTask: TaskForm = {
    title: task.title,
    description: task.description,
    category: task.category,
    color: task.color,
    date: date.dateString,
    time: date.timeString,
  };

  const form = useForm<TaskForm>({
    initialValues: {
      title: task.title || '',
      description: task.description || '',
      category: task.category || '',
      color: task.color || '',
      date: date.dateString || '',
      time: date.timeString || '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      dispatch(
        updateTaskRequest({
          id: task.id,
          title: values.title,
          description: values.description,
          category: values.category,
          color: values.color,
          dueDate: `${values.date}T${values.time}:00.000Z`,
        }),
      );
      closeModal();
    },
  });

  const handleCloseButton = () => {
    closeModal();
  };

  useEffect(() => {
    form.setValues(editTask);
  }, [task]);

  return (
    <div className={cx('edit')}>
      <div className={cx('edit__header')}>
        <span className={cx('edit__title')}>Edit Task</span>
      </div>
      <form className={cx('form')} onSubmit={form.handleSubmit} noValidate={true}>
        {createInputFields<TaskForm>(form.values, editTaskFields, form.error, form.touched).map(
          (field) => (
            <div className={cx('form__field')} key={field.id}>
              <Input
                classNameLabel={cx('form__label')}
                classNameInput={cx('form__input')}
                onChange={form.handleOnChange}
                onBlur={form.handleOnBlur}
                value={form.values[field.name] || field.value}
                id={field.id}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                label={field.label}
              />
            </div>
          ),
        )}
        <div className={cx('form__button-group')}>
          <Button className={cx('form__button')} type="button" onClick={handleCloseButton}>
            Cancel
          </Button>
          <Button className={cx('form__button')} type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
