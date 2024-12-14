import styles from './settigns.module.scss';
import cnBind from 'classnames/bind';
import { Button } from 'shared/ui-kit/button/button.tsx';
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks.ts';
import {
  selectLanguage,
  selectTheme,
  toggleSettings,
} from 'entities/settings/model/settings.slice.ts';
import { Icon } from 'shared/ui-kit/icon/icon.tsx';
import { useTranslation } from 'react-i18next';
import { updateSettingsRequest } from 'entities/settings/model/update-settings.thunk.ts';
import { storageAdapter } from 'shared/lib/storage.adapter.ts';
import { UserSettings } from 'shared/types/types.ts';
import { ToggleLanguage, ToggleTheme } from 'features/settings';

const cx = cnBind.bind(styles);

export function Settings() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectTheme);
  const currentLang = useAppSelector(selectLanguage);

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
        <ToggleLanguage />
      </div>
      <Button className="button--primary" onClick={handleSaveButton}>
        Save
      </Button>
    </div>
  );
}
