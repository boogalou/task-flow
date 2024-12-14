import styles from './toggle-theme.module.scss';
import cnBind from 'classnames/bind';
import { RadioGroup } from 'shared/ui-kit/radio-group/radioGroup.tsx';
import { useToggleTheme } from 'features/settings/toggle-theme/use-toggle-theme.ts';
import { nanoid } from '@reduxjs/toolkit';

const cx = cnBind.bind(styles);

export function ToggleTheme() {
  const { handleThemeChange, currentTheme, t } = useToggleTheme();
  const themeData = [
    { id: nanoid(), value: 'system', label: t('settings.themes.system') },
    { id: nanoid(), value: 'light', label: t('settings.themes.light') },
    { id: nanoid(), value: 'dark', label: t('settings.themes.dark') },
  ];

  return (
    <div className={cx('setting-theme')}>
      <span className={cx('setting-theme__subtitle')}>{t('settings.theme')}</span>
      <RadioGroup
        className={cx('setting-theme__radio-group')}
        data={themeData}
        selectedValue={currentTheme}
        name="theme"
        onChange={handleThemeChange}
      />
    </div>
  );
}
