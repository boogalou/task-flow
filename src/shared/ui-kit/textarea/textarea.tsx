import styles from './textarea.module.scss';
import cnBind from 'classnames/bind';
import { InputHTMLAttributes } from 'react';

const cx = cnBind.bind(styles);

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  classNameInput?: string;
  classNameLabel?: string;
  label: string;
  rows: number;
}

export function Textarea({
  id,
  label,
  classNameLabel,
  classNameInput,
  rows,
  ...restProps
}: TextareaProps) {
  return (
    <>
      <label className={cx('label', classNameLabel)} htmlFor={id}>
        {label}
      </label>
      <textarea className={cx('textarea', classNameInput)} id={id} rows={rows} {...restProps} />
    </>
  );
}
