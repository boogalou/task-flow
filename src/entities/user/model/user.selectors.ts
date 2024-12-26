/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from 'shared/lib/reduxHooks.ts';
import { selectUser } from 'entities/user/model/user.slice.ts';

export function userSelector() {
  return useAppSelector(selectUser);
}
