import styles from './mainPage.module.scss';
import cnBind from 'classnames/bind';
import { MainHeader } from 'pages/main/ui/main-header/main-header.tsx';
import { Sidebar } from 'widgets/sidebar/sidebar.tsx';
import { MainContent } from 'widgets/main-content/main-content.tsx';
import { Settings } from 'widgets/settings-manage/settings.tsx';
import { SidebarHeader } from 'widgets/sidebar-header/sidebar-header.tsx';
import { NavDate } from 'widgets/nav-date/nav-date.tsx';
import { NavTags } from 'widgets/nav-tags/nav-tags.tsx';
import { NavActions } from 'widgets/nav-actions/nav-actions.tsx';
import { useMainPage } from 'pages/main/lib/use-main-page.ts';

const cx = cnBind.bind(styles);

export function MainPage() {
  const { settingsIsActive, onCloseDrawer, drawerIsOpen, handleOnClickMenu } = useMainPage();

  return (
    <div className={cx('main')}>
      <MainHeader onClick={handleOnClickMenu} />
      <Sidebar
        drawerIsOpen={drawerIsOpen}
        onCloseDrawer={onCloseDrawer}
        SidebarHeader={<SidebarHeader />}
        NavDate={<NavDate />}
        NavTags={<NavTags />}
        NavActions={<NavActions />}
      />
      {settingsIsActive ? <Settings /> : <MainContent />}
    </div>
  );
}
