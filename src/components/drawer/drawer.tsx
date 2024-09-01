import styles from './drawer.module.scss';
import cnBind from 'classnames/bind';
import { ReactNode, useEffect, useRef } from 'react';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';

const cx = cnBind.bind(styles);

interface DrawerProps {
  children: ReactNode;
  header: ReactNode;
  drawerIsOpen: boolean;
  onCloseDrawer: () => void;
}

export function Drawer({ children, header, drawerIsOpen, onCloseDrawer }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(evt: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(evt.target as Node)) {
        onCloseDrawer();
      }
    }

    if (drawerIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cx('drawer', { 'drawer--open': drawerIsOpen })} ref={drawerRef}>
      <header>{header}</header>
      {children}
      <Button className={cx('drawer__close-button')} onClick={onCloseDrawer}>
        <Icon iconType="arrow-left" />
      </Button>
    </div>
  );
}
