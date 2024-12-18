import { nanoid } from '@reduxjs/toolkit';
import AuthSplash from '../../assets/icons/auth_screen.svg?react';
import Eye from '../../assets/icons/eye.svg?react';
import EyeOff from '../../assets/icons/eye-off.svg?react';
import Logo from '../../assets/icons/logo.svg?react';
import Bell from '../../assets/icons/bell.svg?react';
import Search from '../../assets/icons/search.svg?react';
import Hamburger from '../../assets/icons/hamburger-menu.svg?react';
import QuestionMark from '../../assets/icons/question-mark.svg?react';
import CalendarOne from '../../assets/icons/calendar-one.svg?react';
import CalendarSeven from '../../assets/icons/calendar-seven.svg?react';
import CalendarAll from '../../assets/icons/calendar-all.svg?react';
import ArrowLeft from '../../assets/icons/arrow-left.svg?react';
import Cross from '../../assets/icons/cross.svg?react';
import TrashBin from '../../assets/icons/trash-bin.svg?react';
import Success from '../../assets/icons/checkmark-circle.svg?react';
import Error from '../../assets/icons/error.svg?react';
import Settings from '../../assets/icons/gear.svg?react';
import Logout from '../../assets/icons/logout.svg?react';
import Edit from '../../assets/icons/edit.svg?react';

const keyGen = () => nanoid(12);

export type IconType =
  | 'auth-splash'
  | 'eye'
  | 'eye-off'
  | 'logo'
  | 'bell'
  | 'search'
  | 'hamburger'
  | 'question-mark'
  | 'calendar-one'
  | 'calendar-seven'
  | 'calendar-all'
  | 'arrow-left'
  | 'cross'
  | 'trash-bin'
  | 'success'
  | 'error'
  | 'settings'
  | 'logout'
  | 'edit';

export const iconTypes = new Map([
  ['auth-splash', <AuthSplash key={keyGen()} />],
  ['eye', <Eye key={keyGen()} />],
  ['eye-off', <EyeOff key={keyGen()} />],
  ['logo', <Logo key={keyGen()} />],
  ['search', <Search key={keyGen()} />],
  ['bell', <Bell key={keyGen()} />],
  ['hamburger', <Hamburger key={keyGen()} />],
  ['question-mark', <QuestionMark key={keyGen()} />],
  ['calendar-one', <CalendarOne key={keyGen()} />],
  ['calendar-seven', <CalendarSeven key={keyGen()} />],
  ['calendar-all', <CalendarAll key={keyGen()} />],
  ['arrow-left', <ArrowLeft key={keyGen()} />],
  ['cross', <Cross key={keyGen()} />],
  ['trash-bin', <TrashBin key={keyGen()} />],
  ['success', <Success key={keyGen()} />],
  ['error', <Error key={keyGen()} />],
  ['settings', <Settings key={keyGen()} />],
  ['logout', <Logout key={keyGen()} />],
  ['edit', <Edit key={keyGen()} />],
]);
