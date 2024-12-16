import { useAppDispatch } from 'shared/lib/reduxHooks.ts';
import { useFrom } from 'shared/lib/forms/use-from.ts';
import { LoginFormData } from 'shared/types/types.ts';
import { loginRequest } from 'entities/auth';
import { loginValidationSchema } from 'entities/auth';
import { useTranslation } from 'react-i18next';
import { useShowPassword } from 'shared/lib/forms/use-show-password.ts';

export function useLoginForm() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { types, toggleType } = useShowPassword({
    email: 'email',
    password: 'password',
  });

  const form = useFrom<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      dispatch(loginRequest(values));
      form.resetForm();
    },
  });

  return { form, toggleType, types, t };
}
