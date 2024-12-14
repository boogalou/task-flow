import styles from './settigns.module.scss';
import cnBind from 'classnames/bind';
import { Button } from 'shared/ui-kit/button/button.tsx';
import { useAppDispatch } from 'shared/lib/reduxHooks.ts';
import { toggleSettings } from 'entities/settings/model/settings.slice.ts';
import { Icon } from 'shared/ui-kit/icon/icon.tsx';
import { useTranslation } from 'react-i18next';
import { SaveSettings, ToggleLanguage, ToggleTheme } from 'features/settings';

const cx = cnBind.bind(styles);

export function Settings() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
        <ToggleTheme />
        <ToggleLanguage />
      </div>
      <SaveSettings />
    </div>
  );
}
