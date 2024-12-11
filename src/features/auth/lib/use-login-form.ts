import { useAppDispatch } from 'shared/lib/reduxHooks.ts';
import { useFrom } from 'shared/lib/forms/use-from.ts';
import { LoginFormData } from 'shared/types/types.ts';
import { loginRequest } from 'entities/auth';
import { loginValidationSchema } from 'entities/auth';

export function useLoginForm() {
  const dispatch = useAppDispatch();

  const form = useFrom<LoginFormData>({
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

  return form;
}
