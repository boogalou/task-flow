import styles from './taskForm.module.scss';
import cnBind from 'classnames/bind';
import { useForm } from '../auth/lib/useForm.ts';
import Input from '../../shared/ui-kit/input/input.tsx';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { useAppDispatch, useAppSelector } from '../../app/store/reduxHooks.ts';
import { createTaskRequest, updateTaskRequest } from '../task/model/taskThunk.ts';
import { Task, TaskFormData } from '../../shared/types/types.ts';
import { parseDate } from './lib/parseDate.ts';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Textarea } from '../../shared/ui-kit/textarea/textarea.tsx';
import { selectCategories } from '../task/model/taskSlice.ts';
import { Select } from '../../shared/ui-kit/select/select.tsx';

const cx = cnBind.bind(styles);

interface TaskFormProps {
  task?: Task;
  closeModal: () => void;
}

export function TaskForm({ task, closeModal }: TaskFormProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isEditMode = Boolean(task);
  const action = isEditMode ? t('taskForm.editAction') : t('taskForm.addAction');
  const categories = useAppSelector(selectCategories);

  const initialValues = task
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
    <div className={cx('task-form')}>
      <div className={cx('task-form__header')}>
        <span className={cx('task-form__title')}>{t('taskForm.formTitle', { action })}</span>
      </div>
      <form className={cx('form')} onSubmit={form.handleSubmit} noValidate={true}>
        <Input
          classNameLabel={cx('form__label', 'form__label-title')}
          classNameInput={cx('form__input', 'form__input-title')}
          onChange={form.handleOnChange}
          onBlur={form.handleOnBlur}
          id="title"
          name="title"
          type="text"
          placeholder="Task title"
          value={form.values.title}
          autoComplete="off"
          label={t('taskForm.taskTitle')}
        />
        <Textarea
          classNameLabel={cx('form__label', 'form__label-description')}
          classNameInput={cx('form__input', 'form__input-description')}
          onChange={form.handleOnChange}
          onBlur={form.handleOnBlur}
          id="description"
          name="description"
          type="text"
          placeholder="Task description"
          value={form.values.description}
          label={t('taskForm.taskDescription')}
          maxLength={300}
          rows={3}
          autoComplete="off"
        />
        <Input
          classNameLabel={cx('form__label', 'form__label-category')}
          classNameInput={cx('form__input', 'form__input-category')}
          onChange={form.handleOnChange}
          onBlur={form.handleOnBlur}
          id="category"
          name="category"
          type="text"
          placeholder="Add category"
          value={form.values.category}
          autoComplete="off"
          label={t('taskForm.addCategory')}
        />

        <Select
          className={cx('form__select')}
          options={categories}
          type="text"
          onChange={form.handleOnChange}
        />

        <div className={cx('form__date-group')}>
          <Input
            classNameLabel={cx('form__label', 'form__label-datepicker')}
            classNameInput={cx('form__input', 'form__input-datepicker')}
            onChange={form.handleOnChange}
            onBlur={form.handleOnBlur}
            id="datepicker"
            name="date"
            type="date"
            value={form.values.date}
            label={t('taskForm.setDate')}
          />
          <Input
            classNameLabel={cx('form__label', 'form__label-timepicker')}
            classNameInput={cx('form__input', 'form__input-timepicker')}
            onChange={form.handleOnChange}
            onBlur={form.handleOnBlur}
            id="timepicker"
            name="time"
            type="time"
            value={form.values.time}
          />
        </div>
        <Button
          className={cx('form__button', 'form__button--save')}
          variant="primary"
          type="submit"
        >
          {t('taskForm.saveButton')}
        </Button>
      </form>
    </div>
  );
}
