import { useState } from 'react';

type InputTypes = Record<string, string>;

export function useShowPassword<T extends InputTypes>(inputTypes: T) {
  const [types, setTypes] = useState(inputTypes);

  const toggleType = (field: keyof T) => {
    setTypes((prevTypes) => ({
      ...prevTypes,
      [field]: prevTypes[field] === 'password' ? 'text' : 'password',
    }));
  };

  return {
    types,
    toggleType,
  };
}
