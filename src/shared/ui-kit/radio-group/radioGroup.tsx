import { ChangeEvent } from 'react';
import { CustomInput } from '../checkbox/customInput.tsx';

interface RadioGroupProps {
  className?: string;
  data: { id: string; value: string; label: string }[];
  selectedValue: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export function RadioGroup({ className, data, selectedValue, name, onChange }: RadioGroupProps) {
  return (
    <div className={className}>
      {data.map((it) => (
        <CustomInput
          key={it.id}
          id={it.id}
          label={it.label}
          type="radio"
          name={name}
          value={it.value}
          checked={selectedValue === it.value}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
