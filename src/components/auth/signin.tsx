import styles from './auth.module.scss';
import cnBind from 'classnames/bind';
import { LoginData } from './types.ts';
import { useAppDispatch } from '../../app/redux/reduxHooks.ts';
import { useForm } from './lib/useForm.ts';
import { loginValidationSchema } from './lib/validationSchema.ts';
import { signinRequest } from './model/auth.thunk.ts';
import { loginFields } from './model/loginFields.ts';
import Input from '../../shared/ui-kit/input/input.tsx';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { Link } from 'react-router-dom';
import { routes } from '../../shared/routes/routes.ts';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { useShowPassword } from './lib/useShowPassword.ts';

const cx = cnBind.bind(styles);

export function Signin() {
  const dispatch = useAppDispatch();

  const { types, toggleType } = useShowPassword({
    email: 'email',
    password: 'password',
  });

  const form = useForm<LoginData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      dispatch(
        signinRequest({
          user: {
            ...values,
          },
        }),
      );
      form.resetForm();
    },
  });

  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>Sign In</h2>
      <form className={cx('form')} onSubmit={form.handleSubmit} noValidate={true}>
        {loginFields(form.values, form.error, form.touched, types, toggleType).map((field) => (
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
            {field.name === 'password' ? (
              <div className={cx('form__icon')}>
                <div className={cx('form__icon')}>
                  <Icon
                    className={cx('icon--eye')}
                    onClick={field.toggleType}
                    iconType={field.type === 'password' ? 'eye-off' : 'eye'}
                  />
                </div>
              </div>
            ) : null}
            {field.touched && field.error && (
              <p className={cx('form__field--error')}>{field.error}</p>
            )}
          </div>
        ))}
        <Button className={cx('form__button')} type="submit" disabled={false}>
          Submit
        </Button>
      </form>
      <div className={cx('link')}>
        Don&apos;t have an account&nbsp;
        <Link to={routes.SIGNUP_PAGE}>Signup</Link>
      </div>
    </div>
  );
}
