import { z } from 'zod';

const rePassword = /^(?=.*[A-Z])(?=.*\d).+$/;
const reName = /^[a-zA-Z0-9-_\s]+$/;

// Registration Validation Schema
export const registrationValidationSchema = z
  .object({
    username: z
      .string({
        required_error: 'Username is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(4, 'Username must contain at least 4 characters')
      .max(100, 'Username can contain a max. of 100 characters')
      .regex(reName, 'Username can only contain letters, numbers, hyphens, and underscores'),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email address'),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(6, 'Password must contain at least 6 characters')
      .max(150, 'Password can contain a max.of 150 characters')
      .regex(rePassword, 'Password must contain at least one uppercase letter and one digit'),
    confirmPassword: z.string({
      required_error: 'Confirm Password is required',
      invalid_type_error: 'Confirm Password must be a string',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

// Login Validation Schema
export const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(6, 'Password must contain at least 6 characters')
    .max(150, 'Password can contain a max.of 150 characters')
    .regex(rePassword, 'Password must contain at least one uppercase letter and one digit'),
});
