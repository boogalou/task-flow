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

function createInputFields<T>(
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

export { createInputFields };

// export const createInputFields = <T extends object>(
//   data: T,
//   errors: Partial<T>,
//   touched: Partial<{ [key in keyof T]: boolean }>,
//   types: { [key in keyof T]: string },
//   toggleType: (field: keyof T) => void,
// ): InputField<T>[] =>
//   (Object.keys(data) as (keyof T)[]).map((key) => {
//     const name = key as keyof T;
//     return {
//       id: key as string,
//       name: name,
//       type: types[name],
//       placeholder: key === 'confirmPassword' ? 'Confirm Password' : `Enter ${String(key)}`,
//       label: String(key).charAt(0).toUpperCase() + String(key).slice(1),
//       value: String(data[name]),
//       error: errors[name] ? String(errors[name]) : '',
//       touched: touched[name] || false,
//       toggleType:
//         name === 'password' || name === 'confirmPassword' ? () => toggleType(name) : undefined,
//     };
//   });
