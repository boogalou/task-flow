import styles from './sidebar-header.module.scss';
import cnBind from 'classnames/bind';
import { MouseEvent, useRef, useState } from 'react';
import { Avatar } from '../../shared/ui-kit/avatar/avatar.tsx';
import { useAppDispatch, useAppSelector } from '../../app/store/reduxHooks.ts';
import { selectAuthData } from '../auth/model/auth.slice.ts';
import { Dropdown, DropdownItemData } from '../../shared/ui-kit/dropdown/dropdown.tsx';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { useOnClickOutside } from 'usehooks-ts';
import { toggleSettings } from '../settings/model/settings.slice.ts';
import { logoutRequest } from '../auth/model/auth.thunk.ts';
import { useTranslation } from 'react-i18next';

const cx = cnBind.bind(styles);

const dropdownItems: DropdownItemData[] = [
  { id: 1, label: 'mainMenu.settings', iconType: 'settings', action: 'settings' },
  { id: 2, label: 'mainMenu.logout', iconType: 'logout', action: 'logout' },
];

export function SidebarHeader() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthData);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const toggleDropdown = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    setDropdownIsOpen((prevState) => !prevState);
  };

  const handleSelectDropdownItem = (action: string) => {
    if (action === 'settings') {
      dispatch(toggleSettings());
      setDropdownIsOpen(false);
    }

    if (action === 'logout') {
      dispatch(logoutRequest());
      setDropdownIsOpen(false);
    }
  };

  const handleOutsideClick = (evt: Event) => {
    if (buttonRef.current && buttonRef.current.contains(evt.target as Node)) {
      return;
    }
    setDropdownIsOpen(false);
  };

  useOnClickOutside(dropdownRef, handleOutsideClick);

  return (
    <header className={cx('sidebar-header')}>
      <Button className={cx('sidebar-header__button')} onClick={toggleDropdown} ref={buttonRef}>
        <Avatar avatarUrl={user?.userPic} name={user?.username} />
        <div>{user?.username}</div>
      </Button>
      <Dropdown
        className={cx('sidebar-header__dropdown')}
        ref={dropdownRef}
        isOpen={dropdownIsOpen}
        items={dropdownItems.map((it) => ({ ...it, label: t(it.label) }))}
        selectItem={handleSelectDropdownItem}
      />
    </header>
  );
}
