import styles from '../../entities/auth/auth.module.scss';
import cnBind from 'classnames/bind';
import { useAppDispatch } from '../../shared/lib/reduxHooks.ts';
import { useForm } from '../../entities/auth/lib/useForm.ts';
import { loginValidationSchema } from '../../entities/auth/lib/validationSchema.ts';
import { loginRequest } from '../../features/auth/usecases/auth.thunk.ts';
import { createInputFields } from '../../shared/lib/createInputFields.ts';
import Input from '../../shared/ui-kit/input/input.tsx';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { Link } from 'react-router-dom';
import { routes } from '../../shared/routes/routes.ts';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { useShowPassword } from '../../entities/auth/lib/useShowPassword.ts';
import { loginFields } from '../../entities/auth/inputConfig.ts';
import { useTranslation } from 'react-i18next';
import { LoginRequestData } from '../../shared/types/types.ts';

const cx = cnBind.bind(styles);

export function Signin() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { types, toggleType } = useShowPassword({
    email: 'email',
    password: 'password',
  });
  const form = useForm<LoginRequestData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginRequest(values));
      form.resetForm();
    },
  });

  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>{t('authPage.signIn')}</h2>
      <form className={cx('form')} onSubmit={form.handleSubmit} noValidate={true}>
        {createInputFields(
          form.values,
          loginFields,
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
            {field.name === 'password' ? (
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
        <Button className={cx('form__button')} variant={'primary'} type="submit" disabled={false}>
          {t('authPage.loginButton')}
        </Button>
      </form>
      <div className={cx('link')}>
        {t('authPage.noAccount')}&nbsp;
        <Link to={routes.REGISTRATION_PAGE}>{t('authPage.registrationLink')}</Link>
      </div>
    </div>
  );
}
