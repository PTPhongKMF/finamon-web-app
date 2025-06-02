import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '../stores/langStore';

export default function I18nProvider(props) {
  const { i18n } = useTranslation();
  const lang = useLanguageStore(state => state.lang);

  useEffect(() => {
    if (lang)
      i18n.changeLanguage(lang)
  }, [lang, i18n])

  return props.children
}
