export interface RegistrationData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegistrationRequestData {
  user: RegistrationData;
}

export interface LoginRequestData {
  user: LoginData;
}

export interface AuthDataResponse {
  userId: number;
  email: string;
  username: string;
  userPic: string | null;
  accessToken: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  color: string;
  isCompleted: boolean;
}

export type TaskData = {
  title: string;
  description: string;
  category: string;
  color: string;
  date: string;
  time: string;
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
};
