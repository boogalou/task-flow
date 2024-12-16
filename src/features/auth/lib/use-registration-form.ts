import { useAppDispatch } from 'shared/lib/reduxHooks.ts';
import { useFrom } from 'shared/lib/forms/use-from.ts';
import { RegistrationFormData } from 'shared/types/types.ts';
import { registrationRequest } from 'entities/auth/model/registration.thunk.ts';
import { registrationValidationSchema } from 'entities/auth';
import { useTranslation } from 'react-i18next';
import { useShowPassword } from 'shared/lib/forms/use-show-password.ts';

export function useRegistrationForm() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const { types, toggleType } = useShowPassword({
    username: 'text',
    email: 'email',
    password: 'password',
    confirmPassword: 'password',
  });

  const form = useFrom<RegistrationFormData>({
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
      dispatch(registrationRequest({ ...values }));
      form.resetForm();
    },
  });

  return { form, types, toggleType, t };
}
