import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
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

export const Button = ({ className, children, onClick, disabled, ...restProps }: ButtonProps) => {
  return (
    <button
      className={cx('button', className)}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};
