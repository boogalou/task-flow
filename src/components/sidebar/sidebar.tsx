import styles from './sidebar.module.scss';
import cnBind from 'classnames/bind';
import { NavDate } from '../nav-date/nav-date.tsx';
import { Drawer } from '../drawer/drawer.tsx';
import { SidebarHeader } from '../sidebar-header/sidebar-header.tsx';
import { NavTags } from '../nav-tags/nav-tags.tsx';
import { NavActions } from '../nav-actions/nav-actions.tsx';

const cx = cnBind.bind(styles);

interface SidebarProps {
  drawerIsOpen: boolean;
  onCloseDrawer: () => void;
}

export function Sidebar({ drawerIsOpen, onCloseDrawer }: SidebarProps) {
  return (
    <>
      <aside className={cx('sidebar')}>
        <SidebarHeader />
        <div className={cx('sidebar__navigation')}>
          <NavDate />
          <NavTags />
          <NavActions />
        </div>
      </aside>
      <Drawer header={<SidebarHeader />} drawerIsOpen={drawerIsOpen} onCloseDrawer={onCloseDrawer}>
        <div className={cx('sidebar__navigation')}>
          <NavDate />
          <NavTags />
          <NavActions />
        </div>
      </Drawer>
    </>
  );
}
