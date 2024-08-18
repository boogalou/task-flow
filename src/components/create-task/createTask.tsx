import styles from './createTask.module.scss';
import cnBind from 'classnames/bind';
import { ModalLayout } from '../../shared/ui-kit/modal/modal.tsx';
import { Portal } from '../../shared/ui-kit/portal/portal.tsx';
import { useForm } from '../auth/lib/useForm.ts';
import { createInputFields } from '../../shared/lib/createInputFields.ts';
import { createTaskFields } from './inputConfig.ts';
import Input from '../../shared/ui-kit/input/input.tsx';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { useAppDispatch } from '../../app/redux/reduxHooks.ts';
import { TaskData } from '../task/model/types.ts';
import { crateTaskRequest } from '../task/model/taskThunk.ts';

const cx = cnBind.bind(styles);

export function CreateTask() {
  const dispatch = useAppDispatch();
  const form = useForm<TaskData>({
    initialValues: {
      title: '',
      description: '',
      category: '',
      color: '',
      date: '',
      time: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      dispatch(crateTaskRequest(values));
      form.resetForm();
    },
  });

  return (
    <Portal>
      <ModalLayout>
        <div className={cx('create')}>
          <span className={cx('create__title')}>Add Task</span>
          <form className={cx('form')} onSubmit={form.handleSubmit} noValidate={true}>
            {createInputFields<TaskData>(
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
                  value={field.value}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  label={field.label}
                />
              </div>
            ))}
            <Button className={cx('form__button')} type="submit">
              Save
            </Button>
          </form>
        </div>
      </ModalLayout>
    </Portal>
  );
}
