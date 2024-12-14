import styles from './settigns.module.scss';
import cnBind from 'classnames/bind';
import { Button } from 'shared/ui-kit/button/button.tsx';
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks.ts';
import {
  selectLanguage,
  selectTheme,
  setLanguage,
  toggleSettings,
} from 'entities/settings/model/settings.slice.ts';
import { ChangeEvent } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Icon } from 'shared/ui-kit/icon/icon.tsx';
import { RadioGroup } from 'shared/ui-kit/radio-group/radioGroup.tsx';
import { useTranslation } from 'react-i18next';
import { updateSettingsRequest } from 'entities/settings/model/update-settings.thunk.ts';
import { storageAdapter } from 'shared/lib/storage.adapter.ts';
import { UserSettings } from 'shared/types/types.ts';
import { ToggleTheme } from 'features/settings';

const cx = cnBind.bind(styles);

const langData = [
  { id: nanoid(), value: 'eng', label: 'Eng:' },
  { id: nanoid(), value: 'rus', label: 'Rus:' },
];

export function Settings() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectTheme);
  const currentLang = useAppSelector(selectLanguage);

  const handleLangChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newLang = evt.target.value as 'rus' | 'eng';
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang === 'eng' ? 'en' : 'ru');
  };

  const handleCloseButtonClick = () => {
    dispatch(toggleSettings());
  };

  const handleSaveButton = () => {
    dispatch(
      updateSettingsRequest({
        theme: currentTheme,
        language: currentLang,
      }),
    );

    storageAdapter.save<UserSettings>('app-settings', {
      theme: currentTheme,
      language: currentLang,
    });
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
        <ToggleTheme />
        <div className={cx('settings__language')}>
          <span className={cx('settings__subtitle')}>{t('settings.language')}</span>
          <RadioGroup
            className={cx('settings__radio-group')}
            data={langData.map((item) => ({
              ...item,
              label: t(`settings.languages.${item.value}`),
            }))}
            selectedValue={currentLang}
            name="language"
            onChange={handleLangChange}
          />
        </div>
      </div>
      <Button className="button--primary" onClick={handleSaveButton}>
        Save
      </Button>
    </div>
  );
}
