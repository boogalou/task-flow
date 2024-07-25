const icons = import.meta.glob('./src/shared/assets/icons/*', {
  import: 'default',
});
import { nanoid } from '@reduxjs/toolkit';
import { ReactComponent as AuthSplash } from '../../assets/icons/auth_screen.svg';
import { ReactComponent as Eye } from '../../assets/icons/eye.svg';
import { ReactComponent as EyeOff } from '../../assets/icons/eye-off.svg';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as Bell } from '../../assets/icons/bell.svg';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { ReactComponent as Hamburger } from '../../assets/icons/hamburger-menu.svg';
import { ReactComponent as QuestionMark } from '../../assets/icons/question-mark.svg';
import { ReactComponent as CalendarOne } from '../../assets/icons/calendar-one.svg';
import { ReactComponent as CalendarSeven } from '../../assets/icons/calendar-seven.svg';
import { ReactComponent as CalendarAll } from '../../assets/icons/calendar-all.svg';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow-left.svg';
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';
import { ReactComponent as TrashBin } from '../../assets/icons/trash-bin.svg';
import { ReactComponent as Success } from '../../assets/icons/checkmark-circle.svg';
import { ReactComponent as Error } from '../../assets/icons/error.svg';

Object.values(icons).forEach((mod) => {
  mod().then((data) => {
    console.log(data);
  });
});

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
  | 'error';

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
]);
