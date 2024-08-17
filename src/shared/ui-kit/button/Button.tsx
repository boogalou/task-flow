import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from 'react';
import styles from './button.module.scss';
import cnBind from 'classnames/bind';
import { IconType } from '../icon/iconType.tsx';

const cx = cnBind.bind(styles);

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  iconType?: IconType;
}

export const Button = forwardRef(
  (
    { className, children, onClick, disabled, value, ...restProps }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        className={cx('button', className)}
        onClick={onClick}
        disabled={disabled}
        ref={ref}
        {...restProps}
      >
        {value ? value : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
