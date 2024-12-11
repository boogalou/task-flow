import { IconType } from '../ui-kit/icon/iconType.tsx';

export type User = {
  id: number;
  username: string;
  email: string;
  userPic: string;
};

export type RegistrationFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token_type: string;
  accessToken: string;
};

export type TaskFormData = {
  title: string;
  description: string;
  category: string;
  color: string;
  date: string;
  time: string;
};

export type Task = {
  id: number;
  title?: string;
  description?: string;
  dueDate?: string;
  category?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
  isCompleted?: boolean;
};

export type CreateTaskRequest = {
  title: string;
  description: string;
  category: string;
  color: string;
  dueDate: string;
  isCompleted: boolean;
};

export type UserSettings = {
  theme: 'system' | 'light' | 'dark';
  language: 'eng' | 'rus';
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
};

export type FilterCriteria = {
  date?: string;
  category?: string | null;
  isCompleted?: string | null;
};

export type ButtonsData = {
  id: number;
  label: string;
  action: string;
  count: number;
  iconType: IconType;
};

export type FetchStatus = 'idle' | 'loading' | 'failed' | 'succeeded';
