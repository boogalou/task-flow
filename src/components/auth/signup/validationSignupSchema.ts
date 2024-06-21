import { z } from 'zod'

const validPassword = /^(?=.*[A-Z])(?=.*\d).+$/;
const validName = /^[a-zA-Z0-9-_\s]+$/;

export const validationSignupSchema = z.object({
  username: z.string()
    .min(4, 'Name must contain min 4 characters')
    .max(100, 'Name must contain max 100 characters')
    .regex(validName, 'Username can only contain letters, numbers, hyphens, and underscores')
    .nonempty('Username is required'),
  email: z.string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z.string()

    .min(6, 'Password must be between 6 and 150 characters long')
    .max(150, 'Password must be between 6 and 150 characters long')
    .regex(validPassword, 'Password must contain at least one uppercase letter and one digit')
    .nonempty('Password is required'),
  confirmPassword: z.string()
    .nonempty('Confirm Password is required')

}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
})

