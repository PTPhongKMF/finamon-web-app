import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './shadcn/select';

export default function I18nSelector() {
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState("en");

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])

  return (
    <Select onValueChange={setLang} defaultValue={lang}>
      <SelectTrigger className="w-fit bg-gray-200">
        <SelectValue placeholder={t("topnavbar.select")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <img className="w-4 h-3" src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/US.svg" alt="US Flag" />
            <span>EN</span>
          </div>
        </SelectItem>
        <SelectItem value="vi">
          <div className="flex items-center gap-2">
            <img className="w-4 h-3" src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/VN.svg" alt="VN Flag" />
            <span>VI</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}