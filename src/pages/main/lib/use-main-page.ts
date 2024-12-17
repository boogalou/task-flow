import { useCallback, useEffect, useState } from 'react';
import { settingsIsActiveSelector } from 'entities/settings';

export function useMainPage() {
  const settingsIsActive = settingsIsActiveSelector();
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
