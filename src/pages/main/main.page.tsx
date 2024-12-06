import styles from './mainPage.module.scss';
import cnBind from 'classnames/bind';
import { MainHeader } from '../../components/main-header/main-header.tsx';
import { Sidebar } from '../../components/sidebar/sidebar.tsx';
import { useEffect, useState } from 'react';
import { MainContent } from '../../components/main-content/main-content.tsx';
import { Settings } from '../../components/settings/settings.tsx';
import { useAppDispatch, useAppSelector } from '../../app/store/reduxHooks.ts';
import {
  selectSettingsIsActive,
  setLanguage,
  setTheme,
} from '../../components/settings/model/settings.slice.ts';
import { getSettingsRequest } from '../../components/settings/model/settingsThunk.ts';
import { UserSettings } from '../../shared/types/types.ts';

const cx = cnBind.bind(styles);

export function MainPage() {
  const dispatch = useAppDispatch();
  const settingsIsActive = useAppSelector(selectSettingsIsActive);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleOnClickMenu = () => {
    setDrawerIsOpen((prevState) => !prevState);
  };

  const onCloseDrawer = () => {
    setDrawerIsOpen(false);
  };

  useEffect(() => {
    const settings = localStorage.getItem('app-settings');

    if (settings) {
      const parsedSettings: UserSettings = JSON.parse(settings);
      dispatch(setTheme(parsedSettings.theme));
      dispatch(setLanguage(parsedSettings.language));
    } else {
      dispatch(getSettingsRequest());
    }
  }, []);

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
