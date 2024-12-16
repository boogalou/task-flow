import styles from './sidebar.module.scss';
import cnBind from 'classnames/bind';
import { Drawer } from 'widgets/drawer/drawer.tsx';
import { SidebarHeader } from '../sidebar-header/sidebar-header.tsx';
import { ReactNode } from 'react';

const cx = cnBind.bind(styles);

interface SidebarProps {
  drawerIsOpen: boolean;
  onCloseDrawer: () => void;
  SidebarHeader: ReactNode;
  NavDate: ReactNode;
  NavTags: ReactNode;
  NavActions: ReactNode;
}

export function Sidebar(props: SidebarProps) {
  return (
    <>
      <aside className={cx('sidebar')}>
        {props.SidebarHeader}
        <div className={cx('sidebar__navigation')}>
          {props.NavDate}
          {props.NavTags}
          {props.NavActions}
        </div>
      </aside>
      <Drawer
        header={<SidebarHeader />}
        drawerIsOpen={props.drawerIsOpen}
        onCloseDrawer={props.onCloseDrawer}
      >
        <div className={cx('sidebar__navigation')}>
          {props.NavDate}
          {props.NavTags}
          {props.NavActions}
        </div>
      </Drawer>
    </>
  );
}
