import styles from './settigns.module.scss';
import cnBind from 'classnames/bind';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { useAppDispatch, useAppSelector } from '../../app/redux/reduxHooks.ts';
import {
  selectLanguage,
  selectTheme,
  setLanguage,
  setTheme,
  toggleSettings,
} from './model/settings.slice.ts';
import { Checkbox } from '../../shared/ui-kit/checkbox/checkbox.tsx';
import { ChangeEvent, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';

const cx = cnBind.bind(styles);

const themeData = [
  { id: '1', value: 'system', label: 'System:' },
  { id: '2', value: 'light', label: 'Light:' },
  { id: '3', value: 'dark', label: 'Dark:' },
];

const langData = [
  { id: nanoid(), value: 'eng', label: 'Eng:' },
  { id: nanoid(), value: 'rus', label: 'Rus:' },
];

export function Settings() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectTheme);
  const currentLang = useAppSelector(selectLanguage);
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [selectedLang, setSelectedLang] = useState(currentLang);

  const handleThemeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newTheme = evt.target.value as 'system' | 'light' | 'dark';
    setSelectedTheme(newTheme);
    dispatch(setTheme(newTheme));
  };

  const handleLangChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newLang = evt.target.value as 'rus' | 'eng';
    setSelectedLang(newLang);
    dispatch(setLanguage(newLang));
  };

  const handleCloseButtonClick = () => {
    dispatch(toggleSettings());
  };

  return (
    <div className={cx('settings')}>
      <Button className={cx('settings_button-close')} onClick={handleCloseButtonClick}>
        <Icon iconType={'cross'} />
      </Button>
      <h3 className={cx('settings__title')}>Settings</h3>
      <div className={cx('settings__content')}>
        <div className={cx('settings__theme')}>
          <span className={cx('settings__subtitle')}>Theme:</span>
          <div className={cx('settings__radio-group')}>
            {themeData.map((it) => (
              <Checkbox
                id={it.id}
                label={it.label}
                type="radio"
                name="theme"
                value={it.value}
                checked={selectedTheme === it.value}
                onChange={handleThemeChange}
                key={it.id}
              />
            ))}
          </div>
        </div>
        <div className={cx('settings__language')}>
          <span className={cx('settings__subtitle')}>Language:</span>
          <div className={cx('settings__radio-group')}>
            {langData.map((it) => (
              <Checkbox
                id={it.id}
                label={it.label}
                type="radio"
                name="language"
                value={it.value}
                checked={selectedLang === it.value}
                onChange={handleLangChange}
                key={it.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
