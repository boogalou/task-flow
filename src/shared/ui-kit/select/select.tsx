import styles from './select.module.scss';
import cnBind from 'classnames/bind';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

const cx = cnBind.bind(styles);

interface SelectProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  className: string;
  options: string[];
}

export function Select({ className, options, ...restProps }: SelectProps) {
  return (
    <select className={cx('select', className)} {...restProps}>
      {options.map((option) => (
        <option className={cx('select__option')} key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
