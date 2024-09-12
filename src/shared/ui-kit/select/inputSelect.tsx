import styles from './select.module.scss';
import cnBind from 'classnames/bind';
import { InputHTMLAttributes } from 'react';

const cx = cnBind.bind(styles);

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput: string;
  classNameLabel: string;
  options: string[];
  label: string;
}

export function InputSelect({
  classNameInput,
  classNameLabel,
  options,
  id,
  label,
  ...restProps
}: SelectProps) {
  return (
    <>
      <label className={cx('label', classNameLabel)} htmlFor={id}>
        {label}
      </label>
      <input className={cx('select', classNameInput)} list={id} autoComplete="off" {...restProps} />
      <datalist id={id}>
        {options.map((option) => (
          <option key={option} value={option}></option>
        ))}
      </datalist>
    </>
  );
}
