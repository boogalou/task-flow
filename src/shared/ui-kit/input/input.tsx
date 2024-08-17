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
    { id, label, classNameLabel, classNameInput, type, ...restProps }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <>
        {type === 'checkbox' ? (
          <>
            <label className={cx('checkbox')} htmlFor={id}>
              <svg viewBox="0 0 22 16" fill="none">
                <path d="M1 6.85L8.09677 14L21 1" />
              </svg>
            </label>
            <input
              className={cx('input-checkbox', classNameInput)}
              id={id}
              type={type}
              ref={ref}
              {...restProps}
            />
          </>
        ) : (
          <>
            <label className={classNameLabel} htmlFor={id}>
              {label}
            </label>
            <input
              className={cx('input', classNameInput)}
              id={id}
              type={type}
              ref={ref}
              {...restProps}
            />
          </>
        )}
      </>
    );
  },
);

Input.displayName = 'Input';

export default Input;
