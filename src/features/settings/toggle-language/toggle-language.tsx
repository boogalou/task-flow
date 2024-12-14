import styles from './toggle-language.module.scss';
import cnBind from 'classnames/bind';
import { RadioGroup } from 'shared/ui-kit/radio-group/radioGroup.tsx';
import { nanoid } from '@reduxjs/toolkit';
import { useToggleLanguage } from 'features/settings/toggle-language/use-toggle-language.ts';

const cx = cnBind.bind(styles);

export function ToggleLanguage() {
  const { t, handleLangChange, currentLang } = useToggleLanguage();
  const langData = [
    { id: nanoid(), value: 'eng', label: t('settings.languages.eng') },
    { id: nanoid(), value: 'rus', label: t('settings.languages.rus') },
  ];

  return (
    <div className={cx('setting-language')}>
      <span className={cx('setting-language__subtitle')}>{t('settings.language')}</span>
      <RadioGroup
        className={cx('setting-language__radio-group')}
        data={langData.map((item) => ({
          ...item,
          label: t(`settings.languages.${item.value}`),
        }))}
        selectedValue={currentLang}
        name="language"
        onChange={handleLangChange}
      />
    </div>
  );
}
