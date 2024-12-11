export interface InputField<T> {
  id: string;
  name: keyof T;
  type: string;
  placeholder: string;
  label: string;
  value?: string;
  error?: string;
  touched?: boolean;
  toggleType?: () => void;
}

export function createInputFields<T>(
  _inputData: T,
  fields: InputField<T>[],
  errors: Partial<T>,
  touched: Partial<{ [key in keyof T]: boolean }>,
  types?: { [key in keyof T]: string },
  toggleType?: (field: keyof T) => void,
): InputField<T>[] {
  return fields.map((it) => ({
    id: it.id,
    name: it.name,
    type: types?.[it.name] ?? it.type,
    placeholder: it.placeholder,
    label: it.label,
    value: it.value,
    error: errors?.[it.name] ? String(errors[it.name]) : '',
    touched: touched?.[it.name] || false,
    toggleType:
      (it.name === 'password' || it.name === 'confirmPassword') && toggleType
        ? () => toggleType(it.name)
        : undefined,
  }));
}
