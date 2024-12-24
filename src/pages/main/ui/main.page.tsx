import styles from './mainPage.module.scss';
import cnBind from 'classnames/bind';
import { MainHeader } from 'pages/main/ui/main-header/main-header.tsx';
import { Sidebar } from 'widgets/sidebar/sidebar.tsx';
import { SidebarHeader } from 'widgets/sidebar-header/sidebar-header.tsx';
import { TaskFiltersPanel } from 'widgets/task-filters-panel/task-filters-panel.tsx';
import { TaskListPanel } from 'widgets/task-list-panel/task-list-panel.tsx';
import { TaskManagementPanel } from 'widgets/task-management-panel/task-management-panel.tsx';
import { useMainPage } from 'pages/main/lib/use-main-page.ts';
import { Outlet } from 'react-router-dom';

const cx = cnBind.bind(styles);

export function MainPage() {
  const { onCloseDrawer, drawerIsOpen, handleOnClickMenu } = useMainPage();

  return (
    <div className={cx('main')}>
      <MainHeader onClick={handleOnClickMenu} />
      <Sidebar
        drawerIsOpen={drawerIsOpen}
        onCloseDrawer={onCloseDrawer}
        SidebarHeader={<SidebarHeader />}
        TaskFiltersPanel={<TaskFiltersPanel />}
        TaskListPanel={<TaskListPanel />}
        TaskManagementPanel={<TaskManagementPanel />}
      />
      <Outlet />
    </div>
  );
}
