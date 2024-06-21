import { nanoid } from "@reduxjs/toolkit";
import { ReactComponent as  AuthSplash } from '../../assets/icons/auth_screen.svg';
import { ReactComponent as  Eye } from '../../assets/icons/eye.svg';
import { ReactComponent as EyeOff } from '../../assets/icons/eye-off.svg';
import { ReactComponent as  Logo } from '../../assets/icons/logo.svg';


const keyGen = () => nanoid(12);

export type IconType = | 'auth-splash' | 'eye' | 'eye-off' | 'logo'

export const iconTypes = new Map([
  ['auth-splash', <AuthSplash key={ keyGen() }/>],
  ['eye', <Eye key={ keyGen() }/>],
  ['eye-off', <EyeOff key={ keyGen() }/>],
  ['logo', <Logo key={ keyGen() }/>],
]);