export const SUPPORT_LOCALES = {

  "zh-cn": {
    name: "简体中文",
    icon: "icon-park-outline:chinese"
  },
  en: {
    name: "English",
    icon: "icon-park-outline:english"
  },
};

export type LocaleType = keyof typeof SUPPORT_LOCALES;
