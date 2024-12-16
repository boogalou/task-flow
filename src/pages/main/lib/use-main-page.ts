import { useState, useEffect, useCallback } from 'react';
import { useAppSelector } from 'shared/lib/reduxHooks.ts';
import { selectSettingsIsActive } from 'entities/settings/model/settings.slice.ts';

export function useMainPage() {
  const settingsIsActive = useAppSelector(selectSettingsIsActive);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleOnClickMenu = useCallback(() => {
    setDrawerIsOpen((prevState) => !prevState);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setDrawerIsOpen(false);
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

  return {
    drawerIsOpen,
    handleOnClickMenu,
    onCloseDrawer,
    settingsIsActive,
  };
}
