import { ForwardedRef, forwardRef, MouseEvent } from 'react';
import styles from './dropdown.module.scss';
import cnBind from 'classnames/bind';
import { IconType } from '../icon/iconType.tsx';
import { Icon } from '../icon/icon.tsx';
import { Link } from 'react-router-dom';

const cx = cnBind.bind(styles);

export type DropdownItemData = {
  id: number | string;
  label: string;
  iconType?: IconType;
  action: string;
  href?: string;
  isLink?: boolean;
};

interface DropdownProps {
  className: string;
  items: DropdownItemData[];
  selectItem: (action: string) => void;
  isOpen: boolean;
}

const Dropdown = forwardRef(
  (
    { className, items, selectItem, isOpen }: DropdownProps,
    ref: ForwardedRef<HTMLUListElement>,
  ) => {
    const handleOnClick = (_evt: MouseEvent<HTMLLIElement>, action: string) => {
      selectItem(action);
    };

    return (
      <ul className={cx('dropdown', { 'dropdown--open': isOpen }, className)} ref={ref}>
        {items.map((it) => (
          <li
            className={cx('dropdown__item')}
            key={it.id}
            onClick={(evt) => {
              if (!it.isLink) {
                handleOnClick(evt, it.action);
              }
            }}
          >
            {it.isLink ? (
              <Link to={it.href!} className={cx('dropdown__link')}>
                {it.iconType && <Icon iconType={it.iconType} />}
                <span className={cx('dropdown__label')}>{it.label}</span>
              </Link>
            ) : (
              <>
                {it.iconType && <Icon iconType={it.iconType} />}
                <span className={cx('dropdown__label')}>{it.label}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    );
  },
);

Dropdown.displayName = 'Dropdown';

export { Dropdown };
