import styles from './input.module.scss';
import cnBind from "classnames/bind";
import { InputHTMLAttributes } from "react";

const cx = cnBind.bind(styles);

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string;
  classNameLabel?: string;
  label?: string
}

function Input({ id, label, classNameLabel, classNameInput, ...restProps }: InputProps) {
  return (
    <>
      <label className={ classNameLabel } htmlFor={id}>{ label }</label>
      <input
        className={ cx('input', classNameInput) }
        id={id}
        { ...restProps }
      />
    </>
  );
}

export default Input;