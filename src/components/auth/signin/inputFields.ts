import { LoginData } from "../types.ts";


interface InputField {
  id: string;
  name: keyof LoginData;
  type: string;
  placeholder: string;
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  toggleType?: () => void;
}

export const inputFields = (
  signinData: LoginData,
  errors: Partial<LoginData>,
  touched: Partial<{ [key in keyof LoginData]: boolean }>,
  types: { [key in keyof LoginData]: string },
  toggleType: (field: keyof LoginData) => void
): InputField[] => [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    label: 'Email',
    value: signinData.email,
    error: errors.email,
    touched: touched.email,
  },
  {
    id: 'password',
    name: 'password',
    type: types.password,
    placeholder: 'Password',
    label: 'Password',
    value: signinData.password,
    error: errors.password,
    touched: touched.password,
    toggleType: () => toggleType('password'),
  },
];
