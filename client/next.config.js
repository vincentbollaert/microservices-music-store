// file loaded automatically on startup by nextjs
// ensures that nextjs picks up file changes inside d container every 300ms as it bugs out occasionally

module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300
    return config
  }
}
