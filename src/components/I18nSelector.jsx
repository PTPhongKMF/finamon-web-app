import { m } from '../i18n/paraglide/messages';
import { getLocale, setLocale } from '../i18n/paraglide/runtime';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './shadcn/select';

export default function I18nSelector() {

  return (
    <Select onValueChange={setLocale} defaultValue={getLocale}>
      <SelectTrigger className="w-fit bg-gray-200">
        <SelectValue placeholder={m['common.topnavbar.select']()} />
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