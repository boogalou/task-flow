import styles from './sidebar-header.module.scss';
import cnBind from 'classnames/bind';
import { Avatar } from '../../shared/ui-kit/avatar/avatar.tsx';
import { useAppSelector } from '../../app/redux/reduxHooks.ts';
import { selectAuthData } from '../auth/model/auth.slice.ts';
import { Dropdown, DropdownItemData } from '../../shared/ui-kit/dropdown/dropdown.tsx';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

const cx = cnBind.bind(styles);

const dropdownItems: DropdownItemData[] = [
  { id: 1, label: 'Settings', iconType: 'settings' },
  { id: 2, label: 'Logout', iconType: 'logout' },
];

export function SidebarHeader() {
  const user = useAppSelector(selectAuthData);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const toggleDropdown = () => {
    setDropdownIsOpen((prevState) => !prevState);
  };

  const handleSelectDropdownItem = (label: string) => {
    console.log(label);
    setDropdownIsOpen(false);
  };

  const handleOutsideClick = () => {
    setDropdownIsOpen(false);
  };

  useOnClickOutside(dropdownRef, handleOutsideClick);

  return (
    <header className={cx('sidebar-header')}>
      <Button className={cx('sidebar-header__button')} onClick={toggleDropdown}>
        <Avatar avatarUrl={user?.userPic} name={user?.username} />
        <div>{user?.username}</div>
      </Button>
      <Dropdown
        ref={dropdownRef}
        isOpen={dropdownIsOpen}
        className={cx('sidebar-header__dropdown')}
        items={dropdownItems}
        selectItem={handleSelectDropdownItem}
      />
    </header>
  );
}
