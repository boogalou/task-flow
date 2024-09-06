import styles from './settigns.module.scss';
import cnBind from 'classnames/bind';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { useAppDispatch, useAppSelector } from '../../app/store/reduxHooks.ts';
import {
  selectLanguage,
  selectTheme,
  setLanguage,
  setTheme,
  toggleSettings,
} from './model/settings.slice.ts';
import { ChangeEvent, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { RadioGroup } from '../../shared/ui-kit/radio-group/radioGroup.tsx';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
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
    i18n.changeLanguage(newLang === 'eng' ? 'en' : 'ru');
  };

  const handleCloseButtonClick = () => {
    dispatch(toggleSettings());
  };

  return (
    <div className={cx('settings')}>
      <div className={cx('wrapper')}>
        <Button className={cx('settings__button-close')} onClick={handleCloseButtonClick}>
          <Icon iconType={'cross'} />
        </Button>
      </div>
      <h3 className={cx('settings__title')}>{t('settings.title')}</h3>
      <div className={cx('settings__content')}>
        <div className={cx('settings__theme')}>
          <span className={cx('settings__subtitle')}>{t('settings.theme')}</span>
          <RadioGroup
            className={cx('settings__radio-group')}
            data={themeData.map((item) => ({ ...item, label: t(`settings.themes.${item.value}`) }))}
            selectedValue={selectedTheme}
            name="theme"
            onChange={handleThemeChange}
          />
        </div>
        <div className={cx('settings__language')}>
          <span className={cx('settings__subtitle')}>{t('settings.language')}</span>
          <RadioGroup
            className={cx('settings__radio-group')}
            data={langData.map((item) => ({
              ...item,
              label: t(`settings.languages.${item.value}`),
            }))}
            selectedValue={selectedLang}
            name="language"
            onChange={handleLangChange}
          />
        </div>
      </div>
    </div>
  );
}
