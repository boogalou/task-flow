import styles from './input.module.scss';
import cnBind from 'classnames/bind';
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

const cx = cnBind.bind(styles);

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string;
  classNameLabel?: string;
  label?: string;
}

const Input = forwardRef(
  (
    { id, label, classNameLabel, classNameInput, ...restProps }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <>
        <label className={classNameLabel} htmlFor={id}>
          {label}
        </label>
        <input className={cx('input', classNameInput)} id={id} ref={ref} {...restProps} />
      </>
    );
  },
);

Input.displayName = 'Input';

export default Input;
