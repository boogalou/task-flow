import styles from './checkbox.module.scss';
import cnBind from 'classnames/bind';
import { InputHTMLAttributes } from 'react';

const cx = cnBind.bind(styles);

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox({ id, type, ...restProps }: CheckboxProps) {
  return (
    <>
      <input className={cx('input-checkbox')} id={id} type={type} {...restProps} />
      <label className={cx('checkbox')} htmlFor={id}>
        <svg viewBox="0 0 22 16" fill="none">
          <path d="M1 6.85L8.09677 14L21 1" />
        </svg>
      </label>
    </>
  );
}
