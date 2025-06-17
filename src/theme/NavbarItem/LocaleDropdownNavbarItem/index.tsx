import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import IconLanguage from '@theme/Icon/Language';
import type { Props } from '@theme/NavbarItem/LocaleDropdownNavbarItem';

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  queryString = '',
  ...props
}: Props): JSX.Element {
  const {
    i18n: { locales, localeConfigs, currentLocale },
  } = useDocusaurusContext();

  const localeItems = locales.map((locale): any => {
    const baseTo = `pathname://${locale}/`;
    // 硬编码英文链接
    const to = locale === 'en' 
      ? 'https://www.jhipster.tech' 
      : locale === 'zh-Hans' 
        ? 'https://www.jhipster.tech/cn'
        : locale === 'jp'
          ? 'https://www.jhipster.tech/jp'
          : baseTo;

    return {
      label: localeConfigs[locale].label,
      lang: localeConfigs[locale].htmlLang,
      to,
      target: locale === 'en' ? '_self' : undefined,
      autoAddBaseUrl: false,
      isActive: () => locale === currentLocale,
    };
  });

  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];

  // Mobile is handled by the MobileSidebar
  if (mobile) {
    return (
      <>
        {items.map((item, i) => (
          <li key={i}>
            <a
              href={item.to}
              target={item.target}
              className={`menu__link ${
                item.isActive?.() ? 'menu__link--active' : ''
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </>
    );
  }

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={
        <>
          <IconLanguage className="margin-right--xs" />
          {translate({
            message: '中文',
            id: 'theme.navbar.localeDropdown.selectLanguage',
            description: 'The ARIA label for the language dropdown',
          })}
        </>
      }
      items={items}
    />
  );
}