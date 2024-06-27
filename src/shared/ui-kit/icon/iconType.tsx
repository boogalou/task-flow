import { nanoid } from '@reduxjs/toolkit';
import { ReactComponent as AuthSplash } from '../../assets/icons/auth_screen.svg';
import { ReactComponent as Eye } from '../../assets/icons/eye.svg';
import { ReactComponent as EyeOff } from '../../assets/icons/eye-off.svg';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as Bell } from '../../assets/icons/bell.svg';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { ReactComponent as Hamburger } from '../../assets/icons/hamburger-menu.svg';
import { ReactComponent as QuestionMark } from '../../assets/icons/question-mark.svg';

const keyGen = () => nanoid(12);

export type IconType =
  | 'auth-splash'
  | 'eye'
  | 'eye-off'
  | 'logo'
  | 'bell'
  | 'search'
  | 'hamburger'
  | 'question-mark';

export const iconTypes = new Map([
  ['auth-splash', <AuthSplash key={keyGen()} />],
  ['eye', <Eye key={keyGen()} />],
  ['eye-off', <EyeOff key={keyGen()} />],
  ['logo', <Logo key={keyGen()} />],
  ['search', <Search key={keyGen()} />],
  ['bell', <Bell key={keyGen()} />],
  ['hamburger', <Hamburger key={keyGen()} />],
  ['question-mark', <QuestionMark key={keyGen()} />],
]);
