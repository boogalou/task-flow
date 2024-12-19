import styles from './settigns.module.scss';
import cnBind from 'classnames/bind';
import { Icon } from 'shared/ui-kit/icon/icon.tsx';
import { useTranslation } from 'react-i18next';
import { SaveSettings, ToggleLanguage, ToggleTheme } from 'features/settings';
import { routes } from 'shared/constants/routes.ts';
import { Link } from 'react-router-dom';

const cx = cnBind.bind(styles);

export function Settings() {
  const { t } = useTranslation();

  return (
    <div className={cx('settings')}>
      <div className={cx('wrapper')}>
        <Link to={routes.MAIN_PAGE} className={cx('settings__button-close')}>
          <Icon iconType={'cross'} />
        </Link>
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
