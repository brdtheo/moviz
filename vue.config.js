module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  publicPath: process.env.NODE_ENV === 'production'
    ? '/moviz/'
    : '/',

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
