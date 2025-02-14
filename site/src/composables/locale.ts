const defaultLocale = "en";

export const watchLocale = (props: { locale: string[] | string }) => {
  const { availableLocales, locale } = useI18n();

  const checkLocale = (toLocale: string) => {
    return !(availableLocales.indexOf(toLocale) === -1);
  };

  const getLocale = (param: string[] | string) => {
    const l = param === "string" ? param : param[0];
    return checkLocale(l) ? l : defaultLocale;
  };

  locale.value = getLocale(props.locale);

  watch(
    () => props.locale,
    () => (locale.value = getLocale(props.locale))
  );
};

export const switchLocale = (toLocale: string) => {
  const { locale } = useI18n();
  const route = useRoute();

  const basePath =
    locale.value === defaultLocale
      ? route.path
      : route.path.replace(`/${locale.value}`, "");

  const toPath =
    toLocale === defaultLocale ? basePath : `/${toLocale}${basePath}`;
  return toPath;
};

export const switchPath = (path: string, locale: string) => {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${prefix}${path[0] === "/" ? "" : "/"}${path}`;
};
