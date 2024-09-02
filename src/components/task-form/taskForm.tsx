import styles from './taskForm.module.scss';
import cnBind from 'classnames/bind';
import { useForm } from '../auth/lib/useForm.ts';
import { createInputFields } from '../../shared/lib/createInputFields.ts';
import { createTaskFields } from './inputConfig.ts';
import Input from '../../shared/ui-kit/input/input.tsx';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { useAppDispatch } from '../../app/redux/reduxHooks.ts';
import { updateTaskRequest, createTaskRequest } from '../task/model/taskThunk.ts';
import { Task, TaskFormData } from '../../shared/types/types.ts';
import { parseDate } from './lib/parseDate.ts';
import { useEffect } from 'react';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';

const cx = cnBind.bind(styles);

interface TaskFormProps {
  task?: Task;
  closeModal: () => void;
}

export function TaskForm({ task, closeModal }: TaskFormProps) {
  const dispatch = useAppDispatch();

  const isEditMode = Boolean(task);

  const initialValues =
    isEditMode && task
      ? {
          title: task?.title || '',
          description: task?.description || '',
          category: task?.category || '',
          color: task?.color || '',
          date: parseDate(task.dueDate).dateString || '',
          time: parseDate(task.dueDate).timeString || '',
        }
      : {
          title: '',
          description: '',
          category: '',
          color: '',
          date: '',
          time: '',
        };

  const form = useForm<TaskFormData>({
    initialValues,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      if (isEditMode) {
        dispatch(
          updateTaskRequest({
            id: task?.id,
            title: values.title,
            description: values.description,
            category: values.category,
            color: values.color,
            dueDate: `${values.date}T${values.time}:00.000Z`,
          }),
        );
      } else {
        dispatch(
          createTaskRequest({
            title: values.title,
            description: values.description,
            category: values.category,
            color: values.color,
            dueDate: `${values.date}T${values.time}:00.000Z`,
            isCompleted: false,
          }),
        );
      }
      closeModal();
      form.resetForm();
    },
  });

  useEffect(() => {
    form.setValues(initialValues);
  }, [task]);

  return (
    <div className={cx('create')}>
      <div className={cx('create__header')}>
        <span className={cx('create__title')}>{isEditMode ? 'Edit Task' : 'Add Task'}</span>
      </div>
      <form className={cx('form')} onSubmit={form.handleSubmit} noValidate={true}>
        {createInputFields<TaskFormData>(
          form.values,
          createTaskFields,
          form.error,
          form.touched,
        ).map((field) => (
          <div className={cx('form__field')} key={field.id}>
            <Input
              classNameLabel={cx('form__label')}
              classNameInput={cx('form__input')}
              onChange={form.handleOnChange}
              onBlur={form.handleOnBlur}
              value={form.values[field.name] || ''}
              id={field.id}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              label={field.label}
            />
          </div>
        ))}
        {isEditMode && (
          <Button
            className={cx('form__button', 'form__button--delete')}
            variant="outline"
            type="submit"
          >
            <Icon iconType={'trash-bin'} />
            Delete Task
          </Button>
        )}
        <Button
          className={cx('form__button', 'form__button--save')}
          variant="primary"
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
