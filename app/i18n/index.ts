import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

// Define types for the function parameters
type InitI18next = (lng: string, ns: string | string[]) => Promise<any>;

const initI18next: InitI18next = async (lng: any, ns: any) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: any, namespace: any) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

// Define types for the options and return value of useTranslation
interface UseTranslationOptions {
  keyPrefix?: string;
}

interface UseTranslationReturn {
  t: (key: string, options?: Record<string, unknown>) => string;
  i18n: any;
}

export async function useTranslation(
  lng: string,
  ns: string | string[] = "common",
  options: UseTranslationOptions = {}
): Promise<UseTranslationReturn> {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
