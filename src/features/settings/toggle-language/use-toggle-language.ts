import { useTranslation } from 'react-i18next';
import { ChangeEvent } from 'react';
import { setLanguage } from 'entities/settings/model/settings.slice.ts';
import { useAppDispatch } from 'shared/lib/reduxHooks.ts';
import { selectLang } from 'entities/settings';

export function useToggleLanguage() {
  const dispatch = useAppDispatch();
  const currentLang = selectLang();
  const { t, i18n } = useTranslation();

  const handleLangChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newLang = evt.target.value as 'rus' | 'eng';
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang === 'eng' ? 'en' : 'ru');
  };

  return {
    currentLang,
    handleLangChange,
    t,
  };
}
