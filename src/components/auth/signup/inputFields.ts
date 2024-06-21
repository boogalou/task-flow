import { RegistrationData } from "../types.ts";


interface InputField {
  id: string;
  name: keyof RegistrationData;
  type: string;
  placeholder: string;
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  toggleType?: () => void;
}

export const inputFields = (
  signupData: RegistrationData,
  errors: Partial<RegistrationData>,
  touched: Partial<{ [key in keyof RegistrationData]: boolean }>,
  types: { [key in keyof RegistrationData]: string },
  toggleType: (field: keyof RegistrationData) => void
): InputField[] => [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    label: 'Email',
    value: signupData.email,
    error: errors.email,
    touched: touched.email,
  },
  {
    id: 'username',
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    label: 'Username',
    value: signupData.username,
    error: errors.username,
    touched: touched.username,
  },
  {
    id: 'password',
    name: 'password',
    type: types.password,
    placeholder: 'Password',
    label: 'Password',
    value: signupData.password,
    error: errors.password,
    touched: touched.password,
    toggleType: () => toggleType('password'),
  },
  {
    id: 'confirmPassword',
    name: 'confirmPassword',
    type: types.confirmPassword,
    placeholder: 'Confirm password',
    label: 'Confirm password',
    value: signupData.confirmPassword,
    error: errors.confirmPassword,
    touched: touched.confirmPassword,
    toggleType: () => toggleType('confirmPassword'),
  },
];
