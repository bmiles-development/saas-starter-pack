 // Crowdin Translations available here https://crowdin.com/ 

import { I18n } from '@aws-amplify/core';

const returnData = {}
const loadedLanguages = {}

export function loadLocaleI18nAsync(locale) {

  // If the language hasn't been loaded yet
  return import(
    /* webpackChunkName: "locale-[request]" */ `@/locales/${locale}.json`
  ).then(messages => {
    I18n.putVocabularies(messages.default)
    I18n.setLanguage(locale);

    //console.log(I18n.get('Sign In'))
    loadedLanguages[locale] = messages.default
    return Promise.resolve(locale)
  })
}

export default returnData