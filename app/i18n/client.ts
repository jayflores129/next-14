"use client";

import { useEffect, useMemo, useState } from "react";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import { useCookies } from "react-cookie";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages, cookieName } from "./settings";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: any, namespace: any) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(ns = "common", options?: any) {
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  if (runsOnServerSide) return ret;

  const _lang = useMemo(() => {
    let _lang = "en";
    const html = document.querySelector("html");
    const appLang = html?.getAttribute("lang");

    if (appLang) _lang = appLang;

    return _lang;
  }, []);

  useEffect(() => {
    i18n.changeLanguage(_lang);
  }, [_lang]);

  return ret;
}
