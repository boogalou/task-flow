import styles from './checkbox.module.scss';
import cnBind from 'classnames/bind';
import { InputHTMLAttributes } from 'react';

const cx = cnBind.bind(styles);

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ id, type, label, checked, ...restProps }: CheckboxProps) {
  const isCheckbox = type === 'checkbox';
  console.log(checked);
  return (
    <>
      <input
        className={cx({
          'input-checkbox': isCheckbox,
          'input-radio': !isCheckbox,
        })}
        id={id}
        type={type}
        checked={checked}
        {...restProps}
      />
      {label}
      <label
        className={cx({
          checkbox: isCheckbox,
          radio: !isCheckbox,
        })}
        htmlFor={id}
      >
        {isCheckbox ? (
          <svg viewBox="0 0 22 16" fill="none">
            <path d="M1 6.85L8.09677 14L21 1" />
          </svg>
        ) : null}
      </label>
    </>
  );
}
