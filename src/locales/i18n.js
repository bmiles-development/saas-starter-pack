import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function deafultLocale(){
  const locales = require.context('.', true, /[A-Za-z0-9-_,\s]+\.json$/i)

  let urlLocale = ''
  const localesKeys = locales.keys();
  for(let i = 0; i < localesKeys.length; i++) {
    const matched = localesKeys[i].match(/([A-Za-z0-9-_]+)\./i);
    const regex = new RegExp(matched[1]);
    urlLocale = window.location.pathname.match(regex);

    if (urlLocale !== null) {
      break;
    }
  }

  return urlLocale[0]
}

function loadLocaleMessages () {
  const locales = require.context('.', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
    locale: deafultLocale() || 'en',
    fallbackLocale: 'en',
    messages: loadLocaleMessages()
})
