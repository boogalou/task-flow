import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  MouseEvent,
  ReactNode,
} from 'react';
import styles from './button.module.scss';
import cnBind from 'classnames/bind';

const cx = cnBind.bind(styles);

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'outline'
  | 'disabled';

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
  children?: ReactNode;
  onClick?: (evt: MouseEvent<HTMLButtonElement>) => void;
}

export const Button = forwardRef(
  (
    { variant, className, children, onClick, disabled, ...restProps }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        className={cx('button', `button--${variant}`, className)}
        onClick={onClick}
        disabled={disabled}
        ref={ref}
        {...restProps}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
