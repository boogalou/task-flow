import { IconType } from '../ui-kit/icon/iconType.tsx';

export type RegistrationData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegistrationRequestData = {
  user: RegistrationData;
};

export type LoginRequestData = {
  user: LoginData;
};

export type AuthDataResponse = {
  userId: number;
  email: string;
  username: string;
  userPic: string | null;
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
  title: string;
  description: string;
  dueDate: string;
  category: string;
  color: string;
  createdAt: string;
  isCompleted: boolean;
};

export type CreateTaskRequest = {
  title: string;
  description: string;
  category: string;
  color: string;
  dueDate: string;
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
