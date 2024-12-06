import { InputField } from '../../shared/lib/createInputFields.ts';
import { LoginRequestData, RegistrationRequestData } from '../../shared/types/types.ts';

export const registrationFields: InputField<RegistrationRequestData>[] = [
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

export const loginFields: InputField<LoginRequestData>[] = [
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
