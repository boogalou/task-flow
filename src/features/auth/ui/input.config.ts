import { InputField } from 'shared/lib/forms/createInputFields.ts';
import { LoginFormData, RegistrationFormData } from 'shared/types/types.ts';

export const loginFields: InputField<LoginFormData>[] = [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'Enter email',
    label: 'Email',
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Enter Password',
    label: 'Password',
  },
];

export const registrationFields: InputField<RegistrationFormData>[] = [
  {
    id: 'username',
    name: 'username',
    type: 'text',
    placeholder: 'Enter name',
    label: 'Username',
  },
  {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'Enter email',
    label: 'Email',
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Enter Password',
    label: 'Password',
  },
  {
    id: 'confirmPassword',
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password',
    label: 'Confirm Password',
  },
];
