import styles from './sidebar-header.module.scss';
import cnBind from 'classnames/bind';
import { MouseEvent, useRef, useState } from 'react';
import { Avatar } from 'shared/ui-kit/avatar/avatar.tsx';
import { useAppSelector } from 'shared/lib/reduxHooks.ts';
import { selectUser } from 'entities/user';
import { Button } from 'shared/ui-kit/button/button.tsx';
import { MainMenu } from 'widgets/main-menu/main-menu.tsx';

const cx = cnBind.bind(styles);

export function SidebarHeader() {
  const user = useAppSelector(selectUser);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const toggleDropdown = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    setDropdownIsOpen((prevState) => !prevState);
  };

  return (
    <header className={cx('sidebar-header')}>
      <Button className={cx('sidebar-header__button')} onClick={toggleDropdown} ref={buttonRef}>
        <Avatar avatarUrl={user?.userPic} name={user?.username} />
        <div>{user?.username}</div>
      </Button>
      <MainMenu
        buttonRef={buttonRef}
        dropdownIsOpen={dropdownIsOpen}
        setDropdownIsOpen={setDropdownIsOpen}
      />
    </header>
  );
}
