import type zhDict from '@/dictionaries/zh.json';

export type Dictionary = typeof zhDict;
export const locales = ['zh', 'tw', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';

// Display labels for the language switcher
export const localeLabels: Record<Locale, string> = {
  zh: '简',
  tw: '繁',
  en: 'EN',
};

// HTML lang attribute (BCP 47)
export const htmlLang: Record<Locale, string> = {
  zh: 'zh-Hans',
  tw: 'zh-Hant',
  en: 'en',
};

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  zh: () => import('@/dictionaries/zh.json').then((m) => m.default as Dictionary),
  tw: () => import('@/dictionaries/zh-Hant.json').then((m) => m.default as Dictionary),
  en: () => import('@/dictionaries/en.json').then((m) => m.default as Dictionary),
};

export const hasLocale = (locale: string): locale is Locale =>
  (locales as readonly string[]).includes(locale);

export const getDictionary = async (locale: Locale): Promise<Dictionary> => loaders[locale]();
