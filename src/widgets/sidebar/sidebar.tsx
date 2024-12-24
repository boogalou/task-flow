import styles from './sidebar.module.scss';
import cnBind from 'classnames/bind';

import { SidebarHeader } from '../sidebar-header/sidebar-header.tsx';
import { ReactNode } from 'react';
import { Drawer } from '../drawer/drawer.tsx';

const cx = cnBind.bind(styles);

interface SidebarProps {
  drawerIsOpen: boolean;
  onCloseDrawer: () => void;
  SidebarHeader: ReactNode;
  TaskFiltersPanel: ReactNode;
  TaskListPanel: ReactNode;
  TaskManagementPanel: ReactNode;
}

export function Sidebar(props: SidebarProps) {
  return (
    <>
      <aside className={cx('sidebar')}>
        {props.SidebarHeader}
        <div className={cx('sidebar__navigation')}>
          {props.TaskFiltersPanel}
          {props.TaskListPanel}
          {props.TaskManagementPanel}
        </div>
      </aside>
      <Drawer
        header={<SidebarHeader />}
        drawerIsOpen={props.drawerIsOpen}
        onCloseDrawer={props.onCloseDrawer}
      >
        <div className={cx('sidebar__navigation')}>
          {props.TaskFiltersPanel}
          {props.TaskListPanel}
          {props.TaskManagementPanel}
        </div>
      </Drawer>
    </>
  );
}
