import styles from '../auth.module.scss';
import cnBind from "classnames/bind";
import Input from "../../../shared/ui-kit/input/input.tsx";
import { Button } from "../../../shared/ui-kit/button/Button.tsx";
import { useState } from "react";
import { RegistrationData } from "../types.ts";
import { useAppDispatch } from "../../../app/redux/reduxHooks.ts";
import { signupRequest } from "../model/auth.thunk.ts";
import { inputFields } from "./inputFields.ts";
import { useForm } from "../lib/useForm.ts";
import { validationSignupSchema } from "./validationSignupSchema.ts";
import { Link } from "react-router-dom";
import { routes } from "../../../shared/routes/routes.ts";
import { Icon } from "../../../shared/ui-kit/icon/icon.tsx";

const cx = cnBind.bind(styles);

const initialValues: RegistrationData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export function Signup() {
  const dispatch = useAppDispatch();
  const [types, setTypes] = useState<{ [key in keyof RegistrationData]: string }>({
    username: 'text',
    email: 'email',
    password: 'password',
    confirmPassword: 'password',
  });

  const form = useForm({
    initialValues,
    validationSchema: validationSignupSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: ((values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(signupRequest({
        user: {
          ...values,
        }
      }))
      form.resetForm();
    }),
  });

  const toggleType = (field: keyof RegistrationData) => {
    setTypes((prevTypes) => ({
      ...prevTypes,
      [field]: prevTypes[field] === 'password' ? 'text' : 'password'
    }));
  }

  return (
    <div className={ cx('container') }>
      <h2 className={ cx('title') }>Sign Up</h2>
      <form className={ cx('form') } onSubmit={ form.handleSubmit } noValidate={ true }>
        {
          inputFields(form.values, form.error, form.touched, types, toggleType).map((field) => (
            <div className={ cx('form__field') } key={ field.id }>
              <Input
                classNameLabel={ cx('form__label') }
                classNameInput={ cx('form__input') }
                onChange={ form.handleOnChange }
                onBlur={ form.handleOnBlur }
                value={ field.value }
                id={ field.id }
                name={ field.name }
                type={ field.type }
                placeholder={ field.placeholder }
                label={ field.label }
                autoComplete='off'
              />
              {
                field.name === 'password' || field.name === 'confirmPassword' ? (
                  <div className={ cx('form__icon') } onClick={ field.toggleType }>
                   {
                     field.type === 'password'
                       ? <Icon className={ cx('icon--eye') } iconType={ 'eye-off' }/>
                       : <Icon className={ cx('icon--eye') } iconType={ 'eye' }/>
                   }
                </div>

                ) : null
              }
              { field.touched && field.error &&
                <p className={ cx('form__field--error') }>{ field.error }</p>
              }
            </div>
          ))
        }
        <Button
          className={ cx('form__button') }
          type='submit'
        >
          Submit
        </Button>
      </form>
      <div className={ cx('link') }>
        Already have an account&nbsp;
        <Link to={ routes.SIGNIN_PAGE }>Login</Link>
      </div>
    </div>
  );
}