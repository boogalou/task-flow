import styles from '../auth.module.scss';
import cnBind from "classnames/bind";
import { useState } from "react";
import { LoginData } from "../types.ts";
import { useAppDispatch } from "../../../app/redux/reduxHooks.ts";
import { useForm } from "../lib/useForm.ts";
import { validationSignupSchema } from "../signup/validationSignupSchema.ts";
import { signinRequest } from "../model/auth.thunk.ts";
import { inputFields } from "./inputFields.ts";
import Input from "../../../shared/ui-kit/input/input.tsx";
import { Button } from "../../../shared/ui-kit/button/Button.tsx";
import { Link } from "react-router-dom";
import { routes } from "../../../shared/routes/routes.ts";
import { Icon } from "../../../shared/ui-kit/icon/icon.tsx";

const cx = cnBind.bind(styles);

const initialValues: LoginData = {
  email: '',
  password: '',
}

export function Signin() {

  const dispatch = useAppDispatch();
  const [types, setTypes] = useState<{ [key in keyof LoginData]: string }>({
    email: 'email',
    password: 'password',
  });

  const form = useForm({
    initialValues,
    validationSchema: validationSignupSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: ((values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(signinRequest({
        user: {
          ...values,
        }
      }))
      form.resetForm();
    }),
  });

  const toggleType = (field: keyof LoginData) => {
    setTypes((prevTypes) => ({
      ...prevTypes,
      [field]: prevTypes[field] === 'password' ? 'text' : 'password'
    }));
  }

  return (
    <div className={ cx('container') }>
      <h2 className={ cx('title') }>Sign In</h2>
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
                field.name === 'password' ? (
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
          disabled={ false }
        >
          Submit
        </Button>
      </form>
      <div className={ cx('link') }>
        Don't have an account&nbsp;
        <Link to={ routes.SIGNUP_PAGE }>Signup</Link>
      </div>
    </div>
  );
}
