import styles from './auth.module.scss';
import cnBind from 'classnames/bind';
import Input from '../../shared/ui-kit/input/input.tsx';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { RegistrationData } from '../../shared/types/types.ts';
import { useAppDispatch } from '../../app/store/reduxHooks.ts';
import { signupRequest } from './model/auth.thunk.ts';
import { useForm } from './lib/useForm.ts';
import { registrationValidationSchema } from './lib/validationSchema.ts';
import { Link } from 'react-router-dom';
import { routes } from '../../shared/routes/routes.ts';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { useShowPassword } from './lib/useShowPassword.ts';
import { createInputFields } from '../../shared/lib/createInputFields.ts';
import { registrationFields } from './inputConfig.ts';
import { useTranslation } from 'react-i18next';

const cx = cnBind.bind(styles);

export function Signup() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { types, toggleType } = useShowPassword({
    username: 'text',
    email: 'email',
    password: 'password',
    confirmPassword: 'password',
  });

  const form = useForm<RegistrationData>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      dispatch(
        signupRequest({
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
      <h2 className={cx('title')}>{t('authPage.signUp')}</h2>
      <form className={cx('form')} onSubmit={form.handleSubmit} noValidate={true}>
        {createInputFields<RegistrationData>(
          form.values,
          registrationFields,
          form.error,
          form.touched,
          types,
          toggleType,
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
            {field.name === 'password' || field.name === 'confirmPassword' ? (
              <div className={cx('form__icon')}>
                <Icon
                  className={cx('icon--eye')}
                  onClick={field.toggleType}
                  iconType={field.type === 'password' ? 'eye-off' : 'eye'}
                />
              </div>
            ) : null}
            {field.touched && field.error && (
              <p className={cx('form__field--error')}>{field.error}</p>
            )}
          </div>
        ))}
        <Button className={cx('form__button')} variant="primary" type="submit">
          {t('authPage.registrationButton')}
        </Button>
      </form>
      <div className={cx('link')}>
        {t('authPage.isRegister')}&nbsp;
        <Link to={routes.SIGNIN_PAGE}>{t('authPage.loginLink')}</Link>
      </div>
    </div>
  );
}
