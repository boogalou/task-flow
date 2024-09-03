import { ForwardedRef, forwardRef, MouseEvent } from 'react';
import styles from './dropdown.module.scss';
import cnBind from 'classnames/bind';
import { IconType } from '../icon/iconType.tsx';
import { Icon } from '../icon/icon.tsx';

const cx = cnBind.bind(styles);

export type DropdownItemData = {
  id: number;
  label: string;
  iconType?: IconType;
};

interface DropdownProps {
  className: string;
  items: DropdownItemData[];
  selectItem: (label: string) => void;
  isOpen: boolean;
}

const Dropdown = forwardRef(
  (
    { className, items, selectItem, isOpen }: DropdownProps,
    ref: ForwardedRef<HTMLUListElement>,
  ) => {
    const handleOnClick = (_evt: MouseEvent<HTMLLIElement>, label: string) => {
      selectItem(label);
    };

    console.log(isOpen);

    return (
      <ul className={cx('dropdown', { 'dropdown--open': isOpen }, className)} ref={ref}>
        {items.map((it) => (
          <li
            className={cx('dropdown__item')}
            key={it.id}
            onClick={(evt) => handleOnClick(evt, it.label)}
          >
            {it.iconType && <Icon iconType={it.iconType} />}
            <span className={cx('dropdown__label')}>{it.label}</span>
          </li>
        ))}
      </ul>
    );
  },
);

Dropdown.displayName = 'Dropdown';

export { Dropdown };
