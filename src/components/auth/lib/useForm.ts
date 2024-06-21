import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
import { ZodSchema, z } from "zod";

export interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validationSchema: ZodSchema<T>;
}

export function useForm<T>({ initialValues, validationSchema, onSubmit, validateOnChange = false, validateOnBlur = false }: UseFormOptions<T>) {

  const [values, setValues] = useState<T>(initialValues);
  const [error, setError] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));

    setIsDirty(true);

    if (validateOnChange) {
      validate({ ...values, [name]: value.trim() });
    }
  };

  const handleOnBlur = (evt: FocusEvent<HTMLInputElement>) => {
    const { name } = evt.target;

    setTouched((prevState) => ({
      ...prevState,
      [name]: true,
    }));

    if (validateOnBlur) {
      validate(values);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (validate(values)) {
      onSubmit(values);
    }
  };

  const validate = (fieldValues: Partial<T> = values): boolean => {
    try {
      validationSchema.parse(fieldValues);
      setError({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof T, string>> = {};
        err.errors.forEach((error) => {
          if (error.path.length > 0) {
            const fieldName = error.path[0] as keyof T;
            fieldErrors[fieldName] = error.message;
          }
        });
        setError(fieldErrors);
      }
      return false;
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setError({});
    setTouched({});
    setIsDirty(false);
  };

  const isValid = Object.keys(error).length === 0;

  const dirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  return {
    values,
    error,
    touched,
    isValid,
    dirty,
    isDirty,
    handleOnChange,
    handleOnBlur,
    handleSubmit,
    resetForm,
  }
}