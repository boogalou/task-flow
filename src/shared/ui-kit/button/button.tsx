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

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant =
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
  variant: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
  onClick?: (evt: MouseEvent<HTMLButtonElement>) => void;
}

export const Button = forwardRef(
  (
    { variant, size, className, children, onClick, disabled, ...restProps }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        className={cx('button', `button--${variant}`, `button--${size}`, className)}
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
