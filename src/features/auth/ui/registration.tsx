import styles from 'features/auth/ui/form.module.scss';
import cnBind from 'classnames/bind';
import Input from 'shared/ui-kit/input/input.tsx';
import { Button } from 'shared/ui-kit/button/button.tsx';
import { RegistrationFormData } from 'shared/types/types.ts';
import { Link } from 'react-router-dom';
import { routes } from 'shared/constants/routes.ts';
import { Icon } from 'shared/ui-kit/icon/icon.tsx';
import { useShowPassword } from 'shared/lib/forms/use-show-password.ts';
import { createInputFields } from 'shared/lib/forms/createInputFields.ts';
import { useTranslation } from 'react-i18next';
import { useRegistrationForm } from '../lib/use-registration-form.ts';
import { registrationFields } from 'features/auth/ui/input.config.ts';

const cx = cnBind.bind(styles);

export function Registration() {
  const { t } = useTranslation();
  const { types, toggleType } = useShowPassword({
    username: 'text',
    email: 'email',
    password: 'password',
    confirmPassword: 'password',
  });

  const form = useRegistrationForm();

  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>{t('authPage.signUp')}</h2>
      <form className={cx('form')} onSubmit={form.handleSubmit} noValidate={true}>
        {createInputFields<RegistrationFormData>(
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
        <Link to={routes.LOGIN_PAGE}>{t('authPage.loginLink')}</Link>
      </div>
    </div>
  );
}
