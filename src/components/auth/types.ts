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
