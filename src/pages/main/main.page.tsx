import styles from './mainPage.module.scss';
import cnBind from 'classnames/bind';
import { MainHeader } from '../../components/main-header/main-header.tsx';
import { Sidebar } from '@/src/components/sidebar/sidebar.tsx';
import { useEffect, useState } from 'react';
import { MainContent } from 'widgets/main-content/main-content.tsx';
import { Settings } from 'widgets/settings-manage/settings.tsx';
import { useAppSelector } from '../../shared/lib/reduxHooks.ts';
import { selectSettingsIsActive } from 'entities/settings/model/settings.slice.ts';

const cx = cnBind.bind(styles);

export function MainPage() {
  const settingsIsActive = useAppSelector(selectSettingsIsActive);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleOnClickMenu = () => {
    setDrawerIsOpen((prevState) => !prevState);
  };

  const onCloseDrawer = () => {
    setDrawerIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (document.body.clientWidth >= 768) {
        setDrawerIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={cx('main')}>
      <MainHeader onClick={handleOnClickMenu} />
      <Sidebar drawerIsOpen={drawerIsOpen} onCloseDrawer={onCloseDrawer} />
      {settingsIsActive ? <Settings /> : <MainContent />}
    </div>
  );
}
