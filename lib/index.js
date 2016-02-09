module.exports = function (dburl) {
  return {
    put: require('./put').bind(null, dburl),
    post: require('./post').bind(null, dburl),
    query: require('./query').bind(null, dburl),
    createTrigger: require('./createTrigger').bind(null, dburl),
    removeTrigger: require('./removeTrigger').bind(null, dburl)
  }
}
