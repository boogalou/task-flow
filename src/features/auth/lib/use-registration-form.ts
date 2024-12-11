import { useAppDispatch } from 'shared/lib/reduxHooks.ts';
import { useFrom } from 'shared/lib/forms/use-from.ts';
import { RegistrationFormData } from 'shared/types/types.ts';
import { registrationRequest } from 'entities/auth/model/registration.thunk.ts';
import { registrationValidationSchema } from 'entities/auth';

export function useRegistrationForm() {
  const dispatch = useAppDispatch();

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

  return form;
}
