import styles from './main-menu.module.scss';
import cnBind from 'classnames/bind';
import { Dropdown, DropdownItemData } from 'shared/ui-kit/dropdown/dropdown.tsx';
import { logoutRequest } from 'entities/auth';
import { useOnClickOutside } from 'usehooks-ts';
import { useAppDispatch } from 'shared/lib/reduxHooks.ts';
import { RefObject, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const cx = cnBind.bind(styles);

const dropdownItems: DropdownItemData[] = [
  {
    id: 1,
    label: 'mainMenu.settings',
    iconType: 'settings',
    action: 'settings',
    href: '/settings',
  },
  { id: 2, label: 'mainMenu.profile', iconType: 'profile', action: 'profile', href: 'profile' },
  { id: 3, label: 'mainMenu.logout', iconType: 'logout', action: 'logout' },
];

interface MainMenuProps {
  setDropdownIsOpen: (param: boolean) => void;
  dropdownIsOpen: boolean;
  buttonRef: RefObject<HTMLButtonElement>;
}

export function MainMenu(props: MainMenuProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleSelectDropdownItem = (action: string) => {
    if (action === 'settings') {
      props.setDropdownIsOpen(false);
    }

    if (action === 'logout') {
      dispatch(logoutRequest());
      props.setDropdownIsOpen(false);
    }
  };

  const handleOutsideClick = (evt: Event) => {
    if (props.buttonRef.current && props.buttonRef.current.contains(evt.target as Node)) {
      return;
    }
    props.setDropdownIsOpen(false);
  };

  useOnClickOutside(dropdownRef, handleOutsideClick);

  return (
    <Dropdown
      className={cx('sidebar-header__dropdown')}
      ref={dropdownRef}
      isOpen={props.dropdownIsOpen}
      items={dropdownItems.map((it) => ({
        ...it,
        label: t(it.label),
        isLink: !!it.href,
      }))}
      selectItem={handleSelectDropdownItem}
    />
  );
}
